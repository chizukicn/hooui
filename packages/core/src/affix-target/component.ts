import { defineComponent, h, ref, renderSlot } from "vue";
import { provideAffixTarget } from "../affix";

export const HiAffixTarget = defineComponent({
  name: "HiAffixTarget",
  setup(_, context) {
    const targetRef = ref<HTMLElement | null>(null);
    provideAffixTarget(targetRef);
    return () => h("div", {
      ref: targetRef,
      ...context.attrs
    }, renderSlot(context.slots, "default"));
  }
});
