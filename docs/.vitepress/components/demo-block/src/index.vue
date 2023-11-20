<script lang='ts' setup name="demo-block">
import { computed } from "vue";
import { useClipboard, useToggle } from "@vueuse/core";
import { demoProps } from "./index";

const props = defineProps(demoProps);

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode)
);
const { copy } = useClipboard({ source: decodeURIComponent(props.code) });
const [value, toggle] = useToggle();
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs" class="mt-6">
      <div class="p-8 c-#282f38  b-1 border-light-700 b-solid rounded-sm dark:bg-dark-700 dark:border-#4C4D4F flex vp-raw bg">
        <slot />
      </div>
      <div class="relative">
        <div class="flex justify-end pt-3 gap-2">
          <a :href="github" class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group target="_blank">
            <div class="o-demo_action_icon i-carbon-logo-github" />
          </a>
          <a href="javascript:void(0)" class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group @click="copy()">
            <div title="Copy" class="o-demo_action_icon i-carbon:copy" />
          </a>
          <a href="javascript:void(0)" class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group @click="toggle()">
            <div title="Show Code" class="o-demo_action_icon i-carbon:fit-to-width" />
          </a>
        </div>
        <div v-show="value" :class="`language-${lang} extra-class`" v-html="decodedHighlightedCode" />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.showcode-enter-active {
  animation: fade-in 200ms;
}

.showcode-leave-active {
  animation: fade-in reverse 200ms;
}
</style>
