import type { ActivateEvent, ElementLike } from "@hoci/shared";
import { defineHookComponent, defineHookProps, valuePropType } from "@hoci/shared";
import type { PropType } from "vue-demi";
import { computed, watch } from "vue-demi";
import { tryOnScopeDispose } from "@vueuse/core";
import { cls, renderSlot } from "tslx";
import { useSelectionContext } from "../selection";

export const itemProps = defineHookProps({
  value: {
    type: valuePropType,
    default() {
      return Math.random().toString(16).slice(2);
    }
  },
  label: {
    type: [Function, String] as PropType<
    string | ((val: any) => string) | ElementLike | null
    >
  },
  keepAlive: {
    type: Boolean,
    default: () => true
  },
  activateEvent: {
    type: String as PropType<ActivateEvent>
  },
  disabled: {
    type: Boolean,
    default: false
  }
});


export const useSelectionItem = defineHookComponent({
  props: itemProps,
  setup(props, { slots }) {
    const context = useSelectionContext();

    const activate = () => {
      if (props.disabled) {
        return;
      }
      context.changeActive(props.value);
    };

    const label = computed(() => {
      let label = props.label ?? context.label.value;
      if (label && typeof label == "function") {
        label = label(props.value)!;
      }
      return Array.isArray(label) ? label : [label];
    });

    function render() {
      return renderSlot(slots, "default", {
        active: context.isActive(props.value),
        activate
      }, () => {
        return label.value;
      }) as ElementLike[];
    }

    let remove = () => {};

    const init = context.init;
    if (init) {
      watch(
        () => props.value,
        (value) => {
          remove();
          remove = init({
            id: Math.random().toString(16).slice(2),
            label: typeof props.label == "string" ? props.label : undefined,
            value,
            render
          });
        },
        { immediate: true }
      );

      tryOnScopeDispose(remove);
    }

    const isActive = computed(() => context.isActive(props.value));

    const isDisabled = computed(() => props.disabled);


    const className = computed(() => {
      const array = [context.itemClass.value];
      if (!isDisabled.value) {
        array.push(context.isActive(props.value) ? context.activeClass.value : context.unactiveClass.value);
      } else {
        array.push(context.disabledClass.value);
      }
      return cls(array);
    });

    const activateEvent = computed(() => props.activateEvent ?? context.activateEvent.value);

    return {
      activate,
      render,
      isActive,
      isDisabled,
      className,
      activateEvent,
      label
    };
  }
});

export interface HiItemSlotsData {
  active: boolean
  activate(): void
}
