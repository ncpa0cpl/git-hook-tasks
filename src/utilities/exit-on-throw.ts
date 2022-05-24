import { OperationError } from "./operation-error";

export const exitOnThrow = async (fn: () => any) => {
  try {
    await fn();
  } catch (e) {
    if (!(e instanceof Error && OperationError.isOperationError(e))) {
      new OperationError("Unknown Error", `${e}`);
    }

    process.exit(1);
  }
};
