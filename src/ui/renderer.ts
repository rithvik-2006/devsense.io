import chalk from "chalk";
import boxen from "boxen";
import { highlight } from "cli-highlight";

export function renderAI(title: string, content: string) {
  const header = chalk.cyan.bold(`\n🧠 ${title}\n`);

  const box = boxen(content.trim(), {
    padding: 1,
    borderStyle: "round",
    borderColor: "cyan",
    margin: 1
  });

  console.log(header + box);
}

export function formatSections(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, (_, m) => chalk.bold(m))
    .replace(/^(\d+\..*)/gm, (m) => chalk.yellow(m))
    .replace(/^-\s/gm, chalk.green("• "));
}

export function divider(title: string) {
  console.log(
    chalk.gray(
      `\n━━━ ${title.toUpperCase()} ━━━━━━━━━━━━━━━━━━━`
    )
  );
}

export function highlightCode(code: string, language = "ts"): string {
  return highlight(code, {
    language,
    ignoreIllegals: true
  });
}
