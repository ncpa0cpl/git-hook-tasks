export declare type HookTask = string | Array<{
    /** Name of the task. */
    name: string;
    /** Task script to execute, as defined in the package.json file. */
    script: string;
} | {
    /** Name of the task. */
    name: string;
    /** Path to the script file to execute. */
    taskFile: string;
}>;
export declare type GitHookTasksConfig = {
    packageManager: "yarn" | "npm";
    hooks?: {
        prepush?: HookTask;
        precommit?: HookTask;
        postcommit?: HookTask;
    };
};
