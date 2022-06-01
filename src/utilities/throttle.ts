export type ThrottledCallback<A extends any[], R> = ((
  this: any,
  ...a: A
) => R) & { setWait(wait: number): void };

export function throttle<A extends any[], R>(
  func: (...args: A) => R,
  wait: number,
  options: { leading?: boolean; trailing?: boolean } = {}
): ThrottledCallback<A, R> {
  let context: any, args: A, result: R;
  let timeout: null | NodeJS.Timeout = null;
  let previous = 0;
  if (!options) options = {};
  const later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    // @ts-expect-error
    if (!timeout) context = args = null;
  };
  const fn: ThrottledCallback<A, R> = function (this: any, ...a: A): R {
    const now = Date.now();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = a;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      // @ts-expect-error
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  } as ThrottledCallback<A, R>;

  fn.setWait = (ms) => {
    wait = ms;
  };

  return fn;
}
