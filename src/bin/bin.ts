#!/usr/bin/env node
import clify from "clify.js";
import { InstallCommand } from "../commands/install";
import { PreCommitCommand } from "../commands/precommit";
import { PrePushCommand } from "../commands/prepush";

clify.configure((main) => {
  main.addSubCommand("install", InstallCommand);
  main.addSubCommand("precommit", PreCommitCommand);
  main.addSubCommand("prepush", PrePushCommand);
  main.addSubCommand("postcommit");
});
