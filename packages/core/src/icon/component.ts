import { defineComponent, h } from "vue";
import { iconProps, useIcon } from "@hoci/core";

export const HiIcon = defineComponent({
  props: {
    ...iconProps,
    as: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    const { style } = useIcon(props, context);
    return () => {
      return h(props.as, {
        style: style.value
      });
    };
  }
});
