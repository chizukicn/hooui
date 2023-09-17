import { toRef } from "@vueuse/core";
import type { PropType } from "vue";
import {
  capitalize,
  computed,
  defineComponent,
  h,
  inject,
  onDeactivated,
  renderSlot,
  watch
} from "vue";
import { cls } from "tslx";
import { defineHookComponent, defineHookProps } from "../../shared";
import type { ActivateEvent, ElementLike } from "../../types";
import { valuePropType } from "../../constants";
import {
  ActivateEventSymbol,
  ActiveClassSymbol,
  ChangeActiveSymbol,
  DisabledClassSymbol,
  InitSymbol,
  IsActiveSymbol,
  ItemClassSymbol,
  ItemLabelSymbol,
  UnactiveSymbol
} from "./constants";

export const selectionItemProps = defineHookProps({
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
  key: {
    type: [String, Number, Symbol] as PropType<string | number | symbol>
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
  props: selectionItemProps,
  setup(props, { slots }) {
    const isActiveFn = inject(IsActiveSymbol, () => false);
    const changeActive = inject(ChangeActiveSymbol, () => {});

    const parentLabel = toRef(inject(ItemLabelSymbol));

    const activate = () => {
      if (props.disabled) {
        return;
      }
      changeActive(props.value);
    };

    function render() {
      return renderSlot(slots, "default", {
        active: isActiveFn(props.value),
        activate
      }, () => {
        let label = props.label ?? parentLabel.value;
        if (label && typeof label == "function") {
          label = label(props.value)!;
        }
        return Array.isArray(label) ? label : [label];
      });
    }

    let remove = () => {};
    const init = inject(InitSymbol);
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
      onDeactivated(() => remove());
    }

    const isActive = computed(() => isActiveFn(props.value));

    const isDisabled = computed(() => props.disabled);

    const activeClass = computed(
      () => inject(ActiveClassSymbol)?.value ?? "active"
    );
    const unactiveClass = computed(
      () => inject(UnactiveSymbol)?.value ?? "unactive"
    );

    const disabledClass = computed(() => {
      return inject(DisabledClassSymbol)?.value ?? "disabled";
    });

    const itemClass = computed(() => {
      return inject(ItemClassSymbol)?.value ?? "";
    });

    const className = computed(() => {
      const array = [itemClass.value];
      if (!isDisabled.value) {
        array.push(isActiveFn(props.value) ? activeClass.value : unactiveClass.value);
      } else {
        array.push(disabledClass.value);
      }
      return cls(array);
    });

    const activateEvent = toRef(() => {
      const event = inject(ActivateEventSymbol);
      return props.activateEvent ?? event?.value ?? "click";
    });

    return {
      activate,
      render,
      isActive,
      isDisabled,
      activeClass,
      unactiveClass,
      disabledClass,
      itemClass,
      className,
      activateEvent
    };
  }
});

export const HiItem = defineComponent({
  name: "HiItem",
  props: {
    ...selectionItemProps,
    tag: {
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
        props.tag,
        {
          class: className.value,
          [`on${capitalize(activateEvent.value)}`]: activate,
          disabled: isDisabled.value
        },
        render()
      );
  }
});

export interface HiItemSlotsData {
  active: boolean
  activate(): void
}
