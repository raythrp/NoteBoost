import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: "./static",
  base: "./",
  css: {
    postcss: {
      plugins: [tailwind()],
    },
  },
  server: {
    host: "localhost",
    port: 5173,
    strictPort: true,
    proxy: {
      "/api/auth": {
        target: "https://noteboost-serve-772262781875.asia-southeast2.run.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/auth/, "/api/auth"),
      },
      "/api": {
        target: "https://noteboost-serve-772262781875.asia-southeast2.run.app",
        changeOrigin: true,
      },
    },
  },
});
