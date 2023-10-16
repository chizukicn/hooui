import Demo from "vitepress-theme-demoblock/dist/client/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/dist/client/components/DemoBlock.vue";
import TableDemo from "./components/demo.vue";

export function useComponents(app) {
  app.component("TableDemo", TableDemo);
  app.component("Demo", Demo);
  app.component("DemoBlock", DemoBlock);
}
