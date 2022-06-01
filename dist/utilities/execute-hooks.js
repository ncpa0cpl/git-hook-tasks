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
exports.executeHooks = void 0;
var chalk_1 = __importDefault(require("chalk"));
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
var loading_line_1 = require("./loading-line");
var on_all_task_success_1 = require("./on-all-task-success");
var operation_error_1 = require("./operation-error");
var output_manager_1 = require("./output/output-manager");
var run_script_task_1 = require("./run-script-task");
var onTaskStart = function () {
    return output_manager_1.OutputManager.staticLine([chalk_1.default.green("\nRunning Git Hook Tasks\n")]);
};
var executeHooks = function (pm, cwd, config, hookLabel) { return __awaiter(void 0, void 0, void 0, function () {
    var hook, files, files_1, files_1_1, scriptFile, line, err, e_1_1, hook_1, hook_1_1, task, line, e_2, line, err, e_3_1;
    var e_1, _a, e_3, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!config.hooks) return [3 /*break*/, 24];
                hook = config.hooks[hookLabel];
                if (!hook) return [3 /*break*/, 24];
                if (!(typeof hook === "string")) return [3 /*break*/, 10];
                onTaskStart();
                return [4 /*yield*/, promises_1.default.readdir(hook)];
            case 1:
                files = _c.sent();
                _c.label = 2;
            case 2:
                _c.trys.push([2, 7, 8, 9]);
                files_1 = __values(files), files_1_1 = files_1.next();
                _c.label = 3;
            case 3:
                if (!!files_1_1.done) return [3 /*break*/, 6];
                scriptFile = files_1_1.value;
                line = (0, loading_line_1.loadingLine)(path_1.default.basename(scriptFile), "starting");
                return [4 /*yield*/, (0, run_script_task_1.runScriptTask)(pm, cwd, path_1.default.resolve(cwd, hook, scriptFile), line.updateProgress)];
            case 4:
                err = _c.sent();
                if (!err) {
                    line.finishSuccess();
                }
                else {
                    line.finishFailure();
                    throw new operation_error_1.OperationError(err.message);
                }
                _c.label = 5;
            case 5:
                files_1_1 = files_1.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_1_1 = _c.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 9:
                (0, on_all_task_success_1.onAllTasksSuccess)();
                return [3 /*break*/, 24];
            case 10:
                if (hook.length > 0) {
                    onTaskStart();
                }
                _c.label = 11;
            case 11:
                _c.trys.push([11, 21, 22, 23]);
                hook_1 = __values(hook), hook_1_1 = hook_1.next();
                _c.label = 12;
            case 12:
                if (!!hook_1_1.done) return [3 /*break*/, 20];
                task = hook_1_1.value;
                if (!("script" in task)) return [3 /*break*/, 17];
                line = (0, loading_line_1.loadingLine)(task.name, "running script");
                _c.label = 13;
            case 13:
                _c.trys.push([13, 15, , 16]);
                // @ts-expect-error
                return [4 /*yield*/, pm.run.apply(pm, __spreadArray([], __read(task.script.split(" ")), false))];
            case 14:
                // @ts-expect-error
                _c.sent();
                line.finishSuccess();
                return [3 /*break*/, 16];
            case 15:
                e_2 = _c.sent();
                line.finishFailure();
                throw new operation_error_1.OperationError(e_2.message);
            case 16: return [3 /*break*/, 19];
            case 17:
                line = (0, loading_line_1.loadingLine)(task.name, "starting");
                return [4 /*yield*/, (0, run_script_task_1.runScriptTask)(pm, cwd, task.taskFile, line.updateProgress)];
            case 18:
                err = _c.sent();
                if (!err) {
                    line.finishSuccess();
                }
                else {
                    line.finishFailure();
                    throw new operation_error_1.OperationError(err.message);
                }
                _c.label = 19;
            case 19:
                hook_1_1 = hook_1.next();
                return [3 /*break*/, 12];
            case 20: return [3 /*break*/, 23];
            case 21:
                e_3_1 = _c.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 23];
            case 22:
                try {
                    if (hook_1_1 && !hook_1_1.done && (_b = hook_1.return)) _b.call(hook_1);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 23:
                if (hook.length > 0) {
                    (0, on_all_task_success_1.onAllTasksSuccess)();
                }
                _c.label = 24;
            case 24: return [2 /*return*/];
        }
    });
}); };
exports.executeHooks = executeHooks;
