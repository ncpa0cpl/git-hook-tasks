"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputManager = void 0;
const output_line_1 = require("./output-line");
class OutputManager {
    static rerender() {
        // eslint-disable-next-line @typescript-eslint/prefer-for-of
        for (let i = 0; i < this.lastRenderLines; i++) {
            process.stdout.moveCursor(0, -1);
            process.stdout.clearLine(1);
        }
        this.lastRenderLines = 0;
        for (const line of this.lines) {
            const content = line.getContent();
            process.stdout.write(content + "\n");
            this.lastRenderLines += content.split("\n").length;
        }
    }
    static newLine(initialContent) {
        const line = new output_line_1.OutputLine(this, initialContent);
        this.lines.push(line);
        this.rerender();
        return line;
    }
}
exports.OutputManager = OutputManager;
OutputManager.lines = [];
OutputManager.lastRenderLines = 0;
