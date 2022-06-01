export declare type ThrottledCallback<A extends any[], R> = ((this: any, ...a: A) => R) & {
    setWait(wait: number): void;
};
export declare function throttle<A extends any[], R>(func: (...args: A) => R, wait: number, options?: {
    leading?: boolean;
    trailing?: boolean;
}): ThrottledCallback<A, R>;
