import type { PropType } from "vue";
import { computed } from "vue";
import { useVModel } from "@vueuse/core";
import { cls } from "tslx";
import {
  classPropType,
  defineHookComponent,
  defineHookEmits,
  defineHookProps,
  useSharedConfig
} from "@hoci/shared";
import type { ActivateEvent } from "@hoci/shared";

export const switchProps = defineHookProps({
  modelValue: {
    type: Boolean,
    default: () => false
  },
  class: {
    type: classPropType
  },
  activeClass: {
    type: classPropType
  },
  unactiveClass: {
    type: classPropType
  },
  activateEvent: {
    type: String as PropType<ActivateEvent>
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  disabledClass: {
    type: classPropType
  }
});

export type HiSwitchProps = typeof switchProps;

export const switchEmits = defineHookEmits(["update:modelValue", "change", "reject"]);

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
        context.emit("reject", value);
        return;
      }
      const oldValue = modelValue.value;
      const newValue = typeof value === "boolean" ? value : !oldValue;
      if (newValue !== oldValue) {
        modelValue.value = newValue;
        context.emit("change", newValue);
      }
    };

    const isDisabled = computed(() => props.disabled);

    const className = computed(() => {
      return cls([
        props.class,
        modelValue.value ? props.activeClass : props.unactiveClass,
        isDisabled.value ? props.disabledClass : ""
      ]);
    });

    const sharedConfig = useSharedConfig();

    const activateEvent = computed(() => props.activateEvent ?? sharedConfig.activateEvent);

    return {
      toggle,
      modelValue,
      className,
      isDisabled,
      activateEvent
    };
  }
});

