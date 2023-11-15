import { computed } from "vue-demi";
import type { PropType } from "vue-demi";
import { defineHookComponent, defineHookProps, useSharedConfig } from "@hoci/shared";
import type { CSSProperties } from "tslx";
import { unit_f } from "tslx";

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

export const useIcon = defineHookComponent({
  props: iconProps,
  setup(props, context) {
    const sharedConfig = useSharedConfig("icon");

    const sizeStyle = computed(() => {
      const s = props.size ?? sharedConfig.size;
      const size = s ? unit_f(s, sharedConfig.sizeUnit) : undefined;
      const w = props.width ?? size;
      const h = props.height ?? size;
      const width = w ? unit_f(w, sharedConfig.sizeUnit) : undefined;
      const height = h ? unit_f(h, sharedConfig.sizeUnit) : undefined;
      return {
        width,
        height
      };
    });

    const dynamicStyle = computed(() => {
      const mask = props.mask === "auto" ? props.src.endsWith(".svg") : props.mask;
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

    const staticStyle = computed(() => {
      return {
        "--icon-url": `url('${props.src}')`
      };
    });


    const style = computed((): CSSProperties => {
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
