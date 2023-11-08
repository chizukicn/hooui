import type { MaybeRefOrGetter } from "@vueuse/core";
import { toRef, useMounted } from "@vueuse/core";
import type { Ref } from "vue";
import { computed } from "vue";

export function useElement<E extends Element = HTMLElement>(elementSelector: MaybeRefOrGetter<string | Element | undefined | null>, defaultValue?: Ref<E | null | undefined> | MaybeRefOrGetter<E | null | undefined>) {
  const selectorRef = toRef(elementSelector);
  const defaultRef = toRef(defaultValue);
  const isMounted = useMounted();

  const el = computed(() => {
    const selector = selectorRef.value;
    if (typeof selector === "string") {
      if (isMounted.value) {
        return document.querySelector<E>(selector) ?? null;
      }
      return null;
    }
    return selector as E;
  });

  return computed(() => el.value ?? defaultRef.value);
}
