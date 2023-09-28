import { computed, inject, nextTick, provide, ref, watchPostEffect } from "vue";
import type { InjectionKey, MaybeRefOrGetter, PropType, Ref } from "vue";
import { useElementVisibility, useEventListener } from "@vueuse/core";
import { type CSSProperties } from "tslx";
import { defineHookComponent, defineHookEmits, defineHookProps, isWindow, throttleByRaf, useElement } from "@hoci/shared";

export const affixProps = defineHookProps(
  {
    fixedClass: {
      type: String,
      default: ""
    },
    /**
     * @zh 距离窗口顶部达到指定偏移量后触发
     * @en Triggered when the specified offset is reached from the top of the window
     */
    offset: {
      type: Number,
      default: 0
    },

    offsetType: {
      type: String as PropType<"top" | "bottom">,
      default: "top"
    },
    /**
     * @zh 滚动容器，默认是 `window`
     * @en Scroll container, default is `window`
     */
    target: {
      type: [String, Object, Function] as PropType<
      string | HTMLElement | Window
      >
    },
    /**
   * @zh z-index 值
   * @en Z index value
   */
    zIndex: {
      type: Number,
      default: 998
    }
  }
);

export type AffixProps = typeof affixProps;

export const affixEmits = defineHookEmits(["scroll", "change"]);

export const AFFIX_TARGET_KEY: InjectionKey<MaybeRefOrGetter<HTMLElement | Window | Element | null | undefined>> = Symbol("AFFIX_TARGET_KEY");

function getTargetRect(target: Element | Window) {
  return isWindow(target)
    ? {
        top: 0,
        bottom: window.innerHeight
      }
    : target.getBoundingClientRect();
}


export const useAffix = defineHookComponent({
  props: affixProps,
  setup(props, { emit }) {
    const wrapperRef = ref<HTMLElement | null>(null);

    const parentRef = inject(AFFIX_TARGET_KEY, window);

    const targetRef = useElement(props.target, parentRef);


    const isFixed = ref(false);
    const placeholderStyle: Ref<CSSProperties> = ref({});
    const fixedStyle: Ref<CSSProperties> = ref({});

    const classNames = computed(() => {
      return isFixed.value ? props.fixedClass : "";
    });

    const wrapperVisible = useElementVisibility(wrapperRef);

    const container = computed(() => {
      if (!targetRef.value || !wrapperVisible.value) {
        return null;
      }
      return targetRef.value ?? window;
    });

    const updatePosition = throttleByRaf(async () => {
      if (!wrapperRef.value || !targetRef.value) {
        return;
      }

      await nextTick();

      const wrapperRect = wrapperRef.value.getBoundingClientRect();
      const targetRect = getTargetRect(targetRef.value);
      let newIsFixed = false;
      let newFixedStyles = {};
      const newPlaceholderStyles: CSSProperties = {
        width: `${wrapperRef.value.offsetWidth}px`,
        height: `${wrapperRef.value.offsetHeight}px`
      };

      const offset = props.offset;

      if (props.offsetType === "top") {
        newIsFixed = (wrapperRect.top - targetRect.top < offset) && offset >= 0;
        newFixedStyles = newIsFixed
          ? {
              position: "fixed",
              zIndex: props.zIndex,
              top: `${targetRect.top + (offset || 0)}px`
            }
          : {};
      } else {
        newIsFixed = targetRect.bottom - wrapperRect.bottom < (offset || 0);
        newFixedStyles = newIsFixed
          ? {
              position: "fixed",
              bottom: `${
                window.innerHeight - targetRect.bottom + (offset || 0)
              }px`
            }
          : {};
      }


      // update isFixed
      if (newIsFixed !== isFixed.value) {
        isFixed.value = newIsFixed;
        emit("change", newIsFixed);
      }
      // update placeholderStyles
      placeholderStyle.value = newPlaceholderStyles;
      // update fixedStyles
      fixedStyle.value = {
        ...newFixedStyles,
        ...(newIsFixed ? newPlaceholderStyles : {})
      };
    });



    useEventListener(container, "scroll", () => {
      emit("scroll");
      updatePosition();
    });

    useEventListener(container, "resize", updatePosition);

    // When the scroll container is not a window, you need to bind the outer scroll event of the scroll container to update the position
    watchPostEffect(updatePosition);

    return {
      classNames,
      wrapperRef,
      isFixed,
      placeholderStyle,
      fixedStyle,
      updatePosition
    };
  }
});


export function provideAffixTarget(target: MaybeRefOrGetter<HTMLElement | Element | null | undefined>) {
  provide(AFFIX_TARGET_KEY, target);
}
