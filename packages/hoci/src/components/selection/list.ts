import { isDefined, syncRef } from "@vueuse/core";
import { type PropType } from "vue";
import {
  computed,
  defineComponent,
  h,
  provide,
  reactive,
  renderSlot
} from "vue";
import { type ActivateEvent, type ElementLike } from "../../types";
import { classPropType, labelPropType, valuePropType } from "../../constants";
import {
  defineHookComponent,
  defineHookEmits,
  defineHookProps,
  normalizeClass
} from "../../shared";
import { type Option } from "./constants";
import {
  ActivateEventSymbol,
  ActiveClassSymbol,
  ChangeActiveSymbol,
  InitSymbol,
  IsActiveSymbol,
  ItemClassSymbol,
  ItemLabelSymbol,
  UnactiveSymbol
} from "./constants";

export const selectionListProps = defineHookProps({

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

export const selectionListEmits = defineHookEmits([
  "update:modelValue",
  "change",
  "load",
  "unload"
]);

export const useSelectionList = defineHookComponent({
  props: selectionListProps,
  emits: selectionListEmits,
  setup(props, { emit }) {
    const options = reactive<Option[]>([]);

    function toArray(value?: any | any[]): any[] {
      if (!isDefined(value)) {
        return [];
      }
      if (props.multiple && Array.isArray(value)) {
        return value.filter((v) => v != null || v !== undefined);
      }
      return [value];
    }

    const actives: any[] = reactive<any[]>([
      ...toArray(props.modelValue ?? props.defaultValue)
    ]);

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
      computed(() => normalizeClass(props.activeClass))
    );

    provide(
      UnactiveSymbol,
      computed(() => normalizeClass(props.unactiveClass))
    );

    provide(
      ItemClassSymbol,
      computed(() => normalizeClass(props.itemClass))
    );

    provide(
      ItemLabelSymbol,
      computed(() => props.label)
    );

    provide(
      ActivateEventSymbol,
      computed(() => props.activateEvent)
    );

    const emitChange = () => emit("change", currentValue.value);

    function isActive(value: any) {
      return actives.includes(value);
    }

    function changeActive(value: any) {
      if (isActive(value)) {
        if (props.multiple || props.clearable) {
          actives.splice(actives.indexOf(value), 1);
          emitChange();
        }
      } else {
        if (props.multiple) {
          const limit
            = typeof props.multiple === "number" ? props.multiple : Number.POSITIVE_INFINITY;
          if (actives.length < limit) {
            actives.push(value);
            emitChange();
          }
        } else {
          actives.splice(0, actives.length, value);
          emitChange();
        }
      }
    }

    provide(IsActiveSymbol, isActive);

    provide(ChangeActiveSymbol, changeActive);

    provide(InitSymbol, (option: Option) => {
      function remove() {
        const index = options.findIndex((e) => e.id === option.id);
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
      const children = options
        .filter((e) => actives.includes(e.value))
        .map((e) => e.render());
      return props.multiple ? children : children[0];
    }

    return {
      options,
      actives,
      isActive,
      changeActive,
      renderItem
    };
  }
});

export const HiSelection = defineComponent({
  name: "HiSelection",
  props: {
    ...selectionListProps,
    tag: {
      type: String,
      default: "div"
    }
  },
  emits: selectionListEmits,
  setup(props, context) {
    const { isActive, changeActive, renderItem } = useSelectionList(props, context);
    const { slots } = context;
    return () => h(props.tag, {}, renderSlot(slots, "default", {
      isActive,
      changeActive,
      renderItem
    }));
  }
});

export interface HiSelectionSlotData {
  isActive(value: any): boolean
  changeActive(value: any): void
  renderItem: () => ElementLike
}
