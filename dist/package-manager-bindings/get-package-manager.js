"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManager = void 0;
var output_manager_1 = require("../utilities/output/output-manager");
var npm_1 = require("./npm");
var yarn_1 = require("./yarn");
var getPackageManager = function (pm) {
    if (pm === "yarn")
        return yarn_1.Yarn;
    if (pm === "npm")
        return npm_1.Npm;
    output_manager_1.OutputManager.staticLine(["Invalid package manager argument: (".concat(pm, ")")]);
    throw new Error("Invalid package manager argument: (".concat(pm, ")"));
};
exports.getPackageManager = getPackageManager;
