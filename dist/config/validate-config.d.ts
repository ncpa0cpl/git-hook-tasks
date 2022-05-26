import type { GetDataType } from "dilswer";
declare const ConfigTypeDef: import("dilswer").RecordOf<{
    packageManager: import("dilswer").OneOf<[import("dilswer").Literal<"yarn">, import("dilswer").Literal<"npm">]>;
    hooks: {
        required: false;
        type: import("dilswer").RecordOf<{
            "pre-push": {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                }>]>]>;
            };
            "pre-commit": {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                }>]>]>;
            };
            "post-commit": {
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
        "pre-push"?: string | ({
            name: string;
            script: string;
        } | {
            name: string;
            taskFile: string;
        })[] | undefined;
        "pre-commit"?: string | ({
            name: string;
            script: string;
        } | {
            name: string;
            taskFile: string;
        })[] | undefined;
        "post-commit"?: string | ({
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
