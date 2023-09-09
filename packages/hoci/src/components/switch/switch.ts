import { type PropType } from "vue";
import { capitalize, computed, defineComponent, h, renderSlot } from "vue";
import { useVModel } from "@vueuse/core";
import {
  defineHookComponent,
  defineHookEmits,
  defineHookProps
} from "../../shared";
import { type ActivateEvent } from "../../types";
import { classPropType } from "../../constants";

export const switchProps = defineHookProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  class: {
    type: classPropType,
    required: true
  },
  activeClass: {
    type: classPropType,
    default: "checked"
  },
  unactiveClass: {
    type: classPropType,
    default: "unchecked"
  },
  activateEvent: {
    type: String as PropType<ActivateEvent>,
    default: "click"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledClass: {
    type: classPropType,
    default: ""
  }
});

export const switchEmits = defineHookEmits(["update:modelValue", "change"]);

export const useSwitch = defineHookComponent({
  props: switchProps,
  emits: switchEmits,
  setup(props, context) {
    const modelValue = useVModel(props, "modelValue", context.emit, {
      passive: true,
      defaultValue: false
    });

    const toggle = function (value?: any) {
      if (props.disabled) {
        return;
      }
      const oldValue = modelValue.value;
      const newValue = typeof value === "boolean" ? value : !oldValue;
      if (newValue !== oldValue) {
        modelValue.value = newValue;
        context.emit("change", newValue);
      }
    };

    const switchClass = computed(() => {
      return [
        props.class,
        modelValue.value ? props.activeClass : props.unactiveClass,
        props.disabled ? props.disabledClass : ""
      ];
    });

    return {
      toggle,
      modelValue,
      switchClass
    };
  }
});

export const HiSwitch = defineComponent({
  name: "HiSwitch",
  props: {
    ...switchProps,
    tag: {
      type: String,
      default: "div"
    }
  },
  emits: switchEmits,

  setup(props, context) {
    const { slots } = context;
    const { switchClass, toggle, modelValue } = useSwitch(props, context);

    return () => {
      return h(
        props.tag,
        {
          class: switchClass.value,
          [`on${capitalize(props.activateEvent)}`]: toggle
        },
        renderSlot(slots, "default", {
          active: modelValue.value
        })
      );
    };
  }
});
