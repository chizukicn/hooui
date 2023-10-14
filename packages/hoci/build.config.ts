import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "index",
    "resolver"
  ],
  clean: true,
  declaration: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false
    }
  }
});
