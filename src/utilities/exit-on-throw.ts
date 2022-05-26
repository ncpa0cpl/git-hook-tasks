import { OperationError } from "./operation-error";
import { OutputManager } from "./output/output-manager";

export const runTasks = async (fn: () => any) => {
  process.stdout.write("\u001B[?25l");

  process.on("exit", function () {
    process.stdout.write("\u001B[?25h");
  });

  process.on("SIGINT", async function () {
    await OutputManager.waitTillAllFlushed();
    process.exit(1);
  });

  try {
    await fn();
  } catch (e) {
    if (!(e instanceof Error && OperationError.isOperationError(e))) {
      new OperationError(`${e}`);
    }

    await OutputManager.waitTillAllFlushed();
    process.exit(1);
  }
};
