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

    OutputManager.staticLine(["\n"]);
    OutputManager.staticLine([data]);
    OutputManager.staticLine(["\n"]);
    OutputManager.staticLine([
      chalk.redBright("Git hook task has failed. Exiting."),
    ]);
  }
}

export class PostponedOperationError extends Error {
  private readonly _isPostponedOperationError = true;

  static isPostponedOperationError(
    e: Error | PostponedOperationError
  ): e is PostponedOperationError {
    if ("_isPostponedOperationError" in e) {
      return e._isPostponedOperationError === true;
    }
    return false;
  }

  private errorData: string;

  constructor(errorData: string) {
    super("Operation Error");

    this.errorData = errorData;
  }

  static print(por: PostponedOperationError) {
    OutputManager.staticLine(["\n"]);
    OutputManager.staticLine([por.errorData]);
    OutputManager.staticLine(["\n"]);
  }
}
