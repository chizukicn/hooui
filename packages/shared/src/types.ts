import type { MaybeFunction } from "maybe-types";
import type {
  ComponentPropsOptions,
  EmitsOptions,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  SetupContext
} from "vue";
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
