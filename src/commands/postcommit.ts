import { PM } from "../arguments/package-manager";
import { readConfig } from "../config/read-config";
import { getPackageManager } from "../package-manager-bindings/get-package-manager";
import { exitOnThrow } from "../utilities/exit-on-throw";
import { findProjectRoot } from "../utilities/find-project-root";
import { onAllTasksSuccess } from "../utilities/on-all-task-success";
import { onTaskSuccess } from "../utilities/on-task-success";
import { OperationError } from "../utilities/operation-error";
import { runScriptTask } from "../utilities/run-script-task";

export const PostCommitCommand = () => {
  const selectedPm = new PM();

  return {
    async run() {
      await exitOnThrow(async () => {
        const pm = getPackageManager(selectedPm.value);
        const cwd = await findProjectRoot();
        pm.setCwd(cwd);

        const config = await readConfig(cwd);

        if (config.hooks?.postcommit) {
          if (typeof config.hooks.postcommit === "string") {
            const [name, err] = await runScriptTask(
              cwd,
              config.hooks.postcommit
            );
            if (!err) {
              onTaskSuccess(name);
            } else {
              throw new OperationError(name, err.message);
            }
          } else {
            for (const task of config.hooks.postcommit) {
              if ("script" in task) {
                try {
                  // @ts-expect-error
                  await pm.run(...task.script.split(" "));
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
