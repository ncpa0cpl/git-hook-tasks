import { readConfig } from "../config/read-config";
import { getPackageManager } from "../package-manager-bindings/get-package-manager";
import { exitOnThrow } from "../utilities/exit-on-throw";
import { findProjectRoot } from "../utilities/find-project-root";
import { onAllTasksSuccess } from "../utilities/on-all-task-success";
import { onTaskSuccess } from "../utilities/on-task-success";
import { OperationError } from "../utilities/operation-error";
import { runScriptTask } from "../utilities/run-script-task";

export const PrePushCommand = () => {
  return {
    async run() {
      await exitOnThrow(async () => {
        const cwd = await findProjectRoot();
        const config = await readConfig(cwd);

        const pm = getPackageManager(config.packageManager);
        pm.setCwd(cwd);

        if (config.hooks?.prepush) {
          if (typeof config.hooks.prepush === "string") {
            const [name, err] = await runScriptTask(
              pm,
              cwd,
              config.hooks.prepush
            );
            if (!err) {
              onTaskSuccess(name);
            } else {
              throw new OperationError(name, err.message);
            }
          } else {
            for (const task of config.hooks.prepush) {
              if ("script" in task) {
                try {
                  await pm.run(task.script);
                  onTaskSuccess(task.name);
                } catch (e) {
                  throw new OperationError(task.name, (e as Error).message);
                }
              } else {
                const [name, err] = await runScriptTask(pm, cwd, task.taskFile);
                if (!err) {
                  onTaskSuccess(name);
                } else {
                  throw new OperationError(name, err.message);
                }
              }
            }
          }
        }

        onAllTasksSuccess();
      });
    },
  };
};
