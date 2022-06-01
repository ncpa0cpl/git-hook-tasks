import type { GetDataType } from "dilswer";
declare const ConfigTypeDef: import("dilswer").RecordOf<{
    packageManager: import("dilswer").OneOf<[import("dilswer").Literal<"yarn">, import("dilswer").Literal<"npm">]>;
    parallel: {
        required: false;
        type: import("dilswer").OneOf<["boolean", import("dilswer").RecordOf<{
            "pre-push": {
                required: false;
                type: "boolean";
            };
            "pre-commit": {
                required: false;
                type: "boolean";
            };
            "post-commit": {
                required: false;
                type: "boolean";
            };
        }>]>;
    };
    parallelPoolSize: {
        required: false;
        type: "number";
    };
    hooks: {
        required: false;
        type: import("dilswer").RecordOf<{
            "pre-push": {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                    mustRunAlone: {
                        type: "boolean";
                        required: false;
                    };
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                    mustRunAlone: {
                        type: "boolean";
                        required: false;
                    };
                }>]>]>;
            };
            "pre-commit": {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                    mustRunAlone: {
                        type: "boolean";
                        required: false;
                    };
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                    mustRunAlone: {
                        type: "boolean";
                        required: false;
                    };
                }>]>]>;
            };
            "post-commit": {
                required: false;
                type: import("dilswer").OneOf<["string", import("dilswer").ArrayOf<[import("dilswer").RecordOf<{
                    name: "string";
                    script: "string";
                    mustRunAlone: {
                        type: "boolean";
                        required: false;
                    };
                }>, import("dilswer").RecordOf<{
                    name: "string";
                    taskFile: "string";
                    mustRunAlone: {
                        type: "boolean";
                        required: false;
                    };
                }>]>]>;
            };
        }>;
    };
}>;
export declare type GitHookTasksConfig = GetDataType<typeof ConfigTypeDef>;
export declare const validateConfig: (data: unknown) => {
    parallel?: boolean | {
        "pre-push"?: boolean | undefined;
        "pre-commit"?: boolean | undefined;
        "post-commit"?: boolean | undefined;
    } | undefined;
    parallelPoolSize?: number | undefined;
    hooks?: {
        "pre-push"?: string | ({
            mustRunAlone?: boolean | undefined;
            name: string;
            script: string;
        } | {
            mustRunAlone?: boolean | undefined;
            name: string;
            taskFile: string;
        })[] | undefined;
        "pre-commit"?: string | ({
            mustRunAlone?: boolean | undefined;
            name: string;
            script: string;
        } | {
            mustRunAlone?: boolean | undefined;
            name: string;
            taskFile: string;
        })[] | undefined;
        "post-commit"?: string | ({
            mustRunAlone?: boolean | undefined;
            name: string;
            script: string;
        } | {
            mustRunAlone?: boolean | undefined;
            name: string;
            taskFile: string;
        })[] | undefined;
    } | undefined;
    packageManager: "yarn" | "npm";
};
export {};
