import { computed } from "vue";
import type { CSSProperties, PropType } from "vue";
import { defineHookComponent, defineHookProps, useSharedConfig } from "@hoci/shared";
import { createUnitFormat } from "tslx";

export const iconProps = defineHookProps({
  src: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String]
  },
  width: {
    type: [Number, String]
  },
  height: {
    type: [Number, String]
  },
  color: {
    type: String,
    default: "currentColor"
  },
  mask: {
    type: [Boolean, String] as PropType<boolean | "auto">,
    default: () => "auto"
  }
});

export type HiIconProps = typeof iconProps;

const isSvg = (src: string) => src.endsWith(".svg") || src.startsWith("data:image/svg+xml");

export const useIcon = defineHookComponent({
  props: iconProps,
  setup(props, context) {
    const sharedConfig = useSharedConfig("icon");

    const sizeStyle = computed<CSSProperties>(() => {
      const s = props.size ?? sharedConfig.size;
      const unit = createUnitFormat(sharedConfig.sizeUnit ?? "px");
      const size = s ? unit(s) : undefined;
      const w = props.width ?? size;
      const h = props.height ?? size;
      const width = w ? unit(w) : undefined;
      const height = h ? unit(h) : undefined;
      return {
        width,
        height
      };
    });

    const dynamicStyle = computed<CSSProperties>(() => {
      const mask = props.mask === "auto" ? isSvg(props.src) : props.mask;
      if (!mask) {
        return {
          "background-image": "var(--icon-url)",
          "background-size": "100% 100%"
        };
      }
      return {
        "mask": "var(--icon-url) no-repeat",
        "mask-size": "100% 100%",
        "-webkit-mask": "var(--icon-url) no-repeat",
        "-webkit-mask-size": "100% 100%",
        "background-color": props.color
      };
    });

    const staticStyle = computed<CSSProperties>(() => {
      return {
        "--icon-url": `url("${(props.src)}")`
      };
    });


    const style = computed<CSSProperties>(() => {
      return {
        ...staticStyle.value,
        ...dynamicStyle.value,
        ...sizeStyle.value,
        ...(context.attrs.style ?? {})
      };
    });

    return {
      style
    };
  }
});
