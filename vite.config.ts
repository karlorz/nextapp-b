import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from "node:path";
import { copyFileSync } from "node:fs";

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
          // copy index.html to 404.html
          copyFileSync(resolve(__dirname, "dist/index.html"), resolve(__dirname, "dist/404.html"));
        },
      },
    ],
    // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
    // prevent vite from obscuring rust errors
    clearScreen: false,
    // Tauri expects a fixed port, fail if that port is not available
    server: {
      port: 5173,
      strictPort: true,
    },
    // to access the Tauri environment variables set by the CLI with information about the current target
    envPrefix: ['VITE_', 'SUPABASE_'],
    build: {
      // Tauri supports es2021
      target: ['es2021', 'chrome100', 'safari13'],
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    },
  };
});
