import { toReactive as _toReactive, noop } from "@vueuse/core";
import { toRef as _toRef, customRef, readonly, ref } from "vue";
import type { ComputedRef, MaybeRefOrGetter, Ref, ToRef, UnwrapNestedRefs } from "vue";

export const toReactive = _toReactive as <T>(value: T) => UnwrapNestedRefs<T>;


export function toRef<T>(r: () => T): Readonly<Ref<T>>;
export function toRef<T>(r: ComputedRef<T>): ComputedRef<T>;
export function toRef<T>(r: MaybeRefOrGetter<T>): Ref<T>;
export function toRef<T>(r: T): Ref<T>;
export function toRef<T extends object, K extends keyof T>(object: T, key: K): ToRef<T[K]>;
export function toRef<T extends object, K extends keyof T>(object: T, key: K, defaultValue: T[K]): ToRef<Exclude<T[K], undefined>>;
export function toRef(...args: any[]) {
  if (args.length !== 1) {
    return _toRef(...args as [any, any]);
  };
  const r = args[0];
  return typeof r === "function"
    ? readonly(customRef(() => ({ get: r as any, set: noop })))
    : ref(r);
}

/**
 * @deprecated use `toRef` instead
 */
export const resolveRef = toRef;
