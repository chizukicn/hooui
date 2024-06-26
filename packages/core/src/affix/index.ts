import { computed, inject, provide, ref, watchPostEffect } from "vue";
import type { InjectionKey, MaybeRefOrGetter, PropType, Ref } from "vue";
import { useElementBounding, useElementVisibility, useEventListener } from "@vueuse/core";
import type { CSSProperties } from "tslx";
import { defineHookComponent, defineHookEmits, defineHookProps, isWindow, throttleByRaf, toReactive, useElement } from "@hoci/shared";
import { px } from "tslx";

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
    /**
     * @zh 固定的相对方向
     */
    position: {
      type: String as PropType<"top" | "bottom">,
      default: "top"
    },
    /**
     * @zh 滚动容器，默认是 `window`
     * @en Scroll container, default is `window`
     */
    target: {
      type: [String, Object, Function] as PropType<
        string | Element | (() => Element | null | undefined)
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

export const AFFIX_TARGET_KEY: InjectionKey<MaybeRefOrGetter<Element | null | undefined>> = Symbol("AFFIX_TARGET_KEY");

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
    const wrapperRef = ref<HTMLElement>();

    const wrapperRect = toReactive(useElementBounding(wrapperRef));

    const parentRef = inject(AFFIX_TARGET_KEY, undefined);

    const targetRef = useElement(props.target, parentRef);

    const isFixed = ref(false);
    const placeholderStyle: Ref<CSSProperties> = ref({});
    const fixedStyle: Ref<CSSProperties> = ref({});

    const className = computed(() => {
      return isFixed.value ? props.fixedClass : "";
    });

    const wrapperVisible = useElementVisibility(wrapperRef);

    const containerRef = computed(() => {
      if (!wrapperVisible.value) {
        return null;
      }
      return targetRef.value ?? window;
    });

    const updatePosition = throttleByRaf(async () => {
      if (!wrapperRef.value || !containerRef.value) {
        return;
      }
      const area = wrapperRect.width * wrapperRect.height;
      if (area === 0) {
        return;
      }
      const newPlaceholderStyles: CSSProperties = {
        width: px(wrapperRect.width),
        height: px(wrapperRect.height)
      };

      const targetRect = getTargetRect(containerRef.value);
      let newIsFixed = false;
      let newFixedStyles = {};

      const offset = props.offset;

      if (props.position === "top") {
        newIsFixed = (wrapperRect.top - targetRect.top < offset) && offset >= 0;
        newFixedStyles = newIsFixed
          ? {
              position: "fixed",
              zIndex: props.zIndex,
              top: px(targetRect.top + offset)
            }
          : {};
      } else {
        newIsFixed = (targetRect.bottom - wrapperRect.bottom) < offset;
        newFixedStyles = newIsFixed
          ? {
              position: "fixed",
              bottom: px(window.innerHeight - targetRect.bottom + offset)
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

    useEventListener(containerRef, "scroll", () => {
      emit("scroll");
      updatePosition();
    });

    useEventListener(containerRef, "resize", updatePosition);

    // When the scroll container is not a window, you need to bind the outer scroll event of the scroll container to update the position
    watchPostEffect(updatePosition);

    return {
      className,
      wrapperRef,
      containerRef,
      isFixed,
      placeholderStyle,
      fixedStyle,
      updatePosition
    };
  }
});

export function provideAffixTarget(target: MaybeRefOrGetter<Element | null | undefined>) {
  provide(AFFIX_TARGET_KEY, target);
}
