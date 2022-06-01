#!/usr/bin/env node
import clify from "clify.js";
import { InstallCommand } from "../commands/install";
import { PostCommitCommand } from "../commands/postcommit";
import { PreCommitCommand } from "../commands/precommit";
import { PrePushCommand } from "../commands/prepush";
import { OutputManager } from "../utilities/output/output-manager";

clify.configure((main) => {
  OutputManager.setMaxFps(2.86);
  main.addSubCommand("install", InstallCommand);
  main.addSubCommand("pre-commit", PreCommitCommand);
  main.addSubCommand("pre-push", PrePushCommand);
  main.addSubCommand("post-commit", PostCommitCommand);
});
