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
exports.findProjectRoot = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const isWindows = os_1.default.platform() === "win32";
const findProjectRoot = () => __awaiter(void 0, void 0, void 0, function* () {
    let location = path_1.default.resolve(__dirname, "../../..");
    while (true) {
        if ((isWindows && location.length < 4) || location.length < 2) {
            throw new Error("Project root directory not found!");
        }
        const files = yield promises_1.default.readdir(location);
        if (files.some((f) => f === "package.json")) {
            return location;
        }
        location = path_1.default.resolve(location, "..");
    }
});
exports.findProjectRoot = findProjectRoot;
