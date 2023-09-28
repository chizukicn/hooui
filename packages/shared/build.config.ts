import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: ["index"],
  clean: true,
  declaration: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false
    },
    esbuild: {
      target: "es2015"
    }
  }
});