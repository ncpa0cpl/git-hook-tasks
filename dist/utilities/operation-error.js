"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const output_manager_1 = require("./output/output-manager");
class OperationError extends Error {
    constructor(data) {
        super("Operation Error");
        this._isOperationError = true;
        output_manager_1.OutputManager.newLine(["\n"]);
        output_manager_1.OutputManager.newLine([data]);
        output_manager_1.OutputManager.newLine(["\n"]);
        output_manager_1.OutputManager.newLine([
            chalk_1.default.redBright("Git hook task has failed. Exiting."),
        ]);
    }
    static isOperationError(e) {
        if ("_isOperationError" in e) {
            return e._isOperationError === true;
        }
        return false;
    }
}
exports.OperationError = OperationError;
