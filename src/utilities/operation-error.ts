import chalk from "chalk";
import { OutputManager } from "./output/output-manager";

export class OperationError extends Error {
  private readonly _isOperationError = true;

  static isOperationError(e: Error | OperationError): e is OperationError {
    if ("_isOperationError" in e) {
      return e._isOperationError === true;
    }
    return false;
  }

  constructor(data: string) {
    super("Operation Error");

    OutputManager.newLine(["\n"]);
    OutputManager.newLine([data]);
    OutputManager.newLine(["\n"]);
    OutputManager.newLine([
      chalk.redBright("Git hook task has failed. Exiting."),
    ]);
  }
}
