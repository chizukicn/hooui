import { isDefined, syncRef, toReactive } from "@vueuse/core";
import type { InjectionKey, PropType } from "vue";
import {
  computed,
  inject,
  provide,
  reactive
} from "vue";
import {
  classPropType,
  defineHookComponent,
  defineHookEmits,
  defineHookProps,
  labelPropType,
  valuePropType
} from "@hoci/shared";
import type { ActivateEvent, ElementLike } from "@hoci/shared";
import { cls } from "tslx";


export type InitFunction = (option: Option) => () => void;

export interface Option {
  id?: string
  label?: string
  value: any | null
  render(): ElementLike
}


export interface HiSelectionContext {
  changeActive: (_: any) => void
  isActive: (_: any) => boolean
  init?: InitFunction
  activateEvent: ActivateEvent
  activeClass: string
  itemClass: string
  unactiveClass: string
  disabledClass: string
  label: string | ((_: any) => ElementLike | null | undefined) | null | undefined
  multiple: boolean | number
}

export const selectionProps = defineHookProps({

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
  disabledClass: {
    type: classPropType,
    default: "disabled"
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


export type SelectionProps = typeof selectionProps;



export const selectionEmits = defineHookEmits([
  "update:modelValue",
  "change",
  "load",
  "unload"
]);

const HiSelectionContextSymbol: InjectionKey<HiSelectionContext> = Symbol("[hi-selection]context");

export function useSelectionContext() {
  return inject(HiSelectionContextSymbol, {
    isActive: () => false,
    changeActive: () => {},
    activeClass: "active",
    unactiveClass: "unactive",
    disabledClass: "disabled",
    itemClass: "",
    activateEvent: "click",
    label: null,
    multiple: false
  });
}

export const useSelectionList = defineHookComponent({
  props: selectionProps,
  emits: selectionEmits,
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

    const init = (option: Option) => {
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
    };


    provide(HiSelectionContextSymbol, toReactive({
      activeClass: computed(() => cls(props.activeClass)),
      unactiveClass: computed(() => cls(props.unactiveClass)),
      disabledClass: computed(() => cls(props.disabledClass)),
      itemClass: computed(() => cls(props.itemClass)),
      label: computed(() => props.label),
      multiple: computed(() => props.multiple),
      clearable: computed(() => props.clearable),
      defaultValue: computed(() => props.defaultValue),
      activateEvent: computed(() => props.activateEvent),
      active: currentValue,
      changeActive,
      isActive,
      init
    }));


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



export interface HiSelectionSlotData extends Record<string, unknown> {
  isActive: (value: any) => boolean
  changeActive: (value: any) => void
  renderItem: () => ElementLike
}
