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
      hoci: path.resolve(__dirname, "../packages/hoci/src/index.ts")
    }
  },

  plugins: [
    vue(),
    jsx(),
    unocss()
  ]
});
