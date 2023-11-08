<script lang='ts' setup name="demo-block">
import { computed } from "vue";
import { isClient, useClipboard, useToggle } from "@vueuse/core";
import { usePlayground } from "./playground";
import { demoProps } from "./index";

const props = defineProps(demoProps);

const decodedHighlightedCode = computed(() =>
  decodeURIComponent(props.highlightedCode)
);
const { copy, copied } = useClipboard({ source: decodeURIComponent(props.code) });
const [value, toggle] = useToggle();

const editOnPlayground = () => {
  if (props.code) {
    const { link } = usePlayground(props.code);
    if (!isClient) {
      return;
    };
    window.open(link);
  }
};
</script>

<template>
  <ClientOnly>
    <div v-bind="$attrs" class="mt-6">
      <div class="p-8 c-#282f38  b-1 border-light-700 b-solid rounded-sm dark:bg-dark-700 dark:border-#4C4D4F flex [&:o-button-base]:!c-context vp-raw bg">
        <slot />
      </div>
      <div class="relative">
        <div class="flex justify-end pt-3 gap-2">
          <a class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group @click="editOnPlayground">
            <div class="o-demo_action_icon i-carbon:chemistry" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              Edit in Playground
            </div>
          </a>
          <a class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group :href="github" target="_blank">
            <div class="o-demo_action_icon i-carbon-logo-github" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              Edit on GitHub
            </div>
          </a>
          <a class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group @click="copy()">
            <div class="o-demo_action_icon i-carbon:copy" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ copied ? 'Copied' : 'Copy code' }}
            </div>
          </a>
          <a class="relative outline-none flex justify-center items-center w-7 h-7 p-0 rounded-full border border-light-900 dark:border-dark-900 bg-white dark:bg-#38383A cursor-pointer hover:bg-#E5E6EB dark:hover:bg-dark:300" group @click="toggle()">
            <div class="o-demo_action_icon i-carbon:fit-to-width" />
            <div class="o-demo_tooltip" group-hover:opacity-100>
              {{ value ? 'Hidden code' : 'Show code' }}
            </div>
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
