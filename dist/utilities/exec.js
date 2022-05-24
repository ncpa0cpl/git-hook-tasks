"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
const child_process_1 = __importDefault(require("child_process"));
const exec = (command, options) => {
    return new Promise((resolve, reject) => {
        child_process_1.default.exec(command, options, (err, stdout, stderr) => {
            if (err)
                return reject(new Error(err.message + "\n" + stdout.toString() + "\n" + stderr.toString(), 
                // @ts-expect-error
                {
                    cause: err,
                }));
            return resolve();
        });
    });
};
exports.exec = exec;
