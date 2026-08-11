/// <reference types="vite/client" />

interface ImportMetaEnv {
  // TEMPORARILY DISABLED — n8n chatbot webhook env (restore when re-enabling n8n):
  // readonly VITE_N8N_CHAT_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
