import type { OutputManager } from "./output-manager";
export declare class OutputLine<T extends Array<string | undefined>> {
    private manager;
    private content;
    private separator;
    private isClosed;
    constructor(manager: typeof OutputManager, initialContent: T);
    setSeparator(separator: string): void;
    getContent(): string;
    update(value: T | ((current: T) => T)): void;
    close(): void;
}
