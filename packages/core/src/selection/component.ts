import { defineComponent } from "vue-demi";
import { selectionEmits, selectionProps, useSelectionList } from "@hoci/core";
import { h } from "@hoci/shared";

export const HiSelection = /* #__PURE__ */ defineComponent({
  name: "HiSelection",
  props: {
    ...selectionProps,
    as: {
      type: String,
      default: "div"
    }
  },
  emits: selectionEmits,
  setup(props, context) {
    const { render } = useSelectionList(props, context);

    return () => h(props.as, {}, render());
  }
});
