import type { PropType } from "vue";
import { defineComponent, renderSlot } from "vue";
import type { SharedConfig } from "@hoci/core";
import { provideSharedConfig } from "@hoci/core";
export const HiConfigProvider = defineComponent({
  props: {
    icon: {
      type: Object as PropType<SharedConfig["icon"]>
    },
    activateEvent: {
      type: String as PropType<SharedConfig["activateEvent"]>
    }
  },
  setup(props, context) {
    provideSharedConfig(props);
    return () => {
      return renderSlot(context.slots, "default", undefined);
    };
  }
});
