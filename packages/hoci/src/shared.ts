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
) => R;

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
      isFunction(props) ? (reactiveComputed(() => props()) as Partial<Defaults> & Omit<D, keyof Defaults>) : props,
      options.props!
    );
    return options.setup(p, context);
  };
}

type Constructor<T> =
  | {
    new (...args: any[]): T & {}
  }
  | {
    (): T
  };

function isFunction<F extends Function>(value: unknown): value is F {
  return typeof value === "function";
}

function isConstructor<T>(value: unknown): value is Constructor<T> {
  return isFunction(value) && value.prototype !== undefined;
}

function withDefaults<
  P = ComponentPropsOptions,
  D = ExtractPropTypes<P>,
  Defaults = ExtractDefaultPropTypes<P>
>(props: Partial<Defaults> & Omit<D, keyof Defaults>, propsOptions: P): D {
  if (Array.isArray(propsOptions)) {
    return props as D;
  }
  const newProps = props as D;
  const options = propsOptions as ComponentObjectPropsOptions<D>;
  for (const key in options) {
    const k = key as keyof D;
    const opt = options[k];
    if (newProps[k] !== undefined) {
      continue;
    }
    if (opt === null) {
      continue;
    }
    if (isConstructor(opt)) {
      if (isExtends(opt, Boolean)) {
        newProps[key] = false as D[typeof key];
      }
      continue;
    }
    if (Array.isArray(opt)) {
      if (opt.some((e) => isExtends(e, Boolean))) {
        newProps[key] = false as D[typeof key];
      }
      continue;
    }
    if (isFunction(opt.default)) {
      newProps[key] = opt.default(props) as D[typeof key];
    } else if (opt.default !== undefined) {
      newProps[key] = opt.default as D[typeof key];
    }
  }

  return newProps as D;
}

export function isExtends(types: PropType<any>, value: PropType<any>): boolean {
  if (Array.isArray(types)) {
    return types.some((e) => isExtends(e, value));
  }
  return value === types;
}

