import chalk from "chalk";
import path from "path";
import type { PackageManager } from "../package-manager-bindings/types";
import { ConsoleInterceptor } from "./console-interceptor";
import { OutputManager } from "./output/output-manager";
import { prepareTsFile } from "./prepare-ts-file";

export const runScriptTask = async (
  pm: PackageManager,
  cwd: string,
  scriptLocation: string,
  onProgress = (msg: string) => {}
): Promise<null | Error> => {
  const scriptExt = path.extname(scriptLocation);

  onProgress("identifying file type");
  if (![".js", ".jsx", ".ts", ".tsx"].includes(scriptExt)) {
    throw new Error(
      `Unsupported script file type: ${scriptLocation}\nScript must be a JavaScript file.`
    );
  }

  const isTsFile = [".ts", ".tsx"].includes(scriptExt);

  if (isTsFile) {
    onProgress("transpiling to js");
  }

  const scriptAbsPath = isTsFile
    ? await prepareTsFile(pm, cwd, path.resolve(cwd, scriptLocation))
    : path.resolve(cwd, scriptLocation);

  const scriptLogs = ConsoleInterceptor.intercept();

  try {
    onProgress("loading script");
    const script = require(scriptAbsPath);

    onProgress("executing");
    if ("default" in script && typeof script["default"] === "function") {
      await script["default"](onProgress);
    }

    return null;
  } catch (e) {
    for (const [level, log] of scriptLogs.read()) {
      const color =
        level === "error"
          ? chalk.redBright
          : level === "warn"
          ? chalk.yellow
          : (a: string) => a;

      switch (level) {
        case "clear":
          break;
        default:
          OutputManager.newLine(
            [
              path.parse(scriptLocation).name + ":",
              ...log.map((elem) => color(elem.toString())),
            ],
            " "
          );
      }
    }
    return e as Error;
  } finally {
    ConsoleInterceptor.restore();
  }
};
