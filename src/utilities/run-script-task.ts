import path from "path";
import type { PackageManager } from "../package-manager-bindings/types";
import { prepareTsFile } from "./prepare-ts-file";

export const runScriptTask = async (
  pm: PackageManager,
  cwd: string,
  scriptLocation: string,
  name?: string
): Promise<[name: string, err: null | Error]> => {
  const scriptExt = path.extname(scriptLocation);

  if (![".js", ".jsx", ".ts", ".tsx"].includes(scriptExt)) {
    throw new Error(
      `Unsupported script file type: ${scriptLocation}\nScript must be a JavaScript file.`
    );
  }

  const isTsFile = [".ts", ".tsx"].includes(scriptExt);

  const scriptAbsPath = isTsFile
    ? await prepareTsFile(pm, cwd, path.resolve(cwd, scriptLocation))
    : path.resolve(cwd, scriptLocation);

  try {
    const script = require(scriptAbsPath);

    if ("name" in script && typeof script["name"] === "string") {
      name ??= script;
    }

    if (!name) {
      name = path.basename(scriptAbsPath);
    }

    if ("default" in script && typeof script["default"] === "function") {
      await script["default"]();
    }

    return [name, null];
  } catch (e) {
    return [name ?? path.basename(scriptLocation), e as Error];
  }
};
