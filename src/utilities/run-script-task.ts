import path from "path";

export const runScriptTask = async (
  cwd: string,
  scriptLocation: string,
  name?: string
): Promise<[name: string, err: null | Error]> => {
  try {
    const scriptAbsPath = path.resolve(cwd, scriptLocation);
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
