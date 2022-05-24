import fs from "fs/promises";
import path from "path";
import { CONFIG_FILE_NAME } from "./read-config";

export const createConfig = async (cwd: string, pm: string) => {
  const files = await fs.readdir(cwd);

  if (files.includes(CONFIG_FILE_NAME)) {
    return;
  }

  await fs.writeFile(
    path.resolve(cwd, CONFIG_FILE_NAME),
    /* json */ `{
        packageManager: "${pm}",
        hooks: [
            {
                name: "prepush",
                script: "test"
            }
        ]
    }
    `
  );
};
