"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAllTasksSuccess = void 0;
const chalk_1 = __importDefault(require("chalk"));
const output_manager_1 = require("./output/output-manager");
const onAllTasksSuccess = () => {
    output_manager_1.OutputManager.newLine([
        chalk_1.default.greenBright("\nAll git hook tasks finished successfully!\n"),
    ]);
};
exports.onAllTasksSuccess = onAllTasksSuccess;
