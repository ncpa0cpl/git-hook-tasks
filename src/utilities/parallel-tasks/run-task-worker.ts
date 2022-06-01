import { Worker } from "node:worker_threads";
import path from "path";
import type { PackageManager } from "../../package-manager-bindings/types";
import { loadingLine } from "../loading-line";
import { PostponedOperationError } from "../operation-error";
import { OutputManager } from "../output/output-manager";
import type { WorkerParams } from "./task.worker";
import { createListener, WorkerEvent } from "./worker-events";

export const runTaskWorker = (
  pm: PackageManager,
  cwd: string,
  scriptPath: string,
  name: string
) => {
  return new Promise<void>((resolve, reject) => {
    const w = new Worker(path.resolve(__dirname, "./task.worker.js"), {
      workerData: <WorkerParams>{
        cwd,
        scriptPath,
        packageManager: pm.label,
      },
    });

    const line = loadingLine(name, "starting");

    const close = (success: boolean) => {
      w.removeAllListeners();
      w.terminate();
      if (success) {
        line.finishSuccess();
      } else {
        line.finishFailure();
      }
    };

    w.addListener(
      ...createListener(WorkerEvent.NEW_LINE, ({ content, separator }) => {
        OutputManager.staticLine(content, separator);
      })
    );

    w.addListener(
      ...createListener(WorkerEvent.PROGRESS, (progress) => {
        line.updateProgress(progress);
      })
    );

    w.addListener(WorkerEvent.ERROR, (err) => {
      close(false);
      reject(err);
    });

    w.addListener(
      ...createListener(WorkerEvent.FINISH_FAILURE, (err) => {
        close(false);
        reject(new PostponedOperationError(err.message));
      })
    );

    w.addListener(
      ...createListener(WorkerEvent.FINISH_SUCCESS, () => {
        close(true);
        resolve();
      })
    );
  });
};
