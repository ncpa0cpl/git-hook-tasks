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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Npm = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const exec_1 = require("../utilities/exec");
const parse_args_1 = require("./parse-args");
exports.Npm = (_a = class Npm {
        static execute(command) {
            return (0, exec_1.exec)(command, { cwd: Npm.cwd });
        }
        static setCwd(cwd) {
            Npm.cwd = cwd;
        }
        static install(pkg) {
            const args = ["npm", "install"];
            args.push(pkg);
            return Npm.execute((0, parse_args_1.parseArgs)(args));
        }
        static installDev(pkg) {
            const args = ["npm", "install", "-D"];
            args.push(pkg);
            return Npm.execute((0, parse_args_1.parseArgs)(args));
        }
        static run(script, ...args) {
            return __awaiter(this, void 0, void 0, function* () {
                return Npm.execute(yield Npm.generateCommand(script, ...args));
            });
        }
        static generateCommand(script, ...args) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                const packageFile = path_1.default.resolve(Npm.cwd, "package.json");
                const scripts = [];
                try {
                    const fileData = yield promises_1.default.readFile(packageFile, { encoding: "utf-8" });
                    const settings = JSON.parse(fileData);
                    scripts.push(...Object.keys((_a = settings["scripts"]) !== null && _a !== void 0 ? _a : {}));
                }
                catch (e) {
                    //
                }
                if (scripts.includes(script)) {
                    const a = ["npm", "run", script];
                    if (args.length > 0) {
                        a.push("--");
                        a.push(...args);
                    }
                    return (0, parse_args_1.parseArgs)(a);
                }
                return (0, parse_args_1.parseArgs)(["npx", script, ...args]);
            });
        }
    },
    _a.cwd = process.cwd(),
    _a);
