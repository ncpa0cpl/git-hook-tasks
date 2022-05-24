import chalk from "chalk";

export const onAllTasksSuccess = () => {
  console.log(
    chalk.greenBright("\nAll git hook tasks finished successfully!\n")
  );
};
