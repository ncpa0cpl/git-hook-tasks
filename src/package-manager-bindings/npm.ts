import { exec } from "../utilities/exec";
import { parseArgs, getPackageJSON } from "./shared";
import type { PackageManager } from "./types";

export const Npm: PackageManager = class Npm {
  private static cwd: string = process.cwd();

  private static execute(command: string): Promise<void> {
    return exec(command, { cwd: Npm.cwd });
  }

  static readonly label = "npm";

  static setCwd(cwd: string) {
    Npm.cwd = cwd;
  }

  static install(pkg: string) {
    const args: string[] = ["npm", "install"];

    args.push(pkg);

    return Npm.execute(parseArgs(args));
  }

  static installDev(pkg: string) {
    const args: string[] = ["npm", "install", "-D"];

    args.push(pkg);

    return Npm.execute(parseArgs(args));
  }

  static async run(script: string, ...args: string[]) {
    return Npm.execute(await Npm.generateCommand(script, ...args));
  }

  static async generateCommand(script: string, ...args: string[]) {
    const scripts: string[] = [];

    try {
      const settings = await getPackageJSON(Npm.cwd);
      scripts.push(...Object.keys(settings["scripts"] ?? {}));
    } catch (e) {
      //
    }

    if (scripts.includes(script)) {
      const a = ["npm", "run", script];

      if (args.length > 0) {
        a.push("--");
        a.push(...args);
      }

      return parseArgs(a);
    }

    return parseArgs(["npx", script, ...args]);
  }
};
