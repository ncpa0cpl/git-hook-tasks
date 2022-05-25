"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeHooks = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const loading_line_1 = require("./loading-line");
const operation_error_1 = require("./operation-error");
const run_script_task_1 = require("./run-script-task");
const executeHooks = (pm, cwd, config, hookLabel) => __awaiter(void 0, void 0, void 0, function* () {
    if (config.hooks) {
        const hook = config.hooks[hookLabel];
        if (hook) {
            if (typeof hook === "string") {
                const files = yield promises_1.default.readdir(hook);
                for (const scriptFile of files) {
                    const line = (0, loading_line_1.loadingLine)(path_1.default.basename(scriptFile), "starting");
                    const err = yield (0, run_script_task_1.runScriptTask)(pm, cwd, path_1.default.resolve(cwd, hook, scriptFile), line.updateProgress);
                    if (!err) {
                        line.finishSuccess();
                    }
                    else {
                        line.finishFailure();
                        throw new operation_error_1.OperationError(err.message);
                    }
                }
            }
            else {
                for (const task of hook) {
                    if ("script" in task) {
                        const line = (0, loading_line_1.loadingLine)(task.name, "running script");
                        try {
                            // @ts-expect-error
                            yield pm.run(...task.script.split(" "));
                            line.finishSuccess();
                        }
                        catch (e) {
                            line.finishFailure();
                            throw new operation_error_1.OperationError(e.message);
                        }
                    }
                    else {
                        const line = (0, loading_line_1.loadingLine)(task.name, "starting");
                        const err = yield (0, run_script_task_1.runScriptTask)(pm, cwd, task.taskFile, line.updateProgress);
                        if (!err) {
                            line.finishSuccess();
                        }
                        else {
                            line.finishFailure();
                            throw new operation_error_1.OperationError(err.message);
                        }
                    }
                }
            }
        }
    }
});
exports.executeHooks = executeHooks;
