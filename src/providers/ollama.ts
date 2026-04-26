import ollama from "ollama";
import { LLMProvider } from "./provider";

export class OllamaProvider implements LLMProvider {
  name = "ollama";
  model: string;
  isLocal = true;

  constructor(model: string) {
    this.model = model;
  }

  async ask(prompt: string): Promise<string> {
    const stream = await ollama.chat({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    let output = "";
    for await (const chunk of stream) {
      const text = chunk.message.content;
      process.stdout.write(text);
      output += text;
    }
    
    console.log("\n");
    return output;
  }

  async askNoStream(prompt: string): Promise<string> {
    return this.ask(prompt);
  }

  // Use any to avoid strict AsyncGenerator matching issues if LLMProvider stream wants Promise<void>
  // However, current stream is: stream?(prompt: string): Promise<void>;
  // We'll adapt it to output the stream directly via console.log or similar if needed, 
  // or return the generator if we change the type. Let's stick to the current implementation.
  // Actually, wait, let me look at `gemini.ts` to see how `stream` is implemented.
  async stream(prompt: string): Promise<void> {
    const stream = await ollama.chat({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
      stream: true,
    });

    for await (const chunk of stream) {
      process.stdout.write(chunk.message.content);
    }
  }

  async models(): Promise<string[]> {
    try {
      const res = await ollama.list();
      return res.models.map((m) => m.name);
    } catch (e) {
      return [];
    }
  }
}
