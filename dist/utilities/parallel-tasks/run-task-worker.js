"use strict";
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
exports.runTaskWorker = void 0;
var node_worker_threads_1 = require("node:worker_threads");
var path_1 = __importDefault(require("path"));
var loading_line_1 = require("../loading-line");
var operation_error_1 = require("../operation-error");
var output_manager_1 = require("../output/output-manager");
var worker_events_1 = require("./worker-events");
var runTaskWorker = function (pm, cwd, scriptPath, name) {
    return new Promise(function (resolve, reject) {
        var w = new node_worker_threads_1.Worker(path_1.default.resolve(__dirname, "./task.worker.js"), {
            workerData: {
                cwd: cwd,
                scriptPath: scriptPath,
                packageManager: pm.label,
            },
        });
        var line = (0, loading_line_1.loadingLine)(name, "starting");
        var close = function (success) {
            w.removeAllListeners();
            w.terminate();
            if (success) {
                line.finishSuccess();
            }
            else {
                line.finishFailure();
            }
        };
        w.addListener.apply(w, __spreadArray([], __read((0, worker_events_1.createListener)(worker_events_1.WorkerEvent.NEW_LINE, function (_a) {
            var content = _a.content, separator = _a.separator;
            output_manager_1.OutputManager.staticLine(content, separator);
        })), false));
        w.addListener.apply(w, __spreadArray([], __read((0, worker_events_1.createListener)(worker_events_1.WorkerEvent.PROGRESS, function (progress) {
            line.updateProgress(progress);
        })), false));
        w.addListener(worker_events_1.WorkerEvent.ERROR, function (err) {
            close(false);
            reject(err);
        });
        w.addListener.apply(w, __spreadArray([], __read((0, worker_events_1.createListener)(worker_events_1.WorkerEvent.FINISH_FAILURE, function (err) {
            close(false);
            reject(new operation_error_1.PostponedOperationError(err.message));
        })), false));
        w.addListener.apply(w, __spreadArray([], __read((0, worker_events_1.createListener)(worker_events_1.WorkerEvent.FINISH_SUCCESS, function () {
            close(true);
            resolve();
        })), false));
    });
};
exports.runTaskWorker = runTaskWorker;
