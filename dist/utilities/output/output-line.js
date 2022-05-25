"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputLine = void 0;
class OutputLine {
    constructor(manager, initialContent) {
        this.separator = " ";
        this.isClosed = false;
        this.manager = manager;
        this.content = initialContent;
    }
    setSeparator(separator) {
        this.separator = separator;
        this.manager.rerender();
    }
    getContent() {
        return this.content.filter((e) => e).join(this.separator);
    }
    update(value) {
        if (this.isClosed)
            return;
        if (typeof value === "function") {
            this.content = value(this.content);
        }
        else {
            this.content = value;
        }
        this.manager.rerender();
    }
    close() {
        this.isClosed = true;
    }
}
exports.OutputLine = OutputLine;
