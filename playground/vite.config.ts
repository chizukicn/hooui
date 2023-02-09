import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import visualizer from "rollup-plugin-visualizer";
import uncomponents from "unplugin-vue-components";

import type { Plugin } from "vite";
import { defineConfig } from "vite";
import windicss from "vite-plugin-windicss";
import path from "path"

export default defineConfig({
  server: {
    port: 8000,
    host: "0.0.0.0",
    fs: {
      strict: false
    }
  },
  resolve:{
    alias:{
      hoci:path.resolve(__dirname,"../packages/hoci/src/index.ts")
    }
  },

  plugins: [
    vue(),
    jsx(),
    windicss(),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true
    }) as Plugin,
    uncomponents.vite({
      resolvers: []
    })
  ]
});
