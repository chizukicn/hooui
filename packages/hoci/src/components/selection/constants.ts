import type { MaybeRef } from "@vueuse/core";
import type { InjectionKey, Ref } from "vue";
import type { ActivateEvent, ClassType, ElementLike } from "../../types";

export type InitFunction = (option: Option) => () => void;

export const ActiveSymbol = Symbol("[hi-selection]active");

export const InitSymbol: InjectionKey<InitFunction> = Symbol("[hi-selection]init");

export const ModelValueSymbol = Symbol("[hi-selection]model-value");

export const ActiveClassSymbol: InjectionKey<Ref<ClassType>> = Symbol("[hi-selection]active-class");
export const ItemClassSymbol: InjectionKey<Ref<ClassType>> = Symbol("[hi-selection]item-class");
export const UnactiveSymbol: InjectionKey<Ref<ClassType>> = Symbol("[hi-selection]unactive-class");

export const ItemLabelSymbol: InjectionKey<MaybeRef<string | ((_: any) => ElementLike | null | undefined) | null | undefined>> = Symbol("[hi-selection]label");
export const ItemOptionsSymbol = Symbol("[hi-selection]options");

export const ActivateEventSymbol: InjectionKey<Ref<ActivateEvent>> = Symbol("[hi-selection]activate-event");

export const ChangeActiveSymbol: InjectionKey<(_: any) => void> = Symbol("[hi-selection]change-active");

export const IsActiveSymbol: InjectionKey<(_: any) => boolean> = Symbol("[hi-selection]is-active");

export interface Option {
  id?: string
  label?: string
  value: any | null
  render(): ElementLike
}
