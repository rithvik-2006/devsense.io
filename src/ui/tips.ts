import chalk from "chalk";

export function showTip() {
  const tips = [
    "Try: devsense summary",
    "Ask AI: devsense ask 'Explain architecture'",
    "Initialize project: devsense init"
  ];

  const tip = tips[Math.floor(Math.random() * tips.length)];

  console.log(chalk.gray(`\n💡 ${tip}\n`));
}

export function showCommandSuggestions() {
  console.log(
    chalk.gray(`
💡 Try:
  devsense explain <file>
  devsense map
  devsense chat
`)
  );
}