/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_PROJECT_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly SUPABASE_DB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
