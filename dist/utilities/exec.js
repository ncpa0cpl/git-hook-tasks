"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exec = void 0;
var child_process_1 = __importDefault(require("child_process"));
var exec = function (command, options) {
    return new Promise(function (resolve, reject) {
        child_process_1.default.exec(command, options, function (err, stdout, stderr) {
            if (err)
                return reject(new Error(err.message + "\n" + stdout.toString() + "\n" + stderr.toString(), 
                // @ts-ignore
                {
                    cause: err,
                }));
            return resolve();
        });
    });
};
exports.exec = exec;
