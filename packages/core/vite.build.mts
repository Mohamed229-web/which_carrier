import { defineConfig } from "vite";
import path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "which_carrier",
      fileName: () => "index",
      formats: ["es", "cjs"],
    },
    outDir: "dist",
    emptyOutDir: false,
    rollupOptions: {
      external: [],
    },
  },
});
