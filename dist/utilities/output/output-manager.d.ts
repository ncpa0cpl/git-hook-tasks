import { OutputLine } from "./output-line";
export declare class OutputManager {
    private static lines;
    private static lastRenderLines;
    private static rerenderCount;
    private static flush;
    static waitTillAllFlushed(): Promise<void>;
    static rerender(): void;
    static newLine<T extends Array<string | undefined>>(initialContent: T): OutputLine<T>;
}
