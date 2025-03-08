import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { copyFileSync } from 'node:fs';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: "copy-index-to-404",
        apply: "build",
        closeBundle: () => {
          copyFileSync(resolve(__dirname, "dist/index.html"), resolve(__dirname, "dist/404.html"));
        },
      },
    ],
    base: env.MODE === 'production' ? '/' : '/',
    server: {
      port: 5173,
      strictPort: true,
    },
    envPrefix: ['VITE_', 'SUPABASE_'],
    build: {
      target: ['es2021', 'chrome100', 'safari13'],
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_DEBUG,
      outDir: 'dist',
    },
  };
});
