import { exec } from "../utilities/exec";
import type { PackageManager } from "./types";
import { parseArgs, getPackageJSON } from "./shared";

export const BunPM: PackageManager = class BunPM {
  private static cwd: string = process.cwd();

  private static async execute(...command: string[]): Promise<void> {
    return exec(parseArgs(command), { cwd: BunPM.cwd });
  }

  static readonly label = "bun";

  static setCwd(cwd: string) {
    BunPM.cwd = cwd;
  }

  static install(pkg: string) {
    const args: string[] = [];

    args.push(pkg);

    return BunPM.execute("bun", "add", ...args);
  }

  static installDev(pkg: string) {
    const args: string[] = ["-D"];

    args.push(pkg);

    return BunPM.execute("bun", "add", ...args);
  }

  static async run(script: string, ...args: string[]) {
    return BunPM.execute(await BunPM.generateCommand(script, ...args));
  }

  static async generateCommand(
    script: string,
    ...args: string[]
  ): Promise<string> {
    const scripts: string[] = [];

    try {
      const settings = await getPackageJSON(BunPM.cwd);
      scripts.push(...Object.keys(settings["scripts"] ?? {}));
    } catch (e) {
      //
    }

    if (scripts.includes(script)) {
      const a = ["bun", "run", script, ...args];
      return parseArgs(a);
    }

    return parseArgs(["bun", "x", script, ...args]);
  }
};
