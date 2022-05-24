import chalk from "chalk";

export class OperationError extends Error {
  private readonly _isOperationError = true;

  static isOperationError(e: Error | OperationError): e is OperationError {
    if ("_isOperationError" in e) {
      return e._isOperationError === true;
    }
    return false;
  }

  constructor(name: string, data: string) {
    super("Operation Error");

    console.error(`[${chalk.red("✕")}] ${name}\n`);
    console.error(data);
    console.info("\n", chalk.redBright("Exiting"));
  }
}
