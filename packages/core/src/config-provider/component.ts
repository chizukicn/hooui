import { defineComponent, h, renderSlot } from "vue";
import { configProviderProps, provideSharedConfig } from "@hoci/core";

export const HiConfigProvider = defineComponent({
  props: {
    ...configProviderProps,
    as: {
      type: String
    }
  },
  setup(props, context) {
    provideSharedConfig(props);
    return () => {
      const content = renderSlot(context.slots, "default", undefined);
      if (props.as) {
        return h(props.as, content);
      }
      return content;
    };
  }
});
