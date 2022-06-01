import type { PackageManager } from "../../package-manager-bindings/types";
export declare const runTaskWorker: (pm: PackageManager, cwd: string, scriptPath: string, name: string) => Promise<void>;
