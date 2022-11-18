import type { PropType } from "vue";

export const valuePropType = [String, Number, Object, Boolean, null] as PropType<any>;

export const classPropType = [String, Array] as PropType<string | string[]>;

export const labelPropType = [String, Function] as PropType<string | ((val?: any) => string) | null>;
