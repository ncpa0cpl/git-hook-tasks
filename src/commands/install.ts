import fs from "fs/promises";
import path from "path";
import { CommandInitPhase } from "clify.js";
import { PM } from "../arguments/package-manager";
import { createConfig } from "../config/create-config-file";
import { getPackageManager } from "../package-manager-bindings/get-package-manager";
import { exec } from "../utilities/exec";
import { findProjectRoot } from "../utilities/find-project-root";
import { parseArgs } from "../package-manager-bindings/shared";

const hooks = ["pre-commit", "pre-push", "post-commit"] as const;

export const InstallCommand = (cmd: CommandInitPhase) => {
  const selectedPm = cmd.option(PM);

  return async () => {
    const pm = getPackageManager(selectedPm.value);
    const cwd = await findProjectRoot();

    pm.setCwd(cwd);

    createConfig(cwd, selectedPm.value);

    await pm.run("husky", "install");

    await Promise.all(
      hooks.map(async (hook) => {
        const hookPath = path.resolve(cwd, ".husky", hook);
        const command = parseArgs(
          await pm.generateCommand("git-hook-tasks", hook)
        );

        let script: string | null = null;
        try {
          script = await fs.readFile(hookPath, "utf-8");
        } catch {
          //
        }

        // husky add appends rather than replaces, so it cannot update an
        // already-installed command.
        if (script !== null) {
          if (script.includes(command)) return;

          const lines = script
            .split("\n")
            .filter((line) => !line.includes("git-hook-tasks"));

          while (lines.at(-1)?.trim() === "") {
            lines.pop();
          }

          await fs.writeFile(hookPath, `${lines.join("\n")}\n\n${command}\n`);
        } else {
          await pm.run("husky", "add", `.husky/${hook}`, command);
        }

        await exec("git", ["add", `.husky/${hook}`], { cwd });
      })
    );
  };
};
