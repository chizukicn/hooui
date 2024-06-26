import { defineConfig } from "taze";

export default defineConfig({
  packageMode: {
    "@vueuse/*": "patch",
    "eslint": "minor"
  }
});
