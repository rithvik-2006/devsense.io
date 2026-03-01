import ora from "ora";
import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";
import { buildContext } from "../core/contextBuilder";
import { loadConfig } from "../core/config";
import { getProvider } from "../providers/registry";
import { showCommandSuggestions } from "../ui/tips";
import { badge } from "../ui/badge";
import { printSessionHeader } from "../ui/header";

export async function ask(question: string) {
  let config;
  try {
    config = loadConfig();
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }

  const spinner = ora("🧠 Understanding repository...").start();

  const files = await scanProject();
  const info = analyzeProject(files);

  spinner.stop();
  printSessionHeader(info, files);

  const prompt = buildContext(files, info, question);

  const provider = getProvider(config.provider, config.model);
  console.log("\n" + badge("AI") + " DevSense:\n");
  //await provider.ask(prompt);
  const result = await provider.ask(prompt);
  if (result && result.length > 0){
    console.log(result);
  }
  process.stdout.write("\x07");
  showCommandSuggestions();
}
