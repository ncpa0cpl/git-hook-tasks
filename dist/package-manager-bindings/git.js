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
exports.Git = void 0;
const child_process_1 = __importDefault(require("child_process"));
const parse_args_1 = require("./parse-args");
class Git {
    static execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            yield new Promise((resolve, reject) => {
                child_process_1.default.exec(command, { cwd: Git.cwd }, (err) => {
                    if (err)
                        return reject(err);
                    return resolve();
                });
            });
        });
    }
    static setCwd(cwd) {
        Git.cwd = cwd;
    }
    static init(dirPath) {
        Git.setCwd(dirPath);
        return Git.execute((0, parse_args_1.parseArgs)(["git", "init"]));
    }
    static add(...files) {
        if (files.length === 0)
            files.push(".");
        Git.execute((0, parse_args_1.parseArgs)(["git", "add", ...files]));
    }
}
exports.Git = Git;
Git.cwd = process.cwd();
