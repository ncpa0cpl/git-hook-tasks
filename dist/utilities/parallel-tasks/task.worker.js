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
Object.defineProperty(exports, "__esModule", { value: true });
var dilswer_1 = require("dilswer");
var node_worker_threads_1 = require("node:worker_threads");
var get_package_manager_1 = require("../../package-manager-bindings/get-package-manager");
var run_script_task_1 = require("../run-script-task");
var worker_events_1 = require("./worker-events");
var WorkerParamsTypeDef = dilswer_1.DataType.RecordOf({
    cwd: dilswer_1.DataType.String,
    scriptPath: dilswer_1.DataType.String,
    packageManager: dilswer_1.DataType.OneOf(dilswer_1.DataType.Literal("yarn"), dilswer_1.DataType.Literal("npm")),
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var port, validate, cwd, scriptPath, pm, onProgress, outputManager, handleError, result, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    port = node_worker_threads_1.parentPort;
                    if (!port) return [3 /*break*/, 4];
                    validate = (0, dilswer_1.createValidator)(WorkerParamsTypeDef);
                    if (!validate(node_worker_threads_1.workerData)) {
                        port.emit(worker_events_1.WorkerEvent.ERROR, new Error("Incorrect worker data!"));
                        return [2 /*return*/];
                    }
                    cwd = node_worker_threads_1.workerData.cwd, scriptPath = node_worker_threads_1.workerData.scriptPath;
                    pm = (0, get_package_manager_1.getPackageManager)(node_worker_threads_1.workerData.packageManager);
                    onProgress = function (progress) {
                        port.postMessage((0, worker_events_1.createEvent)(worker_events_1.WorkerEvent.PROGRESS, progress));
                    };
                    outputManager = {
                        staticLine: function (content, separator) {
                            port.postMessage((0, worker_events_1.createEvent)(worker_events_1.WorkerEvent.NEW_LINE, { content: content, separator: separator }));
                        },
                    };
                    handleError = function (e) {
                        port.postMessage((0, worker_events_1.createEvent)(worker_events_1.WorkerEvent.FINISH_FAILURE, e));
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, run_script_task_1.runScriptTask)(pm, cwd, scriptPath, onProgress, outputManager)];
                case 2:
                    result = _a.sent();
                    if (result === null)
                        port.postMessage((0, worker_events_1.createEvent)(worker_events_1.WorkerEvent.FINISH_SUCCESS, null));
                    else
                        handleError(result);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    handleError(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
if (!node_worker_threads_1.isMainThread) {
    main();
}
