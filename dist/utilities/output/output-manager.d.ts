import { OutputLine } from "./output-line";
export declare class OutputManager {
    private static lines;
    private static linesToClearOnNextRender;
    private static renderLinesOffset;
    static _rerender(): void;
    static setMaxFps(fps: number): void;
    static dynamicLine<T extends Array<string | undefined>>(initialContent: T, separator?: string): OutputLine<T>;
    static staticLine(content: string[], separator?: string): void;
}
