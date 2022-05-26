import fs from "fs/promises";
import path from "path";
import "./json-schema.json";
import { CONFIG_FILE_NAME } from "./read-config";

export const createConfig = async (cwd: string, pm: string) => {
  const files = await fs.readdir(cwd);

  if (!files.includes(CONFIG_FILE_NAME)) {
    await fs.writeFile(
      path.resolve(cwd, CONFIG_FILE_NAME),
      /* json */ `{
  "packageManager": "${pm}",
  "hooks": {
    "pre-push": [],
    "pre-commit": [],
    "post-commit": []
  }
}
`
    );
  }

  const vscodeDir = path.resolve(cwd, ".vscode");
  const vscodeSettingsFile = path.resolve(vscodeDir, "settings.json");
  await fs.mkdir(vscodeDir, { recursive: true });

  let settings: { "json.schemas"?: { fileMatch?: unknown; url: string }[] } =
    {};

  const vscodeFiles = await fs.readdir(vscodeDir);
  if (vscodeFiles.includes("settings.json")) {
    const f = await fs.readFile(vscodeSettingsFile, { encoding: "utf-8" });
    settings = JSON.parse(f);
  }

  if (!settings["json.schemas"]) {
    settings["json.schemas"] = [];
  }

  if (
    !settings["json.schemas"].some((s) => {
      const isObject = typeof s === "object" && s !== null;
      if (isObject) {
        const fileMatch = s.fileMatch;
        if (Array.isArray(fileMatch)) {
          return fileMatch.includes(CONFIG_FILE_NAME);
        }
        return fileMatch === CONFIG_FILE_NAME;
      }

      return false;
    })
  ) {
    settings["json.schemas"].push({
      fileMatch: [CONFIG_FILE_NAME],
      url: "./node_modules/git-hook-tasks/dist/config/json-schema.json",
    });

    await fs.writeFile(vscodeSettingsFile, JSON.stringify(settings, null, 2));
  }
};
