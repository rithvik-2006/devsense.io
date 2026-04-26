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
  const provider = getProvider(config.provider, config.model);
  printSessionHeader(info, files, config, provider.isLocal);

  const prompt = buildContext(files, info, question);

  console.log("\n" + badge("AI") + " DevSense:\n");
  
  try {
    const result = await provider.ask(prompt);
    if (result && result.length > 0){
      console.log(result);
    }
  } catch (e: any) {
    if (config.provider === "ollama") {
      console.log(`\n❌ Selected Ollama model '${config.model}' not found or Ollama is not running.`);
      console.log(`💡 Run \`ollama pull ${config.model}\` to download it, or ensure the Ollama app is open.`);
    } else {
      console.error(`\n❌ Error: ${e.message}`);
    }
  }

  process.stdout.write("\x07");
  showCommandSuggestions();
}
