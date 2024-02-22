import type { ActivateEvent, ElementLike } from "@hoci/shared";
import { defineHookComponent, defineHookEmits, defineHookProps, valuePropType } from "@hoci/shared";
import type { PropType } from "vue";
import { computed, watch } from "vue";
import { tryOnScopeDispose } from "@vueuse/core";
import { cls } from "tslx";
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

export const itemEmits = defineHookEmits(["reject"]);


export const useSelectionItem = defineHookComponent({
  props: itemProps,
  emits: itemEmits,
  setup(props, { slots, emit }) {
    const context = useSelectionContext();

    const activate = () => {
      if (props.disabled) {
        emit("reject", props.value);
        context.reject(props.value);
        return;
      }
      context.activate(props.value);
    };

    const label = computed(() => {
      let label = props.label ?? context.label;
      if (label && typeof label == "function") {
        label = label(props.value)!;
      }
      return Array.isArray(label) ? label : [label];
    });

    function render() {
      return slots.default?.({
        active: context.isActive(props.value),
        activate
      }) ?? ((label.value).filter(Boolean)) as ElementLike;
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
      const array = [context.itemClass];
      if (!isDisabled.value) {
        array.push(context.isActive(props.value) ? context.activeClass : context.unactiveClass);
      } else {
        array.push(context.disabledClass);
      }
      return cls(array);
    });

    const activateEvent = computed(() => props.activateEvent ?? context.activateEvent);

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
