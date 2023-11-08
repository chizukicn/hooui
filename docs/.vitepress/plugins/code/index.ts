import { demoBlockPlugin } from "./plugin-demo-block";
import { fencePlugin } from "./fencePlugin";

export function applyPlugins(md: markdownit) {
  md.use(fencePlugin);
  md.use(demoBlockPlugin);
}
