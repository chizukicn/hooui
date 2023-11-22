import type { KeepAliveProps, PropType } from "vue";
import { KeepAlive, defineComponent, h, renderSlot } from "vue";
import { classPropType } from "@hoci/shared";
import { selectionProps, useSelectionList } from "../selection";

export const HiTabs = defineComponent({
  props: {
    ...selectionProps,
    headerClass: {
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
    },
    contentClass: {
      type: classPropType
    },
    keepAlive: {
      type: [Boolean, Object] as PropType<boolean | KeepAliveProps>,
      default: false
    }
  },
  setup(props, context) {
    const selection = useSelectionList(props, context);

    return () => {
      let component = selection.renderItem();
      if (props.keepAlive) {
        component = h(KeepAlive, {
          ...(typeof props.keepAlive == "object" ? props.keepAlive : {})
        }, component);
      }

      if (context.slots.content) {
        component = context.slots.content({
          component
        });
      } else {
        component = h(props.contentAs, {
          class: props.contentClass
        }, component);
      }

      return h(props.as, [
        h(props.headerAs, {
          class: props.headerClass
        }, renderSlot(context.slots, "default")),
        component
      ]);
    };
  }
});
