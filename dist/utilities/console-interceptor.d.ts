declare type LogLevel = "log" | "error" | "info" | "warn" | "debug" | "clear" | "table";
export declare class ConsoleInterceptor {
    private static originals;
    static restore(): void;
    static intercept(): ConsoleInterceptor;
    private constructor();
    private buffer;
    private intercept;
    read(): (readonly [loglevel: LogLevel, args: readonly any[]])[];
}
export {};
