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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeHooksInParallel = void 0;
var async_await_queue_1 = __importDefault(require("async-await-queue"));
var chalk_1 = __importDefault(require("chalk"));
var promises_1 = __importDefault(require("fs/promises"));
var os_1 = __importDefault(require("os"));
var path_1 = __importDefault(require("path"));
var loading_line_1 = require("../loading-line");
var on_all_task_success_1 = require("../on-all-task-success");
var operation_error_1 = require("../operation-error");
var output_manager_1 = require("../output/output-manager");
var run_script_task_1 = require("../run-script-task");
var run_task_worker_1 = require("./run-task-worker");
var onTaskStart = function () {
    return output_manager_1.OutputManager.staticLine([chalk_1.default.green("\nRunning Git Hook Tasks\n")]);
};
var executeHooksInParallel = function (pm, cwd, config, hookLabel) { return __awaiter(void 0, void 0, void 0, function () {
    var hook_2, queue, errors_1, processErrors, files, _loop_1, files_1, files_1_1, scriptFile, aloneScripts, _loop_2, hook_1, hook_1_1, task, aloneScripts_1, aloneScripts_1_1, aloneScript, e_1_1;
    var e_2, _a, e_3, _b, e_1, _c;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!config.hooks) return [3 /*break*/, 13];
                hook_2 = config.hooks[hookLabel];
                if (!hook_2) return [3 /*break*/, 13];
                queue = new async_await_queue_1.default((_d = config.parallelPoolSize) !== null && _d !== void 0 ? _d : Math.max(1, os_1.default.cpus().length - 1));
                errors_1 = [];
                processErrors = function () {
                    var e_4, _a;
                    try {
                        for (var errors_2 = __values(errors_1), errors_2_1 = errors_2.next(); !errors_2_1.done; errors_2_1 = errors_2.next()) {
                            var err = errors_2_1.value;
                            if (operation_error_1.PostponedOperationError.isPostponedOperationError(err)) {
                                operation_error_1.PostponedOperationError.print(err);
                            }
                            else {
                                new operation_error_1.OperationError("".concat(err.message));
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (errors_2_1 && !errors_2_1.done && (_a = errors_2.return)) _a.call(errors_2);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    output_manager_1.OutputManager.staticLine([
                        chalk_1.default.redBright("Some Git hook tasks have failed. Exiting."),
                    ]);
                    throw new operation_error_1.OperationError("", true);
                };
                if (!(typeof hook_2 === "string")) return [3 /*break*/, 3];
                onTaskStart();
                return [4 /*yield*/, promises_1.default.readdir(hook_2)];
            case 1:
                files = _e.sent();
                _loop_1 = function (scriptFile) {
                    var name_1 = path_1.default.basename(scriptFile);
                    queue.run(function () {
                        return (0, run_task_worker_1.runTaskWorker)(pm, cwd, path_1.default.resolve(cwd, hook_2, scriptFile), name_1).catch(function (e) {
                            errors_1.push(e);
                        });
                    });
                };
                try {
                    for (files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
                        scriptFile = files_1_1.value;
                        _loop_1(scriptFile);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return [4 /*yield*/, queue.flush()];
            case 2:
                _e.sent();
                if (errors_1.length === 0) {
                    (0, on_all_task_success_1.onAllTasksSuccess)();
                }
                else {
                    return [2 /*return*/, processErrors()];
                }
                return [3 /*break*/, 13];
            case 3:
                aloneScripts = [];
                if (hook_2.length > 0) {
                    onTaskStart();
                }
                _loop_2 = function (task) {
                    if ("script" in task) {
                        if (task.mustRunAlone) {
                            aloneScripts.push(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var line, e_5;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            line = (0, loading_line_1.loadingLine)(task.name, "running script");
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, , 4]);
                                            // @ts-expect-error
                                            return [4 /*yield*/, pm.run.apply(pm, __spreadArray([], __read(task.script.split(" ")), false))];
                                        case 2:
                                            // @ts-expect-error
                                            _a.sent();
                                            line.finishSuccess();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            e_5 = _a.sent();
                                            line.finishFailure();
                                            throw new operation_error_1.OperationError(e_5.message);
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return "continue";
                        }
                        queue.run(function () {
                            var line = (0, loading_line_1.loadingLine)(task.name, "running script");
                            return (pm
                                // @ts-expect-error
                                .run.apply(pm
                            // @ts-expect-error
                            , __spreadArray([], __read(task.script.split(" ")), false)).then(function () {
                                line.finishSuccess();
                            })
                                .catch(function (e) {
                                line.finishFailure();
                                errors_1.push(e);
                            }));
                        });
                    }
                    else {
                        if (task.mustRunAlone) {
                            aloneScripts.push(function () { return __awaiter(void 0, void 0, void 0, function () {
                                var line, err;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            line = (0, loading_line_1.loadingLine)(task.name, "starting");
                                            return [4 /*yield*/, (0, run_script_task_1.runScriptTask)(pm, cwd, task.taskFile, line.updateProgress)];
                                        case 1:
                                            err = _a.sent();
                                            if (!err) {
                                                line.finishSuccess();
                                            }
                                            else {
                                                line.finishFailure();
                                                throw new operation_error_1.OperationError(err.message);
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return "continue";
                        }
                        queue.run(function () {
                            return (0, run_task_worker_1.runTaskWorker)(pm, cwd, task.taskFile, task.name).catch(function (e) {
                                errors_1.push(e);
                            });
                        });
                    }
                };
                try {
                    for (hook_1 = __values(hook_2), hook_1_1 = hook_1.next(); !hook_1_1.done; hook_1_1 = hook_1.next()) {
                        task = hook_1_1.value;
                        _loop_2(task);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (hook_1_1 && !hook_1_1.done && (_b = hook_1.return)) _b.call(hook_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return [4 /*yield*/, queue.flush()];
            case 4:
                _e.sent();
                if (errors_1.length > 0) {
                    return [2 /*return*/, processErrors()];
                }
                _e.label = 5;
            case 5:
                _e.trys.push([5, 10, 11, 12]);
                aloneScripts_1 = __values(aloneScripts), aloneScripts_1_1 = aloneScripts_1.next();
                _e.label = 6;
            case 6:
                if (!!aloneScripts_1_1.done) return [3 /*break*/, 9];
                aloneScript = aloneScripts_1_1.value;
                return [4 /*yield*/, aloneScript()];
            case 7:
                _e.sent();
                _e.label = 8;
            case 8:
                aloneScripts_1_1 = aloneScripts_1.next();
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 12];
            case 10:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 12];
            case 11:
                try {
                    if (aloneScripts_1_1 && !aloneScripts_1_1.done && (_c = aloneScripts_1.return)) _c.call(aloneScripts_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 12:
                if (hook_2.length > 0) {
                    (0, on_all_task_success_1.onAllTasksSuccess)();
                }
                _e.label = 13;
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.executeHooksInParallel = executeHooksInParallel;
