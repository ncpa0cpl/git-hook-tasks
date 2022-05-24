import { exec } from "../utilities/exec";
import { parseArgs } from "./parse-args";
import type { PackageManager } from "./types";

export const Yarn: PackageManager = class Yarn {
  private static cwd: string = process.cwd();

  private static async execute(command: string): Promise<void> {
    return exec(command, { cwd: Yarn.cwd });
  }

  static setCwd(cwd: string) {
    Yarn.cwd = cwd;
  }

  static install(pkg: string) {
    const args: string[] = [];

    args.push(pkg);

    return Yarn.run("add", ...args);
  }

  static installDev(pkg: string) {
    const args: string[] = ["-D"];

    args.push(pkg);

    return Yarn.run("add", ...args);
  }

  static async run(script: string, ...args: string[]) {
    return Yarn.execute(await Yarn.generateCommand(script, ...args));
  }

  static async generateCommand(script: string, ...args: string[]) {
    return parseArgs(["yarn", script, ...args]);
  }
};
