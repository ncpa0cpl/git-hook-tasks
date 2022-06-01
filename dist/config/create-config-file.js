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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var path_1 = __importDefault(require("path"));
require("./json-schema.json");
var read_config_1 = require("./read-config");
var createConfig = function (cwd, pm) { return __awaiter(void 0, void 0, void 0, function () {
    var files, vscodeDir, vscodeSettingsFile, settings, vscodeFiles, f;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, promises_1.default.readdir(cwd)];
            case 1:
                files = _a.sent();
                if (!!files.includes(read_config_1.CONFIG_FILE_NAME)) return [3 /*break*/, 3];
                return [4 /*yield*/, promises_1.default.writeFile(path_1.default.resolve(cwd, read_config_1.CONFIG_FILE_NAME), 
                    /* json */ "{\n  \"packageManager\": \"".concat(pm, "\",\n  \"hooks\": {\n    \"pre-push\": [],\n    \"pre-commit\": [],\n    \"post-commit\": []\n  }\n}\n"))];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                vscodeDir = path_1.default.resolve(cwd, ".vscode");
                vscodeSettingsFile = path_1.default.resolve(vscodeDir, "settings.json");
                return [4 /*yield*/, promises_1.default.mkdir(vscodeDir, { recursive: true })];
            case 4:
                _a.sent();
                settings = {};
                return [4 /*yield*/, promises_1.default.readdir(vscodeDir)];
            case 5:
                vscodeFiles = _a.sent();
                if (!vscodeFiles.includes("settings.json")) return [3 /*break*/, 7];
                return [4 /*yield*/, promises_1.default.readFile(vscodeSettingsFile, { encoding: "utf-8" })];
            case 6:
                f = _a.sent();
                settings = JSON.parse(f);
                _a.label = 7;
            case 7:
                if (!settings["json.schemas"]) {
                    settings["json.schemas"] = [];
                }
                if (!!settings["json.schemas"].some(function (s) {
                    var isObject = typeof s === "object" && s !== null;
                    if (isObject) {
                        var fileMatch = s.fileMatch;
                        if (Array.isArray(fileMatch)) {
                            return fileMatch.includes(read_config_1.CONFIG_FILE_NAME);
                        }
                        return fileMatch === read_config_1.CONFIG_FILE_NAME;
                    }
                    return false;
                })) return [3 /*break*/, 9];
                settings["json.schemas"].push({
                    fileMatch: [read_config_1.CONFIG_FILE_NAME],
                    url: "./node_modules/git-hook-tasks/dist/config/json-schema.json",
                });
                return [4 /*yield*/, promises_1.default.writeFile(vscodeSettingsFile, JSON.stringify(settings, null, 2))];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createConfig = createConfig;
