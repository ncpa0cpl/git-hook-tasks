import fs from "fs/promises";
import path from "path";
import type { PackageManager } from "../package-manager-bindings/types";

export const prepareTsFile = async (
  pm: PackageManager,
  cwd: string,
  location: string
) => {
  const p = path.parse(location);

  const cacheDir = path.resolve(
    cwd,
    "node_modules/.cache/git-hook-tasks",
    p.name
  );

  await fs.mkdir(cacheDir, { recursive: true });

  await pm.run(
    "tsc",
    location,
    "-m",
    "commonjs",
    "--allowJs",
    "--esModuleInterop",
    "--skipLibCheck",
    "--incremental",
    "--tsBuildInfoFile",
    path.join(cacheDir, "tsbuildinfo"),
    "--outDir",
    cacheDir
  );

  return path.join(cacheDir, p.name + ".js");
};
