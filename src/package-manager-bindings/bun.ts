import { exec } from "../utilities/exec";
import { parseArgs } from "./parse-args";
import type { PackageManager } from "./types";

export const BunPM: PackageManager = class BunPM {
  private static cwd: string = process.cwd();

  private static async execute(...command: string[]): Promise<void> {
    return exec("bun " + parseArgs(command), { cwd: BunPM.cwd });
  }

  static readonly label = "bun";

  static setCwd(cwd: string) {
    BunPM.cwd = cwd;
  }

  static install(pkg: string) {
    const args: string[] = [];

    args.push(pkg);

    return BunPM.execute("add", ...args);
  }

  static installDev(pkg: string) {
    const args: string[] = ["-D"];

    args.push(pkg);

    return BunPM.execute("add", ...args);
  }

  static async run(script: string, ...args: string[]) {
    return BunPM.execute("run", script, ...args);
  }

  static async generateCommand(
    script: string,
    ...args: string[]
  ): Promise<string> {
    return parseArgs(["run", script, ...args]);
  }
};
