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
const path_1 = __importDefault(require("path"));
const prepare_ts_file_1 = require("./prepare-ts-file");
const runScriptTask = (pm, cwd, scriptLocation, name) => __awaiter(void 0, void 0, void 0, function* () {
    const scriptExt = path_1.default.extname(scriptLocation);
    if (![".js", ".jsx", ".ts", ".tsx"].includes(scriptExt)) {
        throw new Error(`Unsupported script file type: ${scriptLocation}\nScript must be a JavaScript file.`);
    }
    const isTsFile = [".ts", ".tsx"].includes(scriptExt);
    const scriptAbsPath = isTsFile
        ? yield (0, prepare_ts_file_1.prepareTsFile)(pm, cwd, path_1.default.resolve(cwd, scriptLocation))
        : path_1.default.resolve(cwd, scriptLocation);
    try {
        const script = require(scriptAbsPath);
        if (!name) {
            if ("name" in script && typeof script["name"] === "string") {
                name = script["name"];
            }
            else {
                name = path_1.default.basename(scriptAbsPath);
            }
        }
        if ("default" in script && typeof script["default"] === "function") {
            yield script["default"]();
        }
        return [name, null];
    }
    catch (e) {
        return [name !== null && name !== void 0 ? name : path_1.default.basename(scriptLocation), e];
    }
});
exports.runScriptTask = runScriptTask;
