import type { PropType } from "vue";

export const valuePropType = [
  String,
  Number,
  Object,
  Boolean,
  null
] as PropType<any>;

export const classPropType = [String, Array, Object] as PropType<
string | string[] | Record<string, boolean>
>;

export const labelPropType = [String, Function] as PropType<
string | ((val?: any) => string) | null
>;
