import prompts from "prompts";
import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";
import { buildContext } from "../core/contextBuilder";
import { GeminiProvider } from "../providers/gemini";
import { printSessionHeader } from "../ui/header";
import { badge } from "../ui/badge";
import { showCommandSuggestions } from "../ui/tips";

export async function chat() {
  const files = await scanProject();
  const info = analyzeProject(files);

  printSessionHeader(info, files);
  console.log("DevSense Chat\n");

  const provider = new GeminiProvider();

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
