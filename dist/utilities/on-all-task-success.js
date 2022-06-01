"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onAllTasksSuccess = void 0;
var chalk_1 = __importDefault(require("chalk"));
var output_manager_1 = require("./output/output-manager");
var onAllTasksSuccess = function () {
    output_manager_1.OutputManager.staticLine([
        chalk_1.default.greenBright("\nAll git hook tasks finished successfully!\n"),
    ]);
};
exports.onAllTasksSuccess = onAllTasksSuccess;
