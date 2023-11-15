import type {
  ComponentPropsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  PropType,
  SetupContext
} from "vue-demi";
export type ObjectEmitsOptions = Record<
string,
((...args: any[]) => any) | null
>;

type DefaultFactory<T> = () => T | null | undefined;

export interface PropOptions<T = any, D = T> {
  type?: PropType<T> | true | null
  required?: boolean
  default?: D | DefaultFactory<D> | null | undefined | object
  validator?(value: unknown): boolean
}
export type Prop<T, D = T> = PropOptions<T, D> | PropType<T>;

export type ComponentObjectPropsOptions<P = Record<string, any>> = {
  [K in keyof P]: Prop<P[K]> | null
};

export type EmitsOptions = ObjectEmitsOptions | string[];


export interface HookComponentOptions<
  R,
  E extends EmitsOptions,
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
  E extends EmitsOptions,
  P = ComponentPropsOptions,
  D = ExtractPropTypes<P>,
  Defaults = ExtractDefaultPropTypes<P>
> = (
  props: Partial<Defaults> & Omit<D, keyof Defaults>,
  context: SetupContext<E>
) => R;

export type Constructor<T> =
  | {
    new (...args: any[]): T & {}
  }
  | {
    (): T
  };


export type ClassType = string | string[] | Record<string, any>;

export type ActivateEvent =
  | "click"
  | "mouseenter"
  | "mousedown"
  | "mouseup"
  | "dblclick"
  | "contextmenu"
  | "touchstart"
  | "touchend";

export type ElementLike = JSX.Element | string | ElementLike[];
