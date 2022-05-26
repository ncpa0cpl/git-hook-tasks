"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingLine = void 0;
const chalk_1 = __importDefault(require("chalk"));
const strip_ansi_1 = __importDefault(require("strip-ansi"));
const output_manager_1 = require("./output/output-manager");
const SUCCESS_ICON = `[${chalk_1.default.green("✓")}]`;
const FAILURE_ICON = `[${chalk_1.default.red("✕")}]`;
const TIMEFRAMES = {
    ".  ": ".. ",
    ".. ": "...",
    "...": ".  ",
    [SUCCESS_ICON]: SUCCESS_ICON,
    [FAILURE_ICON]: FAILURE_ICON,
};
const loadingLine = (label, progress) => {
    const line = output_manager_1.OutputManager.newLine([
        ".  ",
        label,
        `(${chalk_1.default.blue(progress)})`,
    ]);
    const loadingInterval = setInterval(() => {
        line.update(([lineLoader, lineLabel, progress]) => [
            TIMEFRAMES[lineLoader],
            lineLabel,
            progress,
        ]);
    }, 700);
    const finishSuccess = () => {
        clearInterval(loadingInterval);
        line.update(([, lineLabel]) => [SUCCESS_ICON, lineLabel]);
        line.close();
    };
    const finishFailure = () => {
        clearInterval(loadingInterval);
        line.update(([, lineLabel, progress]) => [
            FAILURE_ICON,
            lineLabel,
            progress ? `(${chalk_1.default.red((0, strip_ansi_1.default)(progress).slice(1, -1))})` : undefined,
        ]);
        line.close();
    };
    const updateProgress = (progress) => {
        line.update(([lineLoader, lineLabel]) => [
            lineLoader,
            lineLabel,
            `(${chalk_1.default.blue(progress)})`,
        ]);
    };
    return {
        finishSuccess,
        finishFailure,
        updateProgress,
    };
};
exports.loadingLine = loadingLine;
