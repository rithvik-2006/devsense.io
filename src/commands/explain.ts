import path from "path";
import fs from "fs";
import chalk from "chalk";
import ora from "ora";
import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";
import { buildContextForFile } from "../core/contextBuilder";
import { GeminiProvider } from "../providers/gemini";
import { printSessionHeader } from "../ui/header";
import { renderAI, formatSections } from "../ui/renderer";
import { showCommandSuggestions } from "../ui/tips";

export async function explain(fileArg: string) {
  const start = Date.now();
  const cwd = process.cwd();
  const resolved = path.join(cwd, fileArg);

  if (!fs.existsSync(resolved)) {
    console.error("File not found:", fileArg);
    process.exit(1);
  }

  if (fs.statSync(resolved).isDirectory()) {
    console.error("Path is a directory, not a file:", fileArg);
    process.exit(1);
  }

  const spinner = ora("🧠 Understanding repository...").start();

  const files = await scanProject();
  const info = analyzeProject(files);

  spinner.stop();
  printSessionHeader(info, files);

  console.log(chalk.gray(`📄 File: ${fileArg}\n`));
  console.log(chalk.gray("⚡ Analyzing file..."));

  let content: string;
  try {
    content = fs.readFileSync(resolved, "utf8");
  } catch {
    console.error("Could not read file:", fileArg);
    process.exit(1);
  }

  const prompt = buildContextForFile(fileArg, content, info);
  const provider = new GeminiProvider();
  const answer = await provider.askNoStream(prompt);

  renderAI("DevSense Explanation", formatSections(answer));
  process.stdout.write("\x07");
  showCommandSuggestions();
  console.log(chalk.gray(`\n⏱ ${((Date.now() - start) / 1000).toFixed(1)}s`));
}
