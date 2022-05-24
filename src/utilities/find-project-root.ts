import fs from "fs/promises";
import os from "os";
import path from "path";

const isWindows = os.platform() === "win32";

export const findProjectRoot = async () => {
  let location = path.resolve(__dirname, "../../..");

  while (true) {
    if ((isWindows && location.length < 4) || location.length < 2) {
      throw new Error("Project root directory not found!");
    }

    const files = await fs.readdir(location);

    if (files.some((f) => f === "package.json")) {
      return location;
    }

    location = path.resolve(location, "..");
  }
};
