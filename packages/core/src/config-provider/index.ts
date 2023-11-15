import { defineHookProps } from "@hoci/shared";
import type { PropType } from "vue-demi";

export const configProviderProps = defineHookProps({
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
