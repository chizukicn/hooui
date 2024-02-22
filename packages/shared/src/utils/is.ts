import type { Constructor } from "../types";

export const isWindow = (val: any): val is Window => typeof window !== "undefined" && toString.call(val) === "[object Window]";

export function isFunction<F extends Function>(value: unknown): value is F {
  return typeof value === "function";
}

export function isConstructor<T>(value: unknown): value is Constructor<T> {
  return isFunction(value) && value.prototype !== undefined;
}
