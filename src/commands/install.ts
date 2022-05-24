import { PM } from "../arguments/package-manager";
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

      await pm.installDev("husky");
      await pm.run("husky install");

      await Promise.all([
        pm.run(
          `husky add .husky/pre-commit "${await pm.generateCommand(
            "git-hook-tasks",
            "precommit",
            "-p",
            selectedPm.value
          )}"`
        ),
        pm.run(
          `husky add .husky/pre-push "${await pm.generateCommand(
            "git-hook-tasks",
            "prepush",
            "-p",
            selectedPm.value
          )}"`
        ),
        pm.run(
          `husky add .husky/post-commit "${await pm.generateCommand(
            "git-hook-tasks",
            "postcommit",
            "-p",
            selectedPm.value
          )}"`
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
