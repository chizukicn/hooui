import type { ComponentPropsOptions, EmitsOptions, ExtractPropTypes, SetupContext } from "vue";
import type { MaybeFunction } from "maybe-types";
import { reactiveComputed } from "@vueuse/core";

export interface HookComponentOptions<R, E = EmitsOptions, EE extends string = string, P = ComponentPropsOptions, D extends Record<string, unknown> = ExtractPropTypes<P>> {
  props?: P
  emits?: E | EE[]
  setup: (props: D, context: SetupContext<E>) => R
}

export type HookComponent<R, E = EmitsOptions, P = ComponentPropsOptions, D extends Record<string, unknown> = ExtractPropTypes<P>> = (props: MaybeFunction<D>, context: SetupContext<E>) => R;

export function defineHookProps<P = ComponentPropsOptions>(props: P) {
  return props;
}

export function defineHookEmits<E, EE extends string = string>(emits: E | EE[]) {
  return emits;
}

export function defineHookComponent<R, E = EmitsOptions, EE extends string = string, P = ComponentPropsOptions, D extends Record<string, unknown> = ExtractPropTypes<P>>(options: HookComponentOptions<R, E, EE, P, D>): HookComponent<R, E, P, D> {
  return (props: MaybeFunction<D>, context: SetupContext<E>) => {
    const p = props instanceof Function ? reactiveComputed(() => props()) : props;
    return options.setup(p, context);
  };
}

