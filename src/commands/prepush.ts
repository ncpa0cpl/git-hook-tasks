import { PM } from "../arguments/package-manager";
import { readConfig } from "../config/read-config";
import { getPackageManager } from "../package-manager-bindings/get-package-manager";
import { exitOnThrow } from "../utilities/exit-on-throw";
import { findProjectRoot } from "../utilities/find-project-root";
import { onAllTasksSuccess } from "../utilities/on-all-task-success";
import { onTaskSuccess } from "../utilities/on-task-success";
import { OperationError } from "../utilities/operation-error";
import { runScriptTask } from "../utilities/run-script-task";

export const PrePushCommand = () => {
  const selectedPm = new PM();

  return {
    async run() {
      await exitOnThrow(async () => {
        const pm = getPackageManager(selectedPm.value);
        const cwd = await findProjectRoot();
        pm.setCwd(cwd);

        const config = await readConfig(cwd);

        if (config.hooks?.prepush) {
          if (typeof config.hooks.prepush === "string") {
            const [name, err] = await runScriptTask(cwd, config.hooks.prepush);
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
                const [name, err] = await runScriptTask(cwd, task.taskFile);
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
