import fs from "fs/promises";
import path from "path";
import type { GitHookTasksConfig } from "./validate-config";
import { validateConfig } from "./validate-config";

export const CONFIG_FILE_NAME = "git-hook-tasks.config.json";

export const readConfig = async (cwd: string): Promise<GitHookTasksConfig> => {
  const files = await fs.readdir(cwd);

  if (!files.includes(CONFIG_FILE_NAME)) {
    throw new Error("Config file not found!");
  }

  const config = JSON.parse(
    await fs.readFile(path.resolve(cwd, CONFIG_FILE_NAME), {
      encoding: "utf-8",
    })
  );

  return validateConfig(config);
};
