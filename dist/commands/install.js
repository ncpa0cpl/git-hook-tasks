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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstallCommand = void 0;
var package_manager_1 = require("../arguments/package-manager");
var create_config_file_1 = require("../config/create-config-file");
var get_package_manager_1 = require("../package-manager-bindings/get-package-manager");
var exec_1 = require("../utilities/exec");
var find_project_root_1 = require("../utilities/find-project-root");
var InstallCommand = function () {
    var selectedPm = new package_manager_1.PM();
    return {
        run: function () {
            return __awaiter(this, void 0, void 0, function () {
                var pm, cwd, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                return __generator(this, function (_o) {
                    switch (_o.label) {
                        case 0:
                            pm = (0, get_package_manager_1.getPackageManager)(selectedPm.value);
                            return [4 /*yield*/, (0, find_project_root_1.findProjectRoot)()];
                        case 1:
                            cwd = _o.sent();
                            pm.setCwd(cwd);
                            (0, create_config_file_1.createConfig)(cwd, selectedPm.value);
                            return [4 /*yield*/, pm.run("husky", "install")];
                        case 2:
                            _o.sent();
                            _b = (_a = Promise).all;
                            _d = (_c = pm).run;
                            _e = ["husky",
                                "add",
                                ".husky/pre-commit"];
                            return [4 /*yield*/, pm.generateCommand("git-hook-tasks", "pre-commit")];
                        case 3:
                            _f = [
                                _d.apply(_c, _e.concat([_o.sent()]))
                            ];
                            _h = (_g = pm).run;
                            _j = ["husky",
                                "add",
                                ".husky/pre-push"];
                            return [4 /*yield*/, pm.generateCommand("git-hook-tasks", "pre-push")];
                        case 4:
                            _f = _f.concat([
                                _h.apply(_g, _j.concat([_o.sent()]))
                            ]);
                            _l = (_k = pm).run;
                            _m = ["husky",
                                "add",
                                ".husky/post-commit"];
                            return [4 /*yield*/, pm.generateCommand("git-hook-tasks", "post-commit")];
                        case 5: return [4 /*yield*/, _b.apply(_a, [_f.concat([
                                    _l.apply(_k, _m.concat([_o.sent()]))
                                ])])];
                        case 6:
                            _o.sent();
                            return [4 /*yield*/, Promise.all([
                                    (0, exec_1.exec)("git add .husky/pre-commit", { cwd: cwd }),
                                    (0, exec_1.exec)("git add .husky/pre-push", { cwd: cwd }),
                                    (0, exec_1.exec)("git add .husky/post-commit", { cwd: cwd }),
                                ])];
                        case 7:
                            _o.sent();
                            return [2 /*return*/];
                    }
                });
            });
        },
    };
};
exports.InstallCommand = InstallCommand;
