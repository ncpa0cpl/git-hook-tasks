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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreCommitCommand = void 0;
const read_config_1 = require("../config/read-config");
const get_package_manager_1 = require("../package-manager-bindings/get-package-manager");
const exit_on_throw_1 = require("../utilities/exit-on-throw");
const find_project_root_1 = require("../utilities/find-project-root");
const on_all_task_success_1 = require("../utilities/on-all-task-success");
const on_task_success_1 = require("../utilities/on-task-success");
const operation_error_1 = require("../utilities/operation-error");
const run_script_task_1 = require("../utilities/run-script-task");
const PreCommitCommand = () => {
    return {
        run() {
            return __awaiter(this, void 0, void 0, function* () {
                yield (0, exit_on_throw_1.exitOnThrow)(() => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const cwd = yield (0, find_project_root_1.findProjectRoot)();
                    const config = yield (0, read_config_1.readConfig)(cwd);
                    const pm = (0, get_package_manager_1.getPackageManager)(config.packageManager);
                    pm.setCwd(cwd);
                    if ((_a = config.hooks) === null || _a === void 0 ? void 0 : _a.precommit) {
                        if (typeof config.hooks.precommit === "string") {
                            const [name, err] = yield (0, run_script_task_1.runScriptTask)(cwd, config.hooks.precommit);
                            if (!err) {
                                (0, on_task_success_1.onTaskSuccess)(name);
                            }
                            else {
                                throw new operation_error_1.OperationError(name, err.message);
                            }
                        }
                        else {
                            for (const task of config.hooks.precommit) {
                                if ("script" in task) {
                                    try {
                                        yield pm.run(task.script);
                                        (0, on_task_success_1.onTaskSuccess)(task.name);
                                    }
                                    catch (e) {
                                        throw new operation_error_1.OperationError(task.name, e.message);
                                    }
                                }
                                else {
                                    const [name, err] = yield (0, run_script_task_1.runScriptTask)(cwd, task.taskFile);
                                    if (!err) {
                                        (0, on_task_success_1.onTaskSuccess)(name);
                                    }
                                    else {
                                        throw new operation_error_1.OperationError(name, err.message);
                                    }
                                }
                            }
                        }
                    }
                    (0, on_all_task_success_1.onAllTasksSuccess)();
                }));
            });
        },
    };
};
exports.PreCommitCommand = PreCommitCommand;
