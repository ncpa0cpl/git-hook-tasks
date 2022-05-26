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
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTasks = void 0;
const operation_error_1 = require("./operation-error");
const output_manager_1 = require("./output/output-manager");
const runTasks = (fn) => __awaiter(void 0, void 0, void 0, function* () {
    process.stdout.write("\u001B[?25l");
    process.on("exit", function () {
        process.stdout.write("\u001B[?25h");
    });
    process.on("SIGINT", function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield output_manager_1.OutputManager.waitTillAllFlushed();
            process.exit(1);
        });
    });
    try {
        yield fn();
    }
    catch (e) {
        if (!(e instanceof Error && operation_error_1.OperationError.isOperationError(e))) {
            new operation_error_1.OperationError(`${e}`);
        }
        yield output_manager_1.OutputManager.waitTillAllFlushed();
        process.exit(1);
    }
});
exports.runTasks = runTasks;
