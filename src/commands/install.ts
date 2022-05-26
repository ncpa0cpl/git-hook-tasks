import { PM } from "../arguments/package-manager";
import { createConfig } from "../config/create-config-file";
import { getPackageManager } from "../package-manager-bindings/get-package-manager";
import { exec } from "../utilities/exec";
import { findProjectRoot } from "../utilities/find-project-root";

export const InstallCommand = () => {
  const selectedPm = new PM();

  return {
    async run() {
      const pm = getPackageManager(selectedPm.value);
      const cwd = await findProjectRoot();

      pm.setCwd(cwd);

      createConfig(cwd, selectedPm.value);

      await pm.run("husky", "install");

      await Promise.all([
        pm.run(
          "husky",
          "add",
          ".husky/pre-commit",
          await pm.generateCommand("git-hook-tasks", "pre-commit")
        ),
        pm.run(
          "husky",
          "add",
          ".husky/pre-push",
          await pm.generateCommand("git-hook-tasks", "pre-push")
        ),
        pm.run(
          "husky",
          "add",
          ".husky/post-commit",
          await pm.generateCommand("git-hook-tasks", "post-commit")
        ),
      ]);

      await Promise.all([
        exec("git add .husky/pre-commit", { cwd }),
        exec("git add .husky/pre-push", { cwd }),
        exec("git add .husky/post-commit", { cwd }),
      ]);
    },
  };
};
