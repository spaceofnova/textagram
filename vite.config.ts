import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import { chunkSplitPlugin } from "vite-plugin-chunk-split";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true,
      },
      manifest: false,
      registerType: "autoUpdate",
    }),
    chunkSplitPlugin({
      strategy: "single-vendor",
      customChunk: (args) => {
        // files into pages directory is export in single files
        let { file, id, moduleId, root } = args;
        if (file.startsWith("src/pages/")) {
          file = file.substring(4);
          file = file.replace(/\.[^.$]+$/, "");
          return file;
        }
        return null;
      },
      customSplitting: {
        // Any file that includes `utils` in src dir will be bundled in the `utils` chunk
        utils: [/src\/utils/],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
