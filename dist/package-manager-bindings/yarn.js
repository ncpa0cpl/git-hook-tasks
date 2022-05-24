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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yarn = void 0;
const exec_1 = require("../utilities/exec");
const parse_args_1 = require("./parse-args");
exports.Yarn = (_a = class Yarn {
        static execute(command) {
            return __awaiter(this, void 0, void 0, function* () {
                return (0, exec_1.exec)(command, { cwd: Yarn.cwd });
            });
        }
        static setCwd(cwd) {
            Yarn.cwd = cwd;
        }
        static install(pkg) {
            const args = [];
            args.push(pkg);
            return Yarn.run("add", ...args);
        }
        static installDev(pkg) {
            const args = ["-D"];
            args.push(pkg);
            return Yarn.run("add", ...args);
        }
        static run(script, ...args) {
            return __awaiter(this, void 0, void 0, function* () {
                return Yarn.execute(yield Yarn.generateCommand(script, ...args));
            });
        }
        static generateCommand(script, ...args) {
            return __awaiter(this, void 0, void 0, function* () {
                return (0, parse_args_1.parseArgs)(["yarn", script, ...args]);
            });
        }
    },
    _a.cwd = process.cwd(),
    _a);
