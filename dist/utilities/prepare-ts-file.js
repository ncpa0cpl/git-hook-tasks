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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTsFile = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const node_os_walk_1 = require("node-os-walk");
const path_1 = __importDefault(require("path"));
const prepareTsFile = (pm, cwd, location) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    const p = path_1.default.parse(location);
    const cacheDir = path_1.default.resolve(cwd, "node_modules/.cache/git-hook-tasks", p.name);
    yield promises_1.default.mkdir(cacheDir, { recursive: true });
    yield pm.run("tsc", location, "-m", "commonjs", "--noImplicitUseStrict", "--esModuleInterop", "--skipLibCheck", "--allowJs", "--incremental", "--tsBuildInfoFile", path_1.default.join(cacheDir, "tsbuildinfo"), "--outDir", cacheDir);
    try {
        for (var _b = __asyncValues((0, node_os_walk_1.walk)(cacheDir)), _c; _c = yield _b.next(), !_c.done;) {
            const [root, _, files] = _c.value;
            for (const file of files) {
                if (path_1.default.extname(file.name) === ".js") {
                    const filepath = path_1.default.join(root, file.name);
                    const originalDirPath = path_1.default.dirname(filepath).replace(cacheDir, p.dir);
                    let fileContent = yield promises_1.default.readFile(filepath, {
                        encoding: "utf-8",
                    });
                    if (fileContent.startsWith("__dirname =")) {
                        fileContent = fileContent.replace(/^__dirname\s=\s.+?;/, `__dirname = ${JSON.stringify({
                            path: originalDirPath,
                        })}.path;`);
                    }
                    else {
                        fileContent =
                            `__dirname = ${JSON.stringify({
                                path: originalDirPath,
                            })}.path;\n` + fileContent;
                    }
                    yield promises_1.default.writeFile(filepath, fileContent, { encoding: "utf-8" });
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return path_1.default.join(cacheDir, p.name + ".js");
});
exports.prepareTsFile = prepareTsFile;
