import type { PropType } from "vue";
import { defineComponent, h } from "vue";
import { renderSlot } from "tslx";
import type { SharedConfig } from "@hoci/core";
import { provideSharedConfig } from "@hoci/core";
export const HiConfigProvider = defineComponent({
  props: {
    icon: {
      type: Object as PropType<Partial<SharedConfig["icon"]>>
    },
    activateEvent: {
      type: String as PropType<Partial<SharedConfig["activateEvent"]>>
    }
  },
  setup(props, context) {
    provideSharedConfig(props);
    return () => {
      return h("div", {}, renderSlot(context.slots, "default"));
    };
  }
});
