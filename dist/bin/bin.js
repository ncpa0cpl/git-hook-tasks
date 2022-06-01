#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clify_js_1 = __importDefault(require("clify.js"));
var install_1 = require("../commands/install");
var postcommit_1 = require("../commands/postcommit");
var precommit_1 = require("../commands/precommit");
var prepush_1 = require("../commands/prepush");
var output_manager_1 = require("../utilities/output/output-manager");
clify_js_1.default.configure(function (main) {
    output_manager_1.OutputManager.setMaxFps(2.86);
    main.addSubCommand("install", install_1.InstallCommand);
    main.addSubCommand("pre-commit", precommit_1.PreCommitCommand);
    main.addSubCommand("pre-push", prepush_1.PrePushCommand);
    main.addSubCommand("post-commit", postcommit_1.PostCommitCommand);
});
