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
exports.runScriptTask = void 0;
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const console_interceptor_1 = require("./console-interceptor");
const output_manager_1 = require("./output/output-manager");
const prepare_ts_file_1 = require("./prepare-ts-file");
const runScriptTask = (pm, cwd, scriptLocation, onProgress = (msg) => { }) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptExt = path_1.default.extname(scriptLocation);
    onProgress("identifying file type");
    if (![".js", ".jsx", ".ts", ".tsx"].includes(scriptExt)) {
        throw new Error(`Unsupported script file type: ${scriptLocation}\nScript must be a JavaScript file.`);
    }
    const isTsFile = [".ts", ".tsx"].includes(scriptExt);
    if (isTsFile) {
        onProgress("transpiling to js");
    }
    const scriptAbsPath = isTsFile
        ? yield (0, prepare_ts_file_1.prepareTsFile)(pm, cwd, path_1.default.resolve(cwd, scriptLocation))
        : path_1.default.resolve(cwd, scriptLocation);
    const scriptLogs = console_interceptor_1.ConsoleInterceptor.intercept();
    try {
        onProgress("loading script");
        const script = require(scriptAbsPath);
        onProgress("executing");
        if ("default" in script && typeof script["default"] === "function") {
            yield script["default"](onProgress);
        }
        return null;
    }
    catch (e) {
        for (const [level, log] of scriptLogs.read()) {
            const color = level === "error"
                ? chalk_1.default.redBright
                : level === "warn"
                    ? chalk_1.default.yellow
                    : (a) => a;
            switch (level) {
                case "clear":
                    break;
                default:
                    output_manager_1.OutputManager.newLine([
                        path_1.default.parse(scriptLocation).name + ":",
                        ...log.map((elem) => color(elem.toString())),
                    ], " ");
            }
        }
        return e;
    }
    finally {
        console_interceptor_1.ConsoleInterceptor.restore();
    }
});
exports.runScriptTask = runScriptTask;
