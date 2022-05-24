/// <reference types="node" />
import child_process from "child_process";
export declare const exec: (command: string, options?: child_process.ExecOptions | undefined) => Promise<void>;
