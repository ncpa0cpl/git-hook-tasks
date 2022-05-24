"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const parseArgs = (args) => args
    .map((p) => {
    if (p.includes(" ") && p[0] !== '"' && p[0] !== '"' && p[0] !== "`") {
        return `"${p}"`;
    }
    return p;
})
    .join(" ");
exports.parseArgs = parseArgs;
