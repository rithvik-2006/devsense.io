import { GoogleGenerativeAI } from "@google/generative-ai";
import { LLMProvider } from "./provider";

export class GeminiProvider implements LLMProvider {
  name = "gemini";
  private modelInstance;

  constructor(model: string) {
    if (!model) {
      throw new Error("GeminiProvider requires a model");
    }
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY!
    );

    this.modelInstance = genAI.getGenerativeModel({ model });
  }

  models(): string[] {
    return [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
    ];
  }

  async ask(prompt: string): Promise<string> {
    const result = await this.modelInstance.generateContentStream(prompt);

    let output = "";

    for await (const chunk of result.stream) {
      const text = chunk.text();
      process.stdout.write(text);
      output += text;
    }

    console.log("\n");

    return output;
  }

  /** Returns full response without streaming (for pretty-printed output). */
  async askNoStream(prompt: string): Promise<string> {
    const result = await this.modelInstance.generateContent(prompt);
    return result.response.text();
  }
}
