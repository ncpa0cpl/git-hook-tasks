import fs from "fs/promises";
import { walk } from "node-os-walk";
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
    "--noImplicitUseStrict",
    "--esModuleInterop",
    "--skipLibCheck",
    "--allowJs",
    "--incremental",
    "--tsBuildInfoFile",
    path.join(cacheDir, "tsbuildinfo"),
    "--outDir",
    cacheDir
  );

  for await (const [root, _, files] of walk(cacheDir)) {
    for (const file of files) {
      if (path.extname(file.name) === ".js") {
        const filepath = path.join(root, file.name);
        const originalDirPath = path.dirname(filepath).replace(cacheDir, p.dir);

        let fileContent = await fs.readFile(filepath, {
          encoding: "utf-8",
        });

        if (fileContent.startsWith("__dirname =")) {
          fileContent = fileContent.replace(
            /^__dirname\s=\s.+?;/,
            `__dirname = ${JSON.stringify({
              path: originalDirPath,
            })}.path;`
          );
        } else {
          fileContent =
            `__dirname = ${JSON.stringify({
              path: originalDirPath,
            })}.path;\n` + fileContent;
        }

        await fs.writeFile(filepath, fileContent, { encoding: "utf-8" });
      }
    }
  }

  return path.join(cacheDir, p.name + ".js");
};
