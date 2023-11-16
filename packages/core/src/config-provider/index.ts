import type { SharedConfig } from "@hoci/shared";
import { defineHookProps } from "@hoci/shared";
import type { PropType } from "vue";

export const configProviderProps = defineHookProps({
  icon: {
    type: Object as PropType<Partial<SharedConfig["icon"]>>
  },
  activateEvent: {
    type: String as PropType<Partial<SharedConfig["activateEvent"]>>
  }
});
