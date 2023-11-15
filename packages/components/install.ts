import type { App } from "vue-demi";
import * as components from "./components";

export const install = (app: App) => {
  for (const key in components) {
    const value = components[key as keyof typeof components] as any;
    app.component(key, value);
  }
};

