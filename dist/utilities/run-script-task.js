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
exports.runScriptTask = void 0;
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var console_interceptor_1 = require("./console-interceptor");
var output_manager_1 = require("./output/output-manager");
var prepare_ts_file_1 = require("./prepare-ts-file");
var runScriptTask = function (pm, cwd, scriptLocation, onProgress, outputManager) {
    if (onProgress === void 0) { onProgress = function (msg) { }; }
    if (outputManager === void 0) { outputManager = output_manager_1.OutputManager; }
    return __awaiter(void 0, void 0, void 0, function () {
        var scriptExt, isTsFile, scriptAbsPath, _a, scriptLogs, script, e_1, _loop_1, _b, _c, _d, level, log;
        var e_2, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    scriptExt = path_1.default.extname(scriptLocation);
                    onProgress("identifying file type");
                    if (![".js", ".jsx", ".ts", ".tsx"].includes(scriptExt)) {
                        throw new Error("Unsupported script file type: ".concat(scriptLocation, "\nScript must be a JavaScript file."));
                    }
                    isTsFile = [".ts", ".tsx"].includes(scriptExt);
                    if (isTsFile) {
                        onProgress("transpiling to js");
                    }
                    if (!isTsFile) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, prepare_ts_file_1.prepareTsFile)(pm, cwd, path_1.default.resolve(cwd, scriptLocation))];
                case 1:
                    _a = _f.sent();
                    return [3 /*break*/, 3];
                case 2:
                    _a = path_1.default.resolve(cwd, scriptLocation);
                    _f.label = 3;
                case 3:
                    scriptAbsPath = _a;
                    scriptLogs = console_interceptor_1.ConsoleInterceptor.intercept();
                    _f.label = 4;
                case 4:
                    _f.trys.push([4, 7, 8, 9]);
                    onProgress("loading script");
                    script = require(scriptAbsPath);
                    onProgress("executing");
                    if (!("default" in script && typeof script["default"] === "function")) return [3 /*break*/, 6];
                    return [4 /*yield*/, script["default"](onProgress)];
                case 5:
                    _f.sent();
                    _f.label = 6;
                case 6: return [2 /*return*/, null];
                case 7:
                    e_1 = _f.sent();
                    _loop_1 = function (level, log) {
                        var color = level === "error"
                            ? chalk_1.default.redBright
                            : level === "warn"
                                ? chalk_1.default.yellow
                                : function (a) { return a; };
                        switch (level) {
                            case "clear":
                                break;
                            default:
                                outputManager.staticLine(__spreadArray([
                                    path_1.default.parse(scriptLocation).name + ":"
                                ], __read(log.map(function (elem) { return color(elem.toString()); })), false), " ");
                        }
                    };
                    try {
                        for (_b = __values(scriptLogs.read()), _c = _b.next(); !_c.done; _c = _b.next()) {
                            _d = __read(_c.value, 2), level = _d[0], log = _d[1];
                            _loop_1(level, log);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [2 /*return*/, e_1];
                case 8:
                    console_interceptor_1.ConsoleInterceptor.restore();
                    return [7 /*endfinally*/];
                case 9: return [2 /*return*/];
            }
        });
    });
};
exports.runScriptTask = runScriptTask;
