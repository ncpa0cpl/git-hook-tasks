import fs from "fs/promises";
import path from "path";
import type { GitHookTasksConfig } from "../config/validate-config";
import type { PackageManager } from "../package-manager-bindings/types";
import { loadingLine } from "./loading-line";
import { OperationError } from "./operation-error";
import { runScriptTask } from "./run-script-task";

export const executeHooks = async (
  pm: PackageManager,
  cwd: string,
  config: GitHookTasksConfig,
  hookLabel: keyof Exclude<GitHookTasksConfig["hooks"], undefined>
) => {
  if (config.hooks) {
    const hook = config.hooks[hookLabel];
    if (hook) {
      if (typeof hook === "string") {
        const files = await fs.readdir(hook);

        for (const scriptFile of files) {
          const line = loadingLine(path.basename(scriptFile), "starting");

          const err = await runScriptTask(
            pm,
            cwd,
            path.resolve(cwd, hook, scriptFile),
            line.updateProgress
          );

          if (!err) {
            line.finishSuccess();
          } else {
            line.finishFailure();
            throw new OperationError(err.message);
          }
        }
      } else {
        for (const task of hook) {
          if ("script" in task) {
            const line = loadingLine(task.name, "running script");
            try {
              // @ts-expect-error
              await pm.run(...task.script.split(" "));
              line.finishSuccess();
            } catch (e) {
              line.finishFailure();
              throw new OperationError((e as Error).message);
            }
          } else {
            const line = loadingLine(task.name, "starting");
            const err = await runScriptTask(
              pm,
              cwd,
              task.taskFile,
              line.updateProgress
            );
            if (!err) {
              line.finishSuccess();
            } else {
              line.finishFailure();
              throw new OperationError(err.message);
            }
          }
        }
      }
    }
  }
};
