import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      gilect: path.resolve(__dirname, "../src/index.ts"), // Force source loading
      react: path.resolve(__dirname, "./node_modules/react"),
      "react-dom": path.resolve(__dirname, "./node_modules/react-dom"),
      "react/jsx-runtime": path.resolve(
        __dirname,
        "./node_modules/react/jsx-runtime"
      ),
      "react/jsx-dev-runtime": path.resolve(
        __dirname,
        "./node_modules/react/jsx-dev-runtime"
      ),
    },
    dedupe: ["react", "react-dom"],
  },
  // Ensure we dedupe dependencies to avoid duplicate React instances
  optimizeDeps: {
    exclude: ["gilect"],
  },
  server: {
    fs: {
      allow: [".."],
    },
  },
});
