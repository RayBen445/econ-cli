import chalk from "chalk";

export const color = {
  title: (value: string) => chalk.bold.cyan(value),
  success: (value: string) => chalk.green(value),
  accent: (value: string) => chalk.magenta(value),
  warning: (value: string) => chalk.yellow(value),
  subtle: (value: string) => chalk.gray(value)
};
