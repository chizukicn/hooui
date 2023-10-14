import type { InjectionKey } from "vue";
import { inject, provide } from "vue";
import defu from "defu";
import type { PartialDeep } from "type-fest";
import type { ActivateEvent } from "../types";

const SHARED_CONFIG_KEY: InjectionKey<PartialDeep<SharedConfig>> = Symbol("SharedConfig");

export interface SharedConfig {
  icon: {
    size: number | undefined
    sizeUnit: string | undefined
  }
  activateEvent: ActivateEvent
}

export const DEFAULT_SHARED_CONFIG: SharedConfig = {
  icon: {
    size: undefined,
    sizeUnit: "px"
  },
  activateEvent: "click"
};

export function provideSharedConfig(config: PartialDeep<SharedConfig>) {
  provide(SHARED_CONFIG_KEY, config);
}

export function useSharedConfig<S extends keyof SharedConfig>(scope: S): SharedConfig[S];
export function useSharedConfig(): SharedConfig;


export function useSharedConfig<S extends (keyof SharedConfig) | undefined = undefined>(scope?: S) {
  const injectConfig = inject(SHARED_CONFIG_KEY, {}) as SharedConfig;
  const config = defu(injectConfig, DEFAULT_SHARED_CONFIG);
  if (scope) {
    return config[scope] ?? {};
  }
  return config;
}
