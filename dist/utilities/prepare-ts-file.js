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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareTsFile = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var node_os_walk_1 = require("node-os-walk");
var path_1 = __importDefault(require("path"));
var prepareTsFile = function (pm, cwd, location) { return __awaiter(void 0, void 0, void 0, function () {
    var p, cacheDir, _a, _b, _c, root, _, files, files_1, files_1_1, file, filepath, originalDirPath, fileContent, e_1_1, e_2_1;
    var e_1, _d;
    var e_2, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                p = path_1.default.parse(location);
                cacheDir = path_1.default.resolve(cwd, "node_modules/.cache/git-hook-tasks", p.name);
                return [4 /*yield*/, promises_1.default.mkdir(cacheDir, { recursive: true })];
            case 1:
                _f.sent();
                return [4 /*yield*/, pm.run("tsc", location, "-m", "commonjs", "--noImplicitUseStrict", "--esModuleInterop", "--skipLibCheck", "--allowJs", "--incremental", "--tsBuildInfoFile", path_1.default.join(cacheDir, "tsbuildinfo"), "--outDir", cacheDir)];
            case 2:
                _f.sent();
                _f.label = 3;
            case 3:
                _f.trys.push([3, 16, 17, 22]);
                _a = __asyncValues((0, node_os_walk_1.walk)(cacheDir));
                _f.label = 4;
            case 4: return [4 /*yield*/, _a.next()];
            case 5:
                if (!(_b = _f.sent(), !_b.done)) return [3 /*break*/, 15];
                _c = __read(_b.value, 3), root = _c[0], _ = _c[1], files = _c[2];
                _f.label = 6;
            case 6:
                _f.trys.push([6, 12, 13, 14]);
                files_1 = (e_1 = void 0, __values(files)), files_1_1 = files_1.next();
                _f.label = 7;
            case 7:
                if (!!files_1_1.done) return [3 /*break*/, 11];
                file = files_1_1.value;
                if (!(path_1.default.extname(file.name) === ".js")) return [3 /*break*/, 10];
                filepath = path_1.default.join(root, file.name);
                originalDirPath = path_1.default.dirname(filepath).replace(cacheDir, p.dir);
                return [4 /*yield*/, promises_1.default.readFile(filepath, {
                        encoding: "utf-8",
                    })];
            case 8:
                fileContent = _f.sent();
                if (fileContent.startsWith("__dirname =")) {
                    fileContent = fileContent.replace(/^__dirname\s=\s.+?;/, "__dirname = ".concat(JSON.stringify({
                        path: originalDirPath,
                    }), ".path;"));
                }
                else {
                    fileContent =
                        "__dirname = ".concat(JSON.stringify({
                            path: originalDirPath,
                        }), ".path;\n") + fileContent;
                }
                return [4 /*yield*/, promises_1.default.writeFile(filepath, fileContent, { encoding: "utf-8" })];
            case 9:
                _f.sent();
                _f.label = 10;
            case 10:
                files_1_1 = files_1.next();
                return [3 /*break*/, 7];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (files_1_1 && !files_1_1.done && (_d = files_1.return)) _d.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 14: return [3 /*break*/, 4];
            case 15: return [3 /*break*/, 22];
            case 16:
                e_2_1 = _f.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 22];
            case 17:
                _f.trys.push([17, , 20, 21]);
                if (!(_b && !_b.done && (_e = _a.return))) return [3 /*break*/, 19];
                return [4 /*yield*/, _e.call(_a)];
            case 18:
                _f.sent();
                _f.label = 19;
            case 19: return [3 /*break*/, 21];
            case 20:
                if (e_2) throw e_2.error;
                return [7 /*endfinally*/];
            case 21: return [7 /*endfinally*/];
            case 22: return [2 /*return*/, path_1.default.join(cacheDir, p.name + ".js")];
        }
    });
}); };
exports.prepareTsFile = prepareTsFile;
