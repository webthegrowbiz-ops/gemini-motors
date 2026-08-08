#!/usr/bin/env python3
"""
Ingest Gemini Motors knowledge Markdown into Qdrant Cloud.

Reads knowledge/**/*.md → chunks → local embeddings → upserts to Qdrant.

Environment (never hardcode secrets):
  QDRANT_URL
  QDRANT_API_KEY

Optional:
  QDRANT_COLLECTION (default: gemini_motors_knowledge)
"""

from __future__ import annotations

import hashlib
import logging
import uuid
from pathlib import Path

from dotenv import load_dotenv
import os

ROOT = Path(__file__).resolve().parents[1]
KNOWLEDGE_DIR = ROOT / "knowledge"

COLLECTION_NAME = "gemini_motors_knowledge"
EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
VECTOR_SIZE = 384
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 150
BATCH_SIZE = 64

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("ingest_knowledge")


def require_env(name: str) -> str:
    value = os.getenv(name, "").strip()
    if not value:
        raise SystemExit(f"Missing required environment variable: {name}")
    return value


def discover_markdown_files(knowledge_dir: Path) -> list[Path]:
    files = sorted(knowledge_dir.rglob("*.md"))
    return [p for p in files if p.is_file()]


def category_from_path(relative_path: Path) -> str:
    parts = relative_path.parts
    if len(parts) >= 2 and parts[0] == "products":
        return "products"
    stem = relative_path.stem.lower()
    if stem in {"services", "finance", "contact", "green-tech", "faq"}:
        return stem
    return parts[0] if parts else "unknown"


def title_from_markdown(text: str, fallback: str) -> str:
    for line in text.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            return stripped[2:].strip() or fallback
    return fallback


def chunk_text(text: str, chunk_size: int = CHUNK_SIZE, overlap: int = CHUNK_OVERLAP) -> list[str]:
    normalized = text.replace("\r\n", "\n").strip()
    if not normalized:
        return []

    if len(normalized) <= chunk_size:
        return [normalized]

    chunks: list[str] = []
    start = 0
    length = len(normalized)

    while start < length:
        end = min(start + chunk_size, length)
        if end < length:
            # Prefer breaking on whitespace so we do not split words.
            window = normalized[start:end]
            break_at = window.rfind(" ")
            if break_at >= chunk_size // 2:
                end = start + break_at

        chunk = normalized[start:end].strip()
        if chunk:
            chunks.append(chunk)

        if end >= length:
            break

        next_start = max(0, end - overlap)
        if next_start <= start:
            next_start = end
        start = next_start

    return chunks


def deterministic_point_id(source: str, chunk_index: int) -> str:
    # Stable UUID derived from source + chunk index for safe re-runs / upserts.
    digest = hashlib.sha1(f"{source}::{chunk_index}".encode("utf-8")).hexdigest()
    return str(uuid.UUID(digest[:32]))


def recreate_collection(client, collection_name: str) -> None:
    """Delete and recreate the collection so old payloads cannot linger."""
    from qdrant_client.http import models as rest

    existing = {c.name for c in client.get_collections().collections}
    if collection_name in existing:
        log.info("Deleting existing collection '%s' to replace incorrect payloads...", collection_name)
        client.delete_collection(collection_name=collection_name)

    log.info("Creating collection '%s' (size=%s, distance=COSINE)", collection_name, VECTOR_SIZE)
    client.create_collection(
        collection_name=collection_name,
        vectors_config=rest.VectorParams(size=VECTOR_SIZE, distance=rest.Distance.COSINE),
    )


def main() -> int:
    load_dotenv(ROOT / ".env")

    if not KNOWLEDGE_DIR.is_dir():
        raise SystemExit(f"Knowledge directory not found: {KNOWLEDGE_DIR}")

    qdrant_url = require_env("QDRANT_URL")
    qdrant_api_key = require_env("QDRANT_API_KEY")
    collection_name = os.getenv("QDRANT_COLLECTION", COLLECTION_NAME).strip() or COLLECTION_NAME

    markdown_files = discover_markdown_files(KNOWLEDGE_DIR)
    log.info("Discovered %s Markdown files under %s", len(markdown_files), KNOWLEDGE_DIR)
    if not markdown_files:
        raise SystemExit("No Markdown files found under knowledge/")

    records: list[dict] = []
    for path in markdown_files:
        relative = path.relative_to(KNOWLEDGE_DIR).as_posix()
        text = path.read_text(encoding="utf-8")
        title = title_from_markdown(text, fallback=path.stem)
        category = category_from_path(Path(relative))
        chunks = chunk_text(text)
        log.info("  %s → %s chunks (category=%s)", relative, len(chunks), category)
        for index, chunk in enumerate(chunks):
            if not chunk or not chunk.strip():
                raise SystemExit(f"Empty chunk produced for {relative} at index {index}")
            records.append(
                {
                    "id": deterministic_point_id(relative, index),
                    "pageContent": chunk,
                    "source": relative,
                    "category": category,
                    "title": title,
                    "chunk_index": index,
                }
            )

    log.info("Total chunks created: %s", len(records))
    if not records:
        raise SystemExit("No chunks created from knowledge files.")

    log.info("Loading embedding model: %s", EMBEDDING_MODEL)
    from sentence_transformers import SentenceTransformer

    model = SentenceTransformer(EMBEDDING_MODEL)

    log.info("Generating embeddings for %s chunks...", len(records))
    texts = [r["pageContent"] for r in records]
    embeddings = model.encode(
        texts,
        batch_size=BATCH_SIZE,
        show_progress_bar=True,
        normalize_embeddings=True,
    )

    if len(embeddings) != len(records):
        raise SystemExit("Embedding count does not match chunk count.")
    if len(embeddings[0]) != VECTOR_SIZE:
        raise SystemExit(
            f"Unexpected embedding dimension {len(embeddings[0])}, expected {VECTOR_SIZE}."
        )

    from qdrant_client import QdrantClient
    from qdrant_client.http import models as rest

    log.info("Connecting to Qdrant Cloud...")
    client = QdrantClient(url=qdrant_url, api_key=qdrant_api_key)
    recreate_collection(client, collection_name)

    log.info("Upserting %s vectors into '%s'...", len(records), collection_name)
    points: list[rest.PointStruct] = []
    for record, vector in zip(records, embeddings):
        page_content = record["pageContent"]
        if not page_content.strip():
            raise SystemExit(f"Refusing to upload empty pageContent for {record['source']}")
        points.append(
            rest.PointStruct(
                id=record["id"],
                vector=vector.tolist(),
                payload={
                    "pageContent": page_content,
                    "metadata": {
                        "source": record["source"],
                        "category": record["category"],
                        "chunk_index": record["chunk_index"],
                        "title": record["title"],
                    },
                },
            )
        )

    for i in range(0, len(points), BATCH_SIZE):
        batch = points[i : i + BATCH_SIZE]
        client.upsert(collection_name=collection_name, points=batch)
        log.info("  uploaded %s / %s", min(i + BATCH_SIZE, len(points)), len(points))

    info = client.get_collection(collection_name)
    points_count = info.points_count
    log.info("Verification: collection='%s' points_count=%s", collection_name, points_count)

    # Sanity-check payload shape on one stored point.
    sample, _ = client.scroll(collection_name=collection_name, limit=1, with_payload=True)
    if not sample:
        raise SystemExit("Collection verification failed: no points returned by scroll.")
    payload = sample[0].payload or {}
    if not payload.get("pageContent"):
        raise SystemExit("Collection verification failed: pageContent is empty.")
    metadata = payload.get("metadata")
    if not isinstance(metadata, dict) or not metadata:
        raise SystemExit("Collection verification failed: metadata is missing or empty.")

    log.info(
        "Success: processed %s files, created %s chunks, upserted %s vectors.",
        len(markdown_files),
        len(records),
        len(points),
    )
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except KeyboardInterrupt:
        log.error("Interrupted.")
        raise SystemExit(130)
