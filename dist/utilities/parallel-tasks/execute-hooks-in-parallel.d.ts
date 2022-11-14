import type { GitHookTasksConfig } from "../../config/validate-config";
import type { PackageManager } from "../../package-manager-bindings/types";
export declare const executeHooksInParallel: (pm: PackageManager, cwd: string, config: GitHookTasksConfig, hookLabel: keyof Exclude<GitHookTasksConfig["hooks"], undefined>) => Promise<undefined>;
