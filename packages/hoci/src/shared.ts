import type { MaybeFunction } from "maybe-types";
import type {
  ComponentObjectPropsOptions,
  ComponentPropsOptions,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  PropType,
  SetupContext
} from "vue";
import { reactiveComputed } from "@vueuse/core";
import type { ClassType } from "./types";

export interface HookComponentOptions<
  R,
  E = EmitsOptions,
  EE extends string = string,
  P = ComponentPropsOptions,
  D = ExtractPropTypes<P>
> {
  props?: P
  emits?: E | EE[]
  setup: (props: D, context: SetupContext<E>) => R
}

export type HookComponent<
  R,
  E = EmitsOptions,
  P = ComponentPropsOptions,
  D = ExtractPropTypes<P>,
  Defaults = ExtractDefaultPropTypes<P>
> = (
  props: MaybeFunction<Partial<Defaults> & Omit<D, keyof Defaults>>,
  context: SetupContext<E>
) => R & { $props: D };

export function defineHookProps<
  P extends ComponentObjectPropsOptions = ComponentObjectPropsOptions
>(props: P) {
  return props;
}

export function defineHookEmits<
  E extends EmitsOptions = EmitsOptions,
  EE extends string = string
>(emits: E | EE[]) {
  return emits;
}

export function defineHookComponent<
  R,
  E = EmitsOptions,
  EE extends string = string,
  P = ComponentPropsOptions,
  D = ExtractPropTypes<P>,
  Defaults = ExtractDefaultPropTypes<P>
>(
  options: HookComponentOptions<R, E, EE, P, D>
): HookComponent<R, E, P, D, Defaults> {
  return (
    props: MaybeFunction<Partial<Defaults> & Omit<D, keyof Defaults>>,
    context: SetupContext<E>
  ) => {
    const p = withDefaults<P, D, Defaults>(
      isFunction(props) ? reactiveComputed(() => props()) : props,
      options.props!
    );
    const rs = options.setup(p, context);
    return { ...rs, $props: p } as R & { $props: D };
  };
}

function isFunction<F extends Function>(value: unknown): value is F {
  return typeof value === "function";
}

function withDefaults<
  P = ComponentPropsOptions,
  D = ExtractPropTypes<P>,
  Defaults = ExtractDefaultPropTypes<P>
>(props: Partial<Defaults> & Omit<D, keyof Defaults>, propsOptions: P): D {
  if (Array.isArray(propsOptions)) {
    return props as D;
  }
  const rs = {} as D;
  const options = propsOptions as ComponentObjectPropsOptions<D>;
  for (const key in options) {
    const k = key as keyof D;
    const opt = options[k];
    if (opt === null) {
      continue;
    }
    if (typeof opt === "function") {
      if (isExtends(opt, Boolean)) {
        rs[key] = false as D[typeof key];
      }
      continue;
    }
    if (Array.isArray(opt)) {
      if (opt.some((e) => isExtends(e, Boolean))) {
        rs[key] = false as D[typeof key];
      }
      continue;
    }
    if (isFunction(opt.default)) {
      rs[key] = opt.default(props) as D[typeof key];
    } else if (opt.default !== undefined) {
      rs[key] = opt.default as D[typeof key];
    }
  }
  return { ...rs, ...props } as D;
}

export function isExtends(types: PropType<any>, value: PropType<any>): boolean {
  if (Array.isArray(types)) {
    return types.some((e) => isExtends(e, value));
  }
  return value === types;
}

export function normalizeClass(value: ClassType): string {
  if (Array.isArray(value)) {
    return value.join(" ");
  }
  if (typeof value === "string") {
    return value;
  }
  return Object.keys(value)
    .filter((e) => !!value[e])
    .join(" ");
}
