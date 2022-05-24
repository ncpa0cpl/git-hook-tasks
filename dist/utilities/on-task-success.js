"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onTaskSuccess = void 0;
const chalk_1 = __importDefault(require("chalk"));
function onTaskSuccess(name) {
    console.info(`[${chalk_1.default.green("✓")}] ${name}`);
}
exports.onTaskSuccess = onTaskSuccess;
