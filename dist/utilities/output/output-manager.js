"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputManager = void 0;
var throttle_1 = require("../throttle");
var output_line_1 = require("./output-line");
var runThrottled = (0, throttle_1.throttle)(function (fn) { return fn(); }, 1000);
var OutputManager = /** @class */ (function () {
    function OutputManager() {
    }
    OutputManager._rerender = function () {
        var _this = this;
        runThrottled(function () {
            var e_1, _a;
            var relevantLines = _this.lines.slice(_this.renderLinesOffset);
            var checkClosed = true;
            var closedLines = 0;
            var linesNotToClearOnNextRender = 0;
            var out = "";
            try {
                for (var relevantLines_1 = __values(relevantLines), relevantLines_1_1 = relevantLines_1.next(); !relevantLines_1_1.done; relevantLines_1_1 = relevantLines_1.next()) {
                    var line = relevantLines_1_1.value;
                    var content = line.getContent();
                    out += content + "\n";
                    if (line.isClosed && checkClosed) {
                        closedLines++;
                        linesNotToClearOnNextRender += content.split("\n").length;
                    }
                    else {
                        checkClosed = false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (relevantLines_1_1 && !relevantLines_1_1.done && (_a = relevantLines_1.return)) _a.call(relevantLines_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            process.stdout.write(Array.from({ length: Math.max(0, _this.linesToClearOnNextRender - 1) }, function () { return "\u001b[T\u001b[2K"; }).join("") + out);
            _this.renderLinesOffset += closedLines;
            _this.linesToClearOnNextRender =
                out.split("\n").length - linesNotToClearOnNextRender;
        });
    };
    OutputManager.setMaxFps = function (fps) {
        runThrottled.setWait(Math.max(1, Math.floor(1000 / fps)));
    };
    OutputManager.dynamicLine = function (initialContent, separator) {
        var line = new output_line_1.OutputLine(this, initialContent);
        this.lines.push(line);
        if (separator !== undefined) {
            line.setSeparator(separator, false);
        }
        this._rerender();
        return line;
    };
    OutputManager.staticLine = function (content, separator) {
        var line = new output_line_1.OutputLine(this, content);
        this.lines.push(line);
        if (separator) {
            line.setSeparator(separator, false);
        }
        line.close();
        this._rerender();
    };
    OutputManager.lines = [];
    OutputManager.linesToClearOnNextRender = 0;
    OutputManager.renderLinesOffset = 0;
    return OutputManager;
}());
exports.OutputManager = OutputManager;
