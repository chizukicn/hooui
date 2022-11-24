import { defineBuildConfig } from "unbuild";
import fs from "fs"

export default defineBuildConfig({
  entries: ["src/index"],
  externals: ["vue", "@vueuse/core"],
  clean: true,
  declaration: true,
  failOnWarn: false,
  hooks: {
    "rollup:done": async (options) => {
      await fs.promises.rename("dist/index.mjs", "dist/index.esm.js")
    }
  },
  rollup: {
    emitCJS: true,
    dts: {
      respectExternal: false
    },
    esbuild: {
      target: "es2015",

    }
  }
});
