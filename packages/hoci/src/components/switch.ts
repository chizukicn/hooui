import type { PropType } from "vue";
import {
  capitalize,
  computed,
  defineComponent,
  h,
  ref,
  renderSlot,
  watch
} from "vue";
import {
  defineHookComponent,
  defineHookEmits,
  defineHookProps
} from "../shared";
import type { ActivateEvent } from "../types";
import { classPropType } from "../constants";
import { selectionItemProps } from "../../dist";

export const switchProps = defineHookProps({
  ...selectionItemProps,
  modelValue: {
    type: Boolean,
    default: false
  },
  class: {
    type: classPropType,
    default: ""
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
  tag: {
    type: String,
    default: "div"
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
    const checked = ref(!!props.modelValue);

    watch(
      () => props.modelValue,
      (val) => {
        checked.value = !!val;
      }
    );

    const modelValue = computed<boolean>({
      get() {
        return !!(props.modelValue ?? checked.value);
      },
      set(val) {
        checked.value = val;
        context.emit("update:modelValue", val);
      }
    });

    const toggle = function (value?: any) {
      if (props.disabled) {
        return;
      }
      const oldValue = modelValue.value;
      const newValue = typeof value === "boolean" ? value : !oldValue;
      if (newValue !== oldValue) {
        context.emit("change", newValue);
        context.emit("update:modelValue", newValue);
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
  name: "ISwitch",
  props: switchProps,
  emits: switchEmits,

  setup(props, context) {
    const { slots } = context;
    const { switchClass, toggle } = useSwitch(props, context);

    return () => {
      return h(
        props.tag,
        {
          class: switchClass.value,
          [`on${capitalize(props.activateEvent)}`]: toggle
        },
        renderSlot(slots, "default")
      );
    };
  }
});
