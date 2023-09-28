import { defineComponent, h, renderSlot } from "vue";
import type { HiSelectionSlotData } from "@hoci/core";
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
    const { isActive, changeActive, renderItem } = useSelectionList(props, context);
    const { slots } = context;

    const slotData: HiSelectionSlotData = {
      isActive,
      changeActive,
      renderItem
    };

    return () => h(props.as, {}, renderSlot(slots, "default", slotData));
  }
});
