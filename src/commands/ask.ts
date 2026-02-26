import ora from "ora";
import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";
import { buildContext } from "../core/contextBuilder";
import { GeminiProvider } from "../providers/gemini";
import { showCommandSuggestions } from "../ui/tips";
import { badge } from "../ui/badge";
import { printSessionHeader } from "../ui/header";

export async function ask(question: string) {
  const spinner = ora("🧠 Understanding repository...").start();

  const files = await scanProject();
  const info = analyzeProject(files);

  spinner.stop();
  printSessionHeader(info, files);

  const prompt = buildContext(files, info, question);

  const provider = new GeminiProvider();
  console.log("\n" + badge("AI") + " DevSense:\n");
  await provider.ask(prompt);

  process.stdout.write("\x07");
  showCommandSuggestions();
}
