import type { GetDataType } from "dilswer";
declare const WorkerParamsTypeDef: import("dilswer").RecordOf<{
    cwd: "string";
    scriptPath: "string";
    packageManager: import("dilswer").OneOf<[import("dilswer").Literal<"yarn">, import("dilswer").Literal<"npm">]>;
}>;
export declare type WorkerParams = GetDataType<typeof WorkerParamsTypeDef>;
export {};
