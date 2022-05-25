import type { PackageManager } from "../package-manager-bindings/types";
export declare const runScriptTask: (pm: PackageManager, cwd: string, scriptLocation: string, onProgress?: (msg: string) => void) => Promise<null | Error>;
