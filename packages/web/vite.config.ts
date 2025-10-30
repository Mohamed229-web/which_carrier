import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// For GitHub Pages, we must serve under a subpath: https://<user>.github.io/<REPO_NAME>/
// We'll read the base path from the env var BASE_PATH set by CI. Fallback to '/'.
export default defineConfig({
  plugins: [vue()],
  server: { port: 5173 },
});
