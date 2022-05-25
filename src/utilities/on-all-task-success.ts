import chalk from "chalk";
import { OutputManager } from "./output/output-manager";

export const onAllTasksSuccess = () => {
  OutputManager.newLine([
    chalk.greenBright("\nAll git hook tasks finished successfully!\n"),
  ]);
};
