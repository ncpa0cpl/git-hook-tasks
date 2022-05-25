"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-fallthrough */
const output_manager_1 = require("./output-manager");
const line1 = output_manager_1.OutputManager.newLine(["   ", "Line 1"]);
const line2 = output_manager_1.OutputManager.newLine(["   ", "Line 2"]);
const line3 = output_manager_1.OutputManager.newLine(["   ", "Line 3"]);
const LoaderTimeFrames = {
    "   ": ".  ",
    ".  ": ".. ",
    ".. ": "...",
    "...": "   ",
};
let i = 0;
const interval = setInterval(() => {
    line1.update(([a, b]) => [LoaderTimeFrames[a], b]);
    line2.update(([a, b]) => [LoaderTimeFrames[a], b]);
    line3.update(([a, b]) => [LoaderTimeFrames[a], b]);
    if (i++ === 10) {
        clearInterval(interval);
    }
}, 1000);
