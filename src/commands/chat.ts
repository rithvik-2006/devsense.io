import prompts from "prompts";
import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";
import { buildContext } from "../core/contextBuilder";
import { loadConfig } from "../core/config";
import { getProvider } from "../providers/registry";
import { printSessionHeader } from "../ui/header";
import { badge } from "../ui/badge";
import { showCommandSuggestions } from "../ui/tips";

export async function chat() {
  let config;
  try {
    config = loadConfig();
  } catch (e) {
    console.error((e as Error).message);
    process.exit(1);
  }

  const files = await scanProject();
  const info = analyzeProject(files);

  printSessionHeader(info, files);
  console.log("DevSense Chat\n");

  const provider = getProvider(config.provider, config.model);

  while (true) {
    const response = await prompts(
      {
        type: "text",
        name: "question",
        message: ">"
      },
      { onCancel: () => process.exit(0) }
    );

    const question = (response as { question?: string }).question;

    if (question === undefined || question === null) break;
    if (String(question).trim() === "") break;

    const prompt = buildContext(files, info, String(question).trim());
    console.log("\n" + badge("AI") + " DevSense:\n");
    await provider.ask(prompt);
    process.stdout.write("\x07");
  }

  showCommandSuggestions();
}
