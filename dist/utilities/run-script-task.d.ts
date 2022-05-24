import type { PackageManager } from "../package-manager-bindings/types";
export declare const runScriptTask: (pm: PackageManager, cwd: string, scriptLocation: string, name?: string | undefined) => Promise<[name: string, err: Error | null]>;
