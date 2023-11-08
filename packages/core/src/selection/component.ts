import { defineComponent, h } from "vue";
import { selectionEmits, selectionProps, useSelectionList } from "@hoci/core";

export const HiSelection = defineComponent({
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
