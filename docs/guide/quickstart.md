# 快速开始

## 使用包管理器安装

```sh
# 使用 npm
npm install hoci

# 使用 yarn
yarn add hoci

# 使用 pnpm
pnpm add hoci

```

## 完整引入


```ts
import { createApp } from "vue";
import hoci from "hoci";

const app = createApp();
app.use(hoci);
app.mount("#app");
```


## 按需引入

你可以使用unplugin-vue-components按需引入组件

```sh
npm install -D unplugin-vue-components
```

在vite.config中配置
```ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import components from "unplugin-vue-components/vite";
import { HociResolver } from "hoci/resolver";

export default defineConfig({
  plugins: [
    vue(),
    components({
      resolvers: [
        HociResolver(),
      ],
    }),
  ],
});
```

