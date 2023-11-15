import { isDefined, syncRef } from "@vueuse/core";
import { type InjectionKey, type PropType, type Ref, ref } from "vue-demi";
import {
  computed,
  inject,
  provide
} from "vue-demi";
import {
  classPropType,
  defineHookComponent,
  defineHookEmits,
  defineHookProps,
  labelPropType,
  useSharedConfig,
  valuePropType
} from "@hoci/shared";
import type { ActivateEvent, ElementLike } from "@hoci/shared";
import { cls, renderSlot } from "tslx";


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
  activateEvent: Ref<ActivateEvent>
  activeClass: Ref<string>
  itemClass: Ref<string>
  unactiveClass: Ref<string>
  disabledClass: Ref<string>
  label: Ref<string | ((_: any) => ElementLike | null | undefined) | null | undefined>
  multiple: Ref<boolean | number>
  clearable: Ref<boolean>
  defaultValue: Ref<any | null | undefined>
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
    type: String as PropType<ActivateEvent>
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
  const sharedConfig = useSharedConfig();
  return inject(HiSelectionContextSymbol, {
    isActive: () => false,
    changeActive: () => {},
    activeClass: ref(""),
    unactiveClass: ref(""),
    disabledClass: ref(""),
    itemClass: ref(""),
    activateEvent: ref(sharedConfig.activateEvent),
    label: ref(null),
    multiple: ref(false),
    clearable: ref(false),
    defaultValue: ref(null)
  });
}

export const useSelectionList = defineHookComponent({
  props: selectionProps,
  emits: selectionEmits,
  setup(props, { emit, slots }) {
    const options = ref<Option[]>([]);

    function toArray(value?: any | any[]): any[] {
      if (!isDefined(value)) {
        return [];
      }
      if (props.multiple && Array.isArray(value)) {
        return value.filter((v) => v != null || v !== undefined);
      }
      return [value];
    }

    const actives = ref<any[]>([
      ...toArray(props.modelValue ?? props.defaultValue)
    ]);

    const currentValue = computed({
      get() {
        return props.multiple ? actives : actives.value[0];
      },
      set(val) {
        actives.value.splice(0, actives.value.length, ...toArray(val));
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
      return actives.value.includes(value);
    }

    function changeActive(value: any) {
      if (isActive(value)) {
        if (props.multiple || props.clearable) {
          actives.value.splice(actives.value.indexOf(value), 1);
          emitChange();
        }
      } else {
        if (props.multiple) {
          const limit
            = typeof props.multiple === "number" ? props.multiple : Number.POSITIVE_INFINITY;
          if (actives.value.length < limit) {
            actives.value.push(value);
            emitChange();
          }
        } else {
          actives.value.splice(0, actives.value.length, value);
          emitChange();
        }
      }
    }

    const init = (option: Option) => {
      function remove() {
        const index = options.value.findIndex((e) => e.id === option.id);
        if (index > -1) {
          options.value.splice(index, 1);
          emit("unload", option);
        }
      }
      for (let i = 0; i < options.value.length; i++) {
        if (options.value[i].value === option.value) {
          options.value.splice(i, 1);
          i--;
        }
      }
      options.value.push(option);
      emit("load", option);
      return remove;
    };


    const sharedConfig = useSharedConfig();

    provide(HiSelectionContextSymbol, ({
      activeClass: computed(() => cls(props.activeClass)),
      unactiveClass: computed(() => cls(props.unactiveClass)),
      disabledClass: computed(() => cls(props.disabledClass)),
      itemClass: computed(() => cls(props.itemClass)),
      label: computed(() => props.label),
      multiple: computed(() => props.multiple),
      clearable: computed(() => props.clearable),
      defaultValue: computed(() => props.defaultValue),
      activateEvent: computed(() => props.activateEvent ?? sharedConfig.activateEvent),
      changeActive,
      isActive,
      init
    }));


    const renderItem = () => {
      const children = options.value
        .filter((e) => actives.value.includes(e.value))
        .map((e) => e.render());
      return props.multiple ? children : children[0];
    };

    const slotData: HiSelectionSlotData = {
      isActive,
      changeActive,
      renderItem
    };

    const render = () => {
      return renderSlot(slots, "default", slotData);
    };

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



export interface HiSelectionSlotData extends Record<string, unknown> {
  isActive: (value: any) => boolean
  changeActive: (value: any) => void
  renderItem: () => ElementLike
}
