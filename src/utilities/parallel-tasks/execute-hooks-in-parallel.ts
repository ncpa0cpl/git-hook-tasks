import { Queue } from "async-await-queue";
import chalk from "chalk";
import fs from "fs/promises";
import os from "os";
import path from "path";
import type { GitHookTasksConfig } from "../../config/validate-config";
import type { PackageManager } from "../../package-manager-bindings/types";
import { loadingLine } from "../loading-line";
import { onAllTasksSuccess } from "../on-all-task-success";
import { OperationError, PostponedOperationError } from "../operation-error";
import { OutputManager } from "../output/output-manager";
import { runScriptTask } from "../run-script-task";
import { runTaskWorker } from "./run-task-worker";

const onTaskStart = () =>
  OutputManager.staticLine([chalk.green("\nRunning Git Hook Tasks\n")]);

export const executeHooksInParallel = async (
  pm: PackageManager,
  cwd: string,
  config: GitHookTasksConfig,
  hookLabel: keyof Exclude<GitHookTasksConfig["hooks"], undefined>
) => {
  if (config.hooks) {
    const hook = config.hooks[hookLabel];
    if (hook) {
      const queue = new Queue(
        config.parallelPoolSize ?? Math.max(1, os.cpus().length - 1)
      );

      const errors: Error[] = [];

      const processErrors = () => {
        for (const err of errors) {
          if (PostponedOperationError.isPostponedOperationError(err)) {
            PostponedOperationError.print(err);
          } else {
            new OperationError(`${err.message}`);
          }
        }
        OutputManager.staticLine([
          chalk.redBright("Some Git hook tasks have failed. Exiting."),
        ]);

        throw new OperationError("", true);
      };

      if (typeof hook === "string") {
        onTaskStart();
        const files = await fs.readdir(hook);

        for (const scriptFile of files) {
          const name = path.basename(scriptFile);

          queue.run(() =>
            runTaskWorker(
              pm,
              cwd,
              path.resolve(cwd, hook, scriptFile),
              name
            ).catch((e) => {
              errors.push(e as Error);
            })
          );
        }

        await queue.flush();

        if (errors.length === 0) {
          onAllTasksSuccess();
        } else {
          return processErrors();
        }
      } else {
        const aloneScripts: Array<() => Promise<void>> = [];

        if (hook.length > 0) {
          onTaskStart();
        }

        for (const task of hook) {
          if ("script" in task) {
            if (task.mustRunAlone) {
              aloneScripts.push(async () => {
                const line = loadingLine(task.name, "running script");
                try {
                  // @ts-expect-error
                  await pm.run(...task.script.split(" "));
                  line.finishSuccess();
                } catch (e) {
                  line.finishFailure();
                  throw new OperationError((e as Error).message);
                }
              });

              continue;
            }

            queue.run(() => {
              const line = loadingLine(task.name, "running script");
              return (
                pm
                  // @ts-expect-error
                  .run(...task.script.split(" "))
                  .then(() => {
                    line.finishSuccess();
                  })
                  .catch((e) => {
                    line.finishFailure();
                    errors.push(e as Error);
                  })
              );
            });
          } else {
            if (task.mustRunAlone) {
              aloneScripts.push(async () => {
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
              });

              continue;
            }

            queue.run(() =>
              runTaskWorker(pm, cwd, task.taskFile, task.name).catch((e) => {
                errors.push(e as Error);
              })
            );
          }
        }

        await queue.flush();

        if (errors.length > 0) {
          return processErrors();
        }

        for (const aloneScript of aloneScripts) {
          await aloneScript();
        }

        if (hook.length > 0) {
          onAllTasksSuccess();
        }
      }
    }
  }
};
