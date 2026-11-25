import fs from "fs/promises";
import path from "path";

export const parseArgs = (args: string[]) =>
  args
    .map((p) => {
      if (p.includes(" ") && p[0] !== '"' && p[0] !== '"' && p[0] !== "`") {
        return `"${p}"`;
      }
      return p;
    })
    .join(" ");

let pkgjson: Record<string, any>;
export function getPackageJSON(cwd: string) {
  if (pkgjson) return pkgjson;

  const packageFile = path.resolve(cwd, "package.json");
  return fs.readFile(packageFile, { encoding: "utf-8" }).then((fileData) => {
    pkgjson = JSON.parse(fileData);
    return pkgjson;
  });
}
