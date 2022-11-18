import type { PropType } from "vue";
import { capitalize, computed, defineComponent, h, ref, renderSlot, watch } from "vue";
import { defineHookComponent, defineHookEmits, defineHookProps } from "../shared";
import type { ActivateEvent } from "../types";
import { classPropType } from "../constants";

export const switchProps = defineHookProps({
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
  }
});

const switchEmits = defineHookEmits(["update:modelValue", "change"]);

export const useSwitch = defineHookComponent({
  props: switchProps,
  emits: switchEmits,
  setup(props, { emit }) {
    const checked = ref(!!props.modelValue);

    watch(
      () => props.modelValue,
      val => {
        checked.value = !!val;
      }
    );

    const modelValue = computed<boolean>({
      get() {
        return !!(props.modelValue ?? checked.value);
      },
      set(val) {
        checked.value = val;
        emit("update:modelValue", val);
        emit("change", val);
      }
    });

    const toggle = function (value?: any) {
      if (typeof value === "boolean") {
        modelValue.value = value;
      } else {
        modelValue.value = !modelValue.value;
      }
    };

    const switchClass = computed(() => {
      return [props.class, modelValue.value ? props.activeClass : props.unactiveClass];
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
      return h(props.tag, {
        class: switchClass.value,
        [`on${capitalize(props.activateEvent)}`]: toggle
      }, renderSlot(slots, "default"));
    };
  }
});
