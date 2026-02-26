import chalk from "chalk";
import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";

export async function doctor() {
  const files = await scanProject();
  const info = analyzeProject(files);

  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  const hasFiles = files.length > 0;
  const hasFramework =
    info.frameworks.length > 0 || info.language !== "Unknown";

  if (hasKey) console.log(chalk.green("✔") + " Gemini API key detected");
  else console.log(chalk.red("✖") + " Gemini API key not set");

  if (hasFiles) console.log(chalk.green("✔") + " Repo scanned");
  else console.log(chalk.red("✖") + " No files found");

  if (hasFramework) console.log(chalk.green("✔") + " Supported framework found");
  else console.log(chalk.yellow("⚠") + " No framework detected");

  console.log(chalk.green("✔") + " DevSense ready");
}
