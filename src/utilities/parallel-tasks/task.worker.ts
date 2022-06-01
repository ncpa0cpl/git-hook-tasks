import type { GetDataType } from "dilswer";
import { createValidator, DataType } from "dilswer";
import { isMainThread, parentPort, workerData } from "node:worker_threads";
import { getPackageManager } from "../../package-manager-bindings/get-package-manager";
import type { OM } from "../run-script-task";
import { runScriptTask } from "../run-script-task";
import { createEvent, WorkerEvent } from "./worker-events";

const WorkerParamsTypeDef = DataType.RecordOf({
  cwd: DataType.String,
  scriptPath: DataType.String,
  packageManager: DataType.OneOf(
    DataType.Literal("yarn"),
    DataType.Literal("npm")
  ),
});

export type WorkerParams = GetDataType<typeof WorkerParamsTypeDef>;

async function main() {
  const port = parentPort;
  if (port) {
    const validate = createValidator(WorkerParamsTypeDef);

    if (!validate(workerData)) {
      port.emit(WorkerEvent.ERROR, new Error("Incorrect worker data!"));
      return;
    }

    const { cwd, scriptPath } = workerData;
    const pm = getPackageManager(workerData.packageManager);

    const onProgress = (progress: string) => {
      port.postMessage(createEvent(WorkerEvent.PROGRESS, progress));
    };

    const outputManager: OM = {
      staticLine(content, separator) {
        port.postMessage(
          createEvent(WorkerEvent.NEW_LINE, { content, separator })
        );
      },
    };

    const handleError = (e: Error) => {
      port.postMessage(createEvent(WorkerEvent.FINISH_FAILURE, e));
    };

    try {
      const result = await runScriptTask(
        pm,
        cwd,
        scriptPath,
        onProgress,
        outputManager
      );
      if (result === null)
        port.postMessage(createEvent(WorkerEvent.FINISH_SUCCESS, null));
      else handleError(result);
    } catch (e) {
      handleError(e as Error);
    }
  }
}

if (!isMainThread) {
  main();
}
