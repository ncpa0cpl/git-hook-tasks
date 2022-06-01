"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputLine = void 0;
var OutputLine = /** @class */ (function () {
    function OutputLine(manager, initialContent) {
        this.separator = " ";
        this._isClosed = false;
        this.manager = manager;
        this.content = initialContent;
    }
    OutputLine.prototype.setSeparator = function (separator, rerender) {
        var prev = this.separator;
        this.separator = separator;
        if (rerender && prev !== separator)
            this.manager._rerender();
    };
    OutputLine.prototype.getContent = function () {
        return this.content.filter(function (e) { return e; }).join(this.separator);
    };
    OutputLine.prototype.update = function (value) {
        if (this._isClosed)
            return;
        if (typeof value === "function") {
            this.content = value(this.content);
        }
        else {
            this.content = value;
        }
        this.manager._rerender();
    };
    OutputLine.prototype.close = function () {
        this._isClosed = true;
    };
    Object.defineProperty(OutputLine.prototype, "isClosed", {
        get: function () {
            return this._isClosed;
        },
        enumerable: false,
        configurable: true
    });
    return OutputLine;
}());
exports.OutputLine = OutputLine;
