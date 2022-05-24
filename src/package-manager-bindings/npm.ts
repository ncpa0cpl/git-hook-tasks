import fs from "fs/promises";
import path from "path";
import { exec } from "../utilities/exec";
import { parseArgs } from "./parse-args";
import type { PackageManager } from "./types";

export const Npm: PackageManager = class Npm {
  private static cwd: string = process.cwd();

  private static execute(command: string): Promise<void> {
    return exec(command, { cwd: Npm.cwd });
  }

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
    const packageFile = path.resolve(Npm.cwd, "package.json");

    const scripts: string[] = [];

    try {
      const fileData = await fs.readFile(packageFile, { encoding: "utf-8" });

      const settings: Record<string, any> = JSON.parse(fileData);

      scripts.push(
        ...Object.keys(settings["scripts"] ?? {}),
        ...Object.keys(settings["dependencies"] ?? {}),
        ...Object.keys(settings["devDependencies"] ?? {})
      );
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
