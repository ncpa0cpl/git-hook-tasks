"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
var parseArgs = function (args) {
    return args
        .map(function (p) {
        if (p.includes(" ") && p[0] !== '"' && p[0] !== '"' && p[0] !== "`") {
            return "\"".concat(p, "\"");
        }
        return p;
    })
        .join(" ");
};
exports.parseArgs = parseArgs;
