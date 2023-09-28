import { computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import { defineHookComponent, defineHookProps } from "@hoci/shared";

export const iconProps = defineHookProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: "1rem"
  },
  width: {
    type: [Number, String]
  },
  height: {
    type: [Number, String]
  },
  color: {
    type: String
  },
  mask: {
    type: [Boolean, String] as PropType<boolean | "auto">,
    default: () => "auto"
  }
});

export type HiIconProps = typeof iconProps;

export const useIcon = defineHookComponent({
  props: iconProps,
  setup(props, context) {
    const style = computed((): CSSProperties => {
      const icon = props.src;
      const propSize = props.size ?? "16px";
      const size = typeof propSize === "number" ? `${propSize}px` : propSize;
      const propWidth = props.width ?? size;
      const width = typeof propWidth === "number" ? `${propWidth}px` : propWidth;
      const propHeight = props.height ?? size;
      const height = typeof propHeight === "number" ? `${propHeight}px` : propHeight;
      const color = props.color ?? "currentColor";
      const mask = props.mask === "auto" ? icon.endsWith(".svg") : props.mask;
      if (!mask) {
        return {
          "--icon-url": `url('${icon}')`,
          "background-image": "var(--icon-url)",
          "background-size": "100% 100%",
          "height": height,
          "width": width,
          "display": "inline-block",
          ...(context.attrs.style ?? {})
        };
      }

      return {
        "--icon-url": `url('${icon}')`,
        "mask": "var(--icon-url) no-repeat",
        "mask-size": "100% 100%",
        "-webkit-mask": "var(--icon-url) no-repeat",
        "-webkit-mask-size": "100% 100%",
        "background-color": color,
        "display": "inline-block",
        "width": width,
        "height": height,
        ...(context.attrs.style ?? {})
      };
    });

    return {
      style
    };
  }
});

