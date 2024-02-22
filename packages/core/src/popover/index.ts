import { defineHookComponent, defineHookEmits, defineHookProps } from "@hoci/shared";
import { onClickOutside, useVModel } from "@vueuse/core";
import { px } from "tslx";
import { type PropType, computed, nextTick, reactive, ref, watch } from "vue";

export type Placement =
  "bottom" | "top" | "left" | "right" | "auto" |
  "top-left" | "top-right" | "bottom-left" | "bottom-right" |
  "left-top" | "left-bottom" | "right-top" | "right-bottom"
;

export type TriggerEvent = "click" | "mousedown" | "dblclick" | "hover" | "contextmenu" | "focus" | "touch";

export const popoverProps = defineHookProps({
  popupClass: {
    type: String
  },
  placement: {
    type: String as PropType<Placement>,
    default: () => "auto"
  },
  triggerEvent: {
    type: String as PropType<TriggerEvent>,
    default: () => "hover"
  },
  offset: {
    type: Number,
    default: () => 8
  },
  lazy: {
    type: Boolean,
    default: () => false
  },
  visible: {
    type: Boolean,
    default: () => false
  },
  disabled: {
    type: Boolean,
    default: () => false
  },
  teleport: {
    type: [String, Object, Boolean] as PropType<string | HTMLElement | boolean>,
    default: () => true
  }
});

export const popoverEmits = defineHookEmits(["update:visible", "change"]);

export const usePopover = defineHookComponent({
  props: popoverProps,
  emits: popoverEmits,
  setup(props, context) {
    const visible = useVModel(props, "visible", context.emit, {
      passive: true
    });

    const triggerRef = ref<HTMLElement>();
    const popupRef = ref<HTMLElement>();

    const validate = (event: TriggerEvent | TriggerEvent[]) => {
      const events = Array.isArray(event) ? event : [event];
      return !props.disabled && events.includes(props.triggerEvent);
    };

    let timer: NodeJS.Timeout;

    const toggle = (_value?: boolean) => {
      const value = _value ?? !visible.value;
      visible.value = value;
      context.emit("change", value);
    };

    function onMouseover() {
      if (!validate("hover")) {
        return;
      }
      timer = setTimeout(
        () => {
          toggle(true);
        },
        props.lazy ? 800 : 100
      );
    }

    function onMouseout() {
      if (!validate("hover")) {
        return;
      }
      clearTimeout(timer);
      toggle(false);
    }

    const onClick = (e: MouseEvent) => {
      if (!validate("click")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      toggle();
    };

    onClickOutside(triggerRef, () => {
      if (!validate(["click", "contextmenu", "touch", "dblclick", "mousedown"])) {
        return;
      }
      toggle(false);
    }, {
      ignore: [popupRef]
    });

    const onContextmenu = (e: MouseEvent) => {
      if (!validate("contextmenu")) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      toggle();
    };

    const onFocusin = () => {
      if (!validate("focus")) {
        return;
      }
      toggle(true);
    };

    const onFocusout = () => {
      if (!validate("focus")) {
        return;
      }
      toggle(false);
    };

    const onTouchend = () => {
      if (!validate("touch")) {
        return;
      }
      toggle(true);
    };

    const onDblclick = () => {
      if (!validate("dblclick")) {
        return;
      }
      toggle(true);
    };

    const onMousedown = () => {
      if (!validate("mousedown")) {
        return;
      }
      toggle(true);
    };

    const onMouseup = () => {
      if (!validate("mousedown")) {
        return;
      }
      toggle(false);
    };

    const events = {
      onMouseover,
      onMouseout,
      onMousedown,
      onMouseup,
      onContextmenu,
      onClick,
      onDblclick,
      onFocusin,
      onFocusout,
      onTouchend
    };

    const dropdownPosition = reactive({ x: 0, y: 0 });

    const popupClass = computed(() => {
      return props.popupClass;
    });

    function resize() {
      const trigger = triggerRef.value;
      const popup = popupRef.value;

      if (!!trigger && !!popup && visible.value) {
        const { width, height, left, top } = trigger.getBoundingClientRect();

        const { clientWidth: pWidth, clientHeight: pHeight } = popup;

        let x = 0;
        let y = 0;

        const offset = props.offset;

        switch (props.placement) {
          case "auto":
          case "bottom":
            x = left - (pWidth - width) / 2;
            y = top + height + offset;
            break;
          case "bottom-left":
            x = left;
            y = top + height + offset;
            break;
          case "bottom-right":
            x = left + width - pWidth;
            y = top + height + offset;
            break;
          case "top":
            x = left - (pWidth - width) / 2;
            y = top - pHeight - offset;
            break;
          case "top-left":
            x = left;
            y = top - pHeight - offset;
            break;
          case "top-right":
            x = left + width - pWidth;
            y = top - pHeight - offset;
            break;
          case "left":
            x = left - pWidth - offset;
            y = top - (pHeight - height) / 2;
            break;
          case "left-top":
            x = left - pWidth - offset;
            y = top;
            break;
          case "left-bottom":
            x = left - pWidth - offset;
            y = top + height - pHeight;
            break;
          case "right":
            x = left + width + offset;
            y = top - (pHeight - height) / 2;
            break;
          case "right-top":
            x = left + width + offset;
            y = top;
            break;
          case "right-bottom":
            x = left + width + offset;
            y = top + height - pHeight;
            break;
        }
        dropdownPosition.x = x;
        dropdownPosition.y = y;
      }
    }

    watch(visible, () => {
      nextTick(resize);
    });

    const popupStyle = computed(() => {
      return {
        left: px(dropdownPosition.x),
        top: px(dropdownPosition.y),
        visibility: visible.value ? "visible" : "hidden",
        position: "fixed"
      };
    });

    return {
      events,
      dropdownPosition,
      triggerRef,
      popupRef,
      popupClass,
      popupStyle
    };
  }
});
