"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPackageManager = void 0;
const npm_1 = require("./npm");
const yarn_1 = require("./yarn");
const getPackageManager = (pm) => {
    if (pm === "yarn")
        return yarn_1.Yarn;
    if (pm === "npm")
        return npm_1.Npm;
    console.error(`Invalid package manager argument: (${pm})`);
    process.exit(-1);
};
exports.getPackageManager = getPackageManager;
