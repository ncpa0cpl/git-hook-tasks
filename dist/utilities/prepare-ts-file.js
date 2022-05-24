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
exports.prepareTsFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const prepareTsFile = (pm, cwd, location) => __awaiter(void 0, void 0, void 0, function* () {
    const p = path_1.default.parse(location);
    const cacheDir = path_1.default.resolve(cwd, "node_modules/.cache/git-hook-tasks", p.name);
    yield promises_1.default.mkdir(cacheDir, { recursive: true });
    yield pm.run("tsc", location, "-m", "commonjs", "--allowJs", "--esModuleInterop", "--skipLibCheck", "--outDir", cacheDir);
    return path_1.default.join(cacheDir, p.name + ".js");
});
exports.prepareTsFile = prepareTsFile;
