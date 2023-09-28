import { resolve } from "node:path";

function r(p: string) {
  return resolve(__dirname, p);
}

export const alias: Record<string, string> = {
  "hoci": r("./packages/hoci/index"),
  "@hoci/components": r("./packages/components/index"),
  "@hoci/shared": r("./packages/shared/index"),
  "@hoci/core": r("./packages/core/index")
};
