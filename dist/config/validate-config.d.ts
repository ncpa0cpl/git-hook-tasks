import type { GetDataType } from "dilswer";
declare const ConfigTypeDef: import("dilswer").RecordOf<{
    packageManager: import("dilswer").OneOf<[import("dilswer").Literal<"yarn">, import("dilswer").Literal<"npm">]>;
    hooks: {
        required: false;
        type: import("dilswer").RecordOf<{
            prepush: {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                }>]>]>;
            };
            precommit: {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                }>]>]>;
            };
            postcommit: {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                }>]>]>;
            };
        }>;
    };
}>;
export declare type GitHookTasksConfig = GetDataType<typeof ConfigTypeDef>;
export declare const validateConfig: (data: unknown) => {
    hooks?: {
        prepush?: string | ({
            name: string;
            script: string;
        } | {
            name: string;
            taskFile: string;
        })[] | undefined;
        precommit?: string | ({
            name: string;
            script: string;
        } | {
            name: string;
            taskFile: string;
        })[] | undefined;
        postcommit?: string | ({
            name: string;
            script: string;
        } | {
            name: string;
            taskFile: string;
        })[] | undefined;
    } | undefined;
    packageManager: "yarn" | "npm";
};
export {};
