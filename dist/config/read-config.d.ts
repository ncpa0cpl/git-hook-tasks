import type { GitHookTasksConfig } from "./config-file-type";
export declare const CONFIG_FILE_NAME = "git-hook-tasks.config.json";
export declare const readConfig: (cwd: string) => Promise<GitHookTasksConfig>;
