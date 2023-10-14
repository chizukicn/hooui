import type { ComponentResolver } from "unplugin-vue-components";

export function HociResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name) => {
      if (name.match(/^(Hi[A-Z]|hi-[a-z])/)) {
        return {
          name,
          from: "hoci"
        };
      }
    }
  };
}

export default HociResolver;
