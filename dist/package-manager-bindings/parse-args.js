"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseArgs = void 0;
const parseArgs = (args) => args.map((p) => p.replace(/\s/g, "\\ ")).join(" ");
exports.parseArgs = parseArgs;
