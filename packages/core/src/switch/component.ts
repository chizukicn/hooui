import { defineComponent } from "vue-demi";
import { switchEmits, switchProps, useSwitch } from "@hoci/core";
import { capitalize, renderSlot } from "tslx";
import { h } from "@hoci/shared";

export const HiSwitch = defineComponent({
  name: "HiSwitch",
  props: {
    ...switchProps,
    as: {
      type: String,
      default: "div"
    }
  },
  emits: switchEmits,

  setup(props, context) {
    const { slots } = context;
    const { className, toggle, modelValue, isDisabled, activateEvent } = useSwitch(props, context);

    return () => {
      return h(
        props.as,
        {
          class: className.value,
          [`on${capitalize(activateEvent.value)}`]: toggle
        },
        renderSlot(slots, "default", {
          active: modelValue.value,
          isDisabled: isDisabled.value
        })
      );
    };
  }
});
