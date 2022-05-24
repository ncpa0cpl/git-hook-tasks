import chalk from "chalk";

export function onTaskSuccess(name: string) {
  console.info(`[${chalk.green("✓")}] ${name}`);
}
