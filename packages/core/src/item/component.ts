import { defineComponent } from "vue-demi";
import { itemProps, useSelectionItem } from "@hoci/core";
import { capitalize } from "tslx";
import { h } from "@hoci/shared";

export const HiItem = defineComponent({
  name: "HiItem",
  props: {
    ...itemProps,
    as: {
      type: String,
      default: "div"
    }
  },
  setup(props, context) {
    const { render, activate, className, isDisabled, activateEvent } = useSelectionItem(
      props,
      context
    );
    return () =>
      h(
        props.as,
        {
          class: className.value,
          [`on${capitalize(activateEvent.value)}`]: activate,
          disabled: isDisabled.value
        },
        render()
      );
  }
});
