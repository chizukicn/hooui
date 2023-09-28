import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";

import { defineConfig } from "vite";
import unocss from "unocss/vite";
import { alias } from "../alias";

export default defineConfig({
  server: {
    port: 8000,
    host: "0.0.0.0",
    fs: {
      strict: false
    }
  },
  resolve: {
    alias
  },

  plugins: [
    vue(),
    jsx(),
    unocss()
  ]
});
