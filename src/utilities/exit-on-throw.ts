import { OperationError } from "./operation-error";

export const runTasks = async (fn: () => any) => {
  process.stdout.write("\u001B[?25l");

  process.on("exit", function () {
    process.stdout.write("\u001B[?25h");
  });

  process.on("SIGINT", async function () {
    process.exit(1);
  });

  try {
    await fn();
  } catch (e) {
    if (!(e instanceof Error && OperationError.isOperationError(e))) {
      new OperationError(`${(e as Error).message}`);
    }
    await new Promise<void>((r) => setTimeout(r, 1000));
    process.exit(1);
  }
};
