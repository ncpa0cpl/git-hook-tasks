"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationError = void 0;
const chalk_1 = __importDefault(require("chalk"));
class OperationError extends Error {
    constructor(name, data) {
        super("Operation Error");
        this._isOperationError = true;
        console.error(`[${chalk_1.default.red("✕")}] ${name}\n`);
        console.error(data);
        console.info("\n", chalk_1.default.redBright("Exiting"));
    }
    static isOperationError(e) {
        if ("_isOperationError" in e) {
            return e._isOperationError === true;
        }
        return false;
    }
}
exports.OperationError = OperationError;
