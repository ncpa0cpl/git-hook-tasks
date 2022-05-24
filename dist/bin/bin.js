"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clify_js_1 = __importDefault(require("clify.js"));
const install_1 = require("../commands/install");
const precommit_1 = require("../commands/precommit");
const prepush_1 = require("../commands/prepush");
clify_js_1.default.configure((main) => {
    main.addSubCommand("install", install_1.InstallCommand);
    main.addSubCommand("precommit", precommit_1.PreCommitCommand);
    main.addSubCommand("prepush", prepush_1.PrePushCommand);
    main.addSubCommand("postcommit");
});
