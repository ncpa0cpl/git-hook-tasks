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
const runScriptTask = (cwd, scriptLocation, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const scriptAbsPath = path_1.default.resolve(cwd, scriptLocation);
        const script = require(scriptAbsPath);
        if ("name" in script && typeof script["name"] === "string") {
            name !== null && name !== void 0 ? name : (name = script);
        }
        if (!name) {
            name = path_1.default.basename(scriptAbsPath);
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
