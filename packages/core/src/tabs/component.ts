import { defineComponent, h, renderSlot } from "vue";
import { classPropType } from "@hoci/shared";
import { selectionProps, useSelectionList } from "../selection";

export const HiTabs = defineComponent({
  props: {
    ...selectionProps,
    headerClass: {
      type: classPropType
    },
    contentClass: {
      type: classPropType
    },
    as: {
      type: String,
      default: "div"
    },
    headerAs: {
      type: String,
      default: "div"
    },
    contentAs: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    const selection = useSelectionList(props, context);

    return () => {
      const content = selection.renderItem();
      return h(props.as, [
        h(props.headerAs, {
          class: props.headerClass
        }, renderSlot(context.slots, "default")),
        h(props.contentAs, {
          class: props.contentClass
        }, content)
      ]);
    };
  }
});
