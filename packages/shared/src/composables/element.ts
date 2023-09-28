import type { MaybeRefOrGetter } from "@vueuse/core";
import { toRef, useMounted } from "@vueuse/core";
import type { Ref } from "vue";
import { computed } from "vue";

export function useElement<E extends Element | Window = HTMLElement>(elementSelector: MaybeRefOrGetter<string | Element | Window | undefined | null>, defaultValue?: Ref<E | null | undefined> | MaybeRefOrGetter<E | null | undefined>) {
  const selectorRef = toRef(elementSelector);
  const defaultRef = toRef(defaultValue);
  const isMounted = useMounted();


  const el = computed(() => {
    const selector = selectorRef.value;
    if (selector) {
      if (selector instanceof Window) {
        return selector;
      }

      if (typeof selector === "string") {
        if (isMounted.value) {
          return document.querySelector<Exclude<E, Window>>(selector) ?? null;
        }
        return null;
      }

      return selector as E;
    }
    return null;
  });

  return computed(() => el.value ?? defaultRef.value);
}
