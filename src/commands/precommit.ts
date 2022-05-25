import { readConfig } from "../config/read-config";
import { getPackageManager } from "../package-manager-bindings/get-package-manager";
import { executeHooks } from "../utilities/execute-hooks";
import { runTasks } from "../utilities/exit-on-throw";
import { findProjectRoot } from "../utilities/find-project-root";
import { onAllTasksSuccess } from "../utilities/on-all-task-success";

export const PreCommitCommand = () => {
  return {
    async run() {
      await runTasks(async () => {
        const cwd = await findProjectRoot();
        const config = await readConfig(cwd);

        const pm = getPackageManager(config.packageManager);
        pm.setCwd(cwd);

        await executeHooks(pm, cwd, config, "precommit");

        onAllTasksSuccess();
      });
    },
  };
};
