"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PM = void 0;
var clify_js_1 = require("clify.js");
exports.PM = clify_js_1.Argument.define({
    flagChar: "-p",
    keyword: "--package-manager",
    dataType: "string",
    require: true,
});
