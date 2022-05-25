import path from "path";
import type { PackageManager } from "../package-manager-bindings/types";
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

  try {
    onProgress("loading script");
    const script = require(scriptAbsPath);

    // if (!name) {
    //   if ("name" in script && typeof script["name"] === "string") {
    //     name = script["name"];
    //   } else {
    //     name = path.basename(scriptAbsPath);
    //   }
    // }

    onProgress("executing");
    if ("default" in script && typeof script["default"] === "function") {
      await script["default"](onProgress);
    }

    return null;
  } catch (e) {
    return e as Error;
  }
};
