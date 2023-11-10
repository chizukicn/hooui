import { defineComponent, h } from "vue";
import { capitalize } from "tslx";
import { itemProps, useSelectionItem } from "../item";

export const HiTabPane = defineComponent({
  props: {
    ...itemProps
  },
  setup(props, context) {
    const { className, activateEvent, activate, isDisabled, label } = useSelectionItem(props, context);
    return () => {
      return h("div",
        {
          class: className.value,
          [`on${capitalize(activateEvent.value)}`]: activate,
          disabled: isDisabled.value
        }
        , label.value);
    };
  }
});
