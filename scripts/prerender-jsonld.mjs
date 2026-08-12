/**
 * Post-build: inject Schema.org JSON-LD into every prerendered SEO HTML page.
 * Bundles src/structuredData with image imports stubbed (URLs omitted safely).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';
import { PAGES } from './prerender-seo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const bundlePath = path.join(root, 'scripts', '.tmp-jsonld-bundle.mjs');
const JSON_LD_SCRIPT_ID = 'gemini-jsonld';

const stubAssetsPlugin = {
  name: 'stub-assets',
  setup(build) {
    build.onLoad({ filter: /\.(jpe?g|png|gif|svg|webp|avif)$/i }, (args) => {
      const rel = path.relative(root, args.path).split(path.sep).join('/');
      return {
        contents: `export default ${JSON.stringify(`__ASSET__:${rel}`)}`,
        loader: 'js',
      };
    });
  },
};

function fileFor(pagePath) {
  if (pagePath === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, pagePath.replace(/^\/+|\/+$/g, ''), 'index.html');
}

function injectJsonLd(html, jsonLdText) {
  const script = `<script type="application/ld+json" id="${JSON_LD_SCRIPT_ID}">${jsonLdText}</script>`;
  const withoutLegacy = html
    .replace(/<script[^>]*id=["']contact-page-schema["'][^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script[^>]*id=["']gemini-jsonld["'][^>]*>[\s\S]*?<\/script>/gi, '');

  if (withoutLegacy.includes('</head>')) {
    return withoutLegacy.replace('</head>', `  ${script}\n  </head>`);
  }
  return `${withoutLegacy}\n${script}\n`;
}

async function main() {
  await esbuild.build({
    entryPoints: [path.join(root, 'src', 'structuredData.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: bundlePath,
    plugins: [stubAssetsPlugin],
    logLevel: 'error',
  });

  const mod = await import(`${pathToFileURL(bundlePath).href}?t=${Date.now()}`);
  const { serializeJsonLdForPath } = mod;

  const manifestPath = path.join(distDir, '.vite', 'manifest.json');
  if (fs.existsSync(manifestPath) && typeof mod.setAssetManifestForSchema === 'function') {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    mod.setAssetManifestForSchema(manifest);
  } else if (typeof mod.setAssetManifestForSchema === 'function') {
    // Fallback: some Vite versions write dist/manifest.json
    const alt = path.join(distDir, 'manifest.json');
    if (fs.existsSync(alt)) {
      mod.setAssetManifestForSchema(JSON.parse(fs.readFileSync(alt, 'utf8')));
    }
  }

  let written = 0;
  let skipped = 0;

  for (const page of PAGES) {
    const file = fileFor(page.path);
    if (!fs.existsSync(file)) {
      console.error(`MISSING FILE: ${file}`);
      skipped += 1;
      continue;
    }

    const jsonLd = serializeJsonLdForPath(page.path, {
      title: page.title,
      description: page.description,
      path: page.path,
    });

    if (!jsonLd) {
      console.warn(`SKIP JSON-LD (no graph): ${page.path}`);
      skipped += 1;
      continue;
    }

    // Validate JSON before writing
    JSON.parse(jsonLd);

    const html = fs.readFileSync(file, 'utf8');
    fs.writeFileSync(file, injectJsonLd(html, jsonLd), 'utf8');
    written += 1;
  }

  try {
    fs.unlinkSync(bundlePath);
  } catch {
    /* ignore */
  }

  console.log(`JSON-LD prerender: wrote ${written}, skipped ${skipped}, pages=${PAGES.length}`);
  if (written === 0) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
