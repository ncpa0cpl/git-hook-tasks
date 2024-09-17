import { OutputManager } from "../utilities/output/output-manager";
import { BunPM } from "./bun";
import { Npm } from "./npm";
import type { PackageManager } from "./types";
import { Yarn } from "./yarn";

export const getPackageManager = (pm: string): PackageManager => {
  if (pm === "yarn") return Yarn;
  if (pm === "npm") return Npm;
  if (pm === "bun") return BunPM;

  OutputManager.staticLine([`Invalid package manager argument: (${pm})`]);
  throw new Error(`Invalid package manager argument: (${pm})`);
};
