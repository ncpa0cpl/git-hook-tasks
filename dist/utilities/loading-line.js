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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingLine = void 0;
var chalk_1 = __importDefault(require("chalk"));
var strip_ansi_1 = __importDefault(require("strip-ansi"));
var output_manager_1 = require("./output/output-manager");
var SUCCESS_ICON = "[".concat(chalk_1.default.green("✓"), "]");
var FAILURE_ICON = "[".concat(chalk_1.default.red("✕"), "]");
var TIMEFRAMES = (_a = {
        ".  ": ".. ",
        ".. ": "...",
        "...": ".  "
    },
    _a[SUCCESS_ICON] = SUCCESS_ICON,
    _a[FAILURE_ICON] = FAILURE_ICON,
    _a);
var loadingLine = function (label, progress) {
    var line = output_manager_1.OutputManager.dynamicLine([
        ".  ",
        label,
        "(".concat(chalk_1.default.blue(progress), ")"),
    ]);
    var loadingInterval = setInterval(function () {
        line.update(function (_a) {
            var _b = __read(_a, 3), lineLoader = _b[0], lineLabel = _b[1], progress = _b[2];
            return [
                TIMEFRAMES[lineLoader],
                lineLabel,
                progress,
            ];
        });
    }, 700);
    var finishSuccess = function () {
        clearInterval(loadingInterval);
        line.update(function (_a) {
            var _b = __read(_a, 2), lineLabel = _b[1];
            return [SUCCESS_ICON, lineLabel];
        });
        line.close();
    };
    var finishFailure = function () {
        clearInterval(loadingInterval);
        line.update(function (_a) {
            var _b = __read(_a, 3), lineLabel = _b[1], progress = _b[2];
            return [
                FAILURE_ICON,
                lineLabel,
                progress ? "(".concat(chalk_1.default.red((0, strip_ansi_1.default)(progress).slice(1, -1)), ")") : undefined,
            ];
        });
        line.close();
    };
    var updateProgress = function (progress) {
        line.update(function (_a) {
            var _b = __read(_a, 2), lineLoader = _b[0], lineLabel = _b[1];
            return [
                lineLoader,
                lineLabel,
                "(".concat(chalk_1.default.blue(progress), ")"),
            ];
        });
    };
    return {
        finishSuccess: finishSuccess,
        finishFailure: finishFailure,
        updateProgress: updateProgress,
    };
};
exports.loadingLine = loadingLine;
