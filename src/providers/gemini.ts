import { GoogleGenerativeAI } from "@google/generative-ai";
import { LLMProvider } from "./provider";

export class GeminiProvider implements LLMProvider {
  private model;

  constructor() {
    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY!
    );

    this.model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });
  }

  async ask(prompt: string): Promise<string> {
    const result = await this.model.generateContentStream(prompt);

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
    const result = await this.model.generateContent(prompt);
    return result.response.text();
  }
}
