import chalk from "chalk";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";

export function showWelcome() {
  const title = figlet.textSync("DevSense", {
    horizontalLayout: "default"
  });

  console.log(gradient.pastel.multiline(title));

  const message = `
🧠 DevSense — Developer Intelligence CLI

${chalk.green("✓")} Repo Awareness
${chalk.green("✓")} Multi-Framework Detection
${chalk.green("✓")} Gemini AI Ready

Commands:
  devsense init
  devsense summary
  devsense ask "<question>"
`;

  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan"
    })
  );
}