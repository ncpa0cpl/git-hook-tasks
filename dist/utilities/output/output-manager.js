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
exports.OutputManager = void 0;
const async_await_queue_1 = __importDefault(require("async-await-queue"));
const output_line_1 = require("./output-line");
const renderQueue = new async_await_queue_1.default(1);
class OutputManager {
    static flush(contents) {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/prefer-for-of
            for (let i = 0; i < this.lastRenderLines; i++) {
                process.stdout.write("\u001b[T\u001b[2K");
            }
            this.lastRenderLines = 0;
            for (const line of contents) {
                process.stdout.write(line + "\n");
                this.lastRenderLines += line.split("\n").length;
            }
        });
    }
    static waitTillAllFlushed() {
        return renderQueue.flush();
    }
    static rerender() {
        const currentRender = ++this.rerenderCount;
        renderQueue.run(() => __awaiter(this, void 0, void 0, function* () {
            if (this.rerenderCount === currentRender)
                yield this.flush(this.lines.map((l) => l.getContent()));
        }));
    }
    static newLine(initialContent, separator) {
        const line = new output_line_1.OutputLine(this, initialContent);
        this.lines.push(line);
        if (separator !== undefined) {
            line.setSeparator(separator);
        }
        else {
            this.rerender();
        }
        return line;
    }
}
exports.OutputManager = OutputManager;
OutputManager.lines = [];
OutputManager.lastRenderLines = 0;
OutputManager.rerenderCount = 0;
