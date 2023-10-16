import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";
import Components from "unplugin-vue-components/vite";
import { HociResolver } from "hoci/resolver";
import { VitePluginDemoblock } from "vitepress-theme-demoblock";

export default defineConfig({
  optimizeDeps: {
    exclude: [
      "vitepress"
    ]
  },
  server: {
    hmr: {
      overlay: false
    }
  },
  plugins: [
    UnoCSS(),
    Components({
      resolvers: [
        HociResolver()
      ]
    }),
    VitePluginDemoblock()
  ]
});
