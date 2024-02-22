export interface ThrottledCancelableFn<Args extends any[]> {
  (...args: Args): void;
  cancel: () => void;
}

export function throttleByRaf<T extends any[]>(fn: (...args: T) => void) {
  let requestId: number | null;

  const wrapper = (args: T) => () => {
    requestId = null;
    fn(...args);
  };

  const throttled: ThrottledCancelableFn<T> = (...args) => {
    if (requestId == null) {
      requestId = requestAnimationFrame(wrapper(args));
    }
  };

  throttled.cancel = () => {
    cancelAnimationFrame(requestId!);
    requestId = null;
  };

  return throttled;
}
