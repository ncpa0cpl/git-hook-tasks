import type { GitHookTasksConfig } from "./validate-config";
export declare const CONFIG_FILE_NAME = "git-hook-tasks.config.json";
export declare const readConfig: (cwd: string) => Promise<GitHookTasksConfig>;
