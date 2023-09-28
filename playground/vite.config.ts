import path from "node:path";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import unocss from "unocss/vite";

export default defineConfig({
  server: {
    port: 8000,
    host: "0.0.0.0",
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      "hoci": path.resolve(__dirname, "../packages/hoci/index.ts"),
      "@hoci/core": path.resolve(__dirname, "../packages/core/index.ts"),
      "@hoci/components": path.resolve(__dirname, "../packages/components/index.ts"),
      "@hoci/shared": path.resolve(__dirname, "../packages/shared/index.ts")
    }
  },

  plugins: [
    vue(),
    jsx(),
    unocss()
  ]
});
