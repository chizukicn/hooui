import { defineComponent } from "vue-demi";
import { iconProps, useIcon } from "@hoci/core";
import { h } from "@hoci/shared";

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
