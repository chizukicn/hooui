# hoci

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![Codecov][codecov-src]][codecov-href]
[![License][license-src]][license-href]
[![JSDocs][jsdocs-src]][jsdocs-href]

A headless component library for Vue 3.

## Usage

Install package:

```sh
# npm
npm install hoci

# yarn
yarn add hoci

# pnpm
pnpm install hoci
```

Import:

```tsx
import { defineComponent, ref } from "vue";
import { HiItem, HiSelection } from "hoci";

export default defineComponent(() => {
  const modelValue = ref("abc");
  return () => (
    <div>
      <HiSelection
        class="flex flex-col"
        activeClass="bg-blue-500"
        unactiveClass="bg-gray-500"
        itemClass="p-2 mx-2"
        v-model={modelValue.value}
      >
        <HiItem value="abc"></HiItem>
        <HiItem value="def"></HiItem>
      </HiSelection>
    </div>
  );
});
```

## Development

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

## License

Made with 💛

Published under [MIT License](./LICENSE).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/hoci?style=flat&colorA=18181B&colorB=F0DB4F
[npm-version-href]: https://npmjs.com/package/hoci
[npm-downloads-src]: https://img.shields.io/npm/dm/hoci?style=flat&colorA=18181B&colorB=F0DB4F
[npm-downloads-href]: https://npmjs.com/package/hoci
[codecov-src]: https://img.shields.io/codecov/c/gh/chizukicn/hoci/main?style=flat&colorA=18181B&colorB=F0DB4F
[codecov-href]: https://codecov.io/gh/chizukicn/hoci
[bundle-src]: https://img.shields.io/bundlephobia/minzip/hoci?style=flat&colorA=18181B&colorB=F0DB4F
[bundle-href]: https://bundlephobia.com/result?p=hoci
[license-src]: https://img.shields.io/github/license/chizukicn/hoci.svg?style=flat&colorA=18181B&colorB=F0DB4F
[license-href]: https://github.com/chizukicn/hoci/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsDocs.io-reference-18181B?style=flat&colorA=18181B&colorB=F0DB4F
[jsdocs-href]: https://www.jsdocs.io/package/hoci
