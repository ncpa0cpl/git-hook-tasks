import type { PackageManager } from "../package-manager-bindings/types";
export declare type OM = {
    staticLine: <T extends string[]>(initialContent: T, separator?: string | undefined) => unknown;
};
export declare const runScriptTask: (pm: PackageManager, cwd: string, scriptLocation: string, onProgress?: (msg: string) => void, outputManager?: OM) => Promise<null | Error>;
