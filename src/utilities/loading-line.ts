import chalk from "chalk";
import stripAnsi from "strip-ansi";
import { OutputManager } from "./output/output-manager";

const SUCCESS_ICON = `[${chalk.green("✓")}]` as "[✓]";
const FAILURE_ICON = `[${chalk.red("✕")}]` as "[✕]";

const TIMEFRAMES = {
  ".  ": ".. ",
  ".. ": "...",
  "...": ".  ",
  [SUCCESS_ICON]: SUCCESS_ICON,
  [FAILURE_ICON]: FAILURE_ICON,
} as const;

type LoadingLine = [
  loader: keyof typeof TIMEFRAMES,
  label: string,
  progress?: string
];

export const loadingLine = (label: string, progress?: string) => {
  const line = OutputManager.dynamicLine<LoadingLine>([
    ".  ",
    label,
    `(${chalk.blue(progress)})`,
  ]);

  const loadingInterval = setInterval(() => {
    line.update(([lineLoader, lineLabel, progress]) => [
      TIMEFRAMES[lineLoader],
      lineLabel,
      progress,
    ]);
  }, 700);

  const finishSuccess = () => {
    clearInterval(loadingInterval);
    line.update(([, lineLabel]) => [SUCCESS_ICON, lineLabel]);
    line.close();
  };

  const finishFailure = () => {
    clearInterval(loadingInterval);
    line.update(([, lineLabel, progress]) => [
      FAILURE_ICON,
      lineLabel,
      progress ? `(${chalk.red(stripAnsi(progress).slice(1, -1))})` : undefined,
    ]);
    line.close();
  };

  const updateProgress = (progress: string) => {
    line.update(([lineLoader, lineLabel]) => [
      lineLoader,
      lineLabel,
      `(${chalk.blue(progress)})`,
    ]);
  };

  return {
    finishSuccess,
    finishFailure,
    updateProgress,
  };
};
