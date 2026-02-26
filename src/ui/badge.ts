import chalk from "chalk";

export function badge(text: string): string {
  return chalk.bgBlue.black(` ${text} `);
}
