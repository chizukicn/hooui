import { isDefined, syncRef } from "@vueuse/core";
import type { PropType } from "vue";
import { computed, defineComponent, h, provide, reactive, renderSlot } from "vue";
import type { ActivateEvent } from "../../types";
import { classPropType, labelPropType, valuePropType } from "../../constants";
import { defineHookComponent, defineHookEmits, defineHookProps } from "../../shared";
import type { Option } from "./constants";
import { ActivateEventSymbol, ActiveClassSymbol, ChangeActiveSymbol, InitSymbol, IsActiveSymbol, ItemClassSymbol, ItemLabelSymbol, UnactiveSymbol } from "./constants";

export const selectionListProps = defineHookProps({
  tag: {
    type: String,
    default: "div"
  },
  modelValue: {
    type: valuePropType,
    default: () => null
  },
  /**
   * 选中时的 class
   */
  activeClass: {
    type: classPropType,
    default: "active"
  },
  /**
   *  每个选项的 class
   */
  itemClass: {
    type: classPropType,
    default: ""
  },
  unactiveClass: {
    type: classPropType,
    default: ""
  },
  label: {
    type: labelPropType
  },

  /**
   *  多选模式
   */
  multiple: {
    type: [Boolean, Number],
    default: () => false
  },
  /**
   * 可清除
   */
  clearable: {
    type: Boolean
  },
  defaultValue: {
    type: valuePropType,
    default: () => null
  },
  activateEvent: {
    type: String as PropType<ActivateEvent>,
    default: () => "click"
  }
});

export const selectionListEmits = defineHookEmits(["update:modelValue", "change", "load", "unload"]);

export const useSelectionList = defineHookComponent({
  props: selectionListProps,
  emits: selectionListEmits,
  setup(props, { slots, emit }) {
    const options = reactive<Option[]>([]);

    function toArray(value?: any | any[]): any[] {
      if (!isDefined(value)) {
        return [];
      }
      if (props.multiple && Array.isArray(value)) {
        return value.filter(v => v != null || v !== undefined);
      }
      return [value];
    }

    const actives: any[] = reactive<any[]>([...toArray(props.modelValue ?? props.defaultValue)]);

    const currentValue = computed({
      get() {
        return props.multiple ? actives : actives[0];
      },
      set(val) {
        actives.splice(0, actives.length, ...toArray(val));
      }
    });

    const modelValue = computed({
      get() {
        return props.modelValue ?? props.defaultValue;
      },
      set(val) {
        emit("update:modelValue", val);
      }
    });

    syncRef(currentValue, modelValue, { immediate: true, deep: true });

    provide(
      ActiveClassSymbol,
      computed(() => props.activeClass)
    );

    provide(
      UnactiveSymbol,
      computed(() => props.unactiveClass)
    );

    provide(
      ItemClassSymbol,
      computed(() => props.itemClass)
    );

    provide(ItemLabelSymbol, computed(() => props.label));

    provide(ActivateEventSymbol, computed(() => props.activateEvent));

    const emitChange = () => emit("change", currentValue.value);

    function isActive(value: any) {
      return actives.includes(value);
    }

    async function changeActive(option: any) {
      if (isActive(option)) {
        if (props.multiple || props.clearable) {
          actives.splice(actives.indexOf(option), 1);
          emitChange();
        }
      } else {
        if (props.multiple) {
          const limit = typeof props.multiple === "number" ? props.multiple : Infinity;
          if (actives.length < limit) {
            actives.push(option);
            emitChange();
          }
        } else {
          actives.splice(0, actives.length, option);
          emitChange();
        }
      }
    }

    provide(IsActiveSymbol, isActive);

    provide(ChangeActiveSymbol, changeActive);

    provide(InitSymbol, (option: Option) => {
      function remove() {
        const index = options.findIndex(e => e.id === option.id);
        if (index > -1) {
          options.splice(index, 1);
          emit("unload", option);
        }
      }
      for (let i = 0; i < options.length; i++) {
        if (options[i].value === option.value) {
          options.splice(i, 1);
          i--;
        }
      }
      options.push(option);
      emit("load", option);
      return remove;
    });

    function renderItem() {
      const children = options.filter(e => actives.includes(e.value)).map(e => e.render());
      return props.multiple ? children : children[0];
    }

    function render() {
      return h(props.tag, {}, renderSlot(slots, "default", {}));
    }

    return {
      options,
      actives,
      isActive,
      changeActive,
      renderItem,
      render
    };
  }
});

export const HiSelection = defineComponent({
  name: "HiSelection",
  props: selectionListProps,
  emits: selectionListEmits,
  setup(props, context) {
    const { render } = useSelectionList(props, context);
    return () => render();
  }
});
