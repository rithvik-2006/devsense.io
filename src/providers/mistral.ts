import { Mistral } from "@mistralai/mistralai";
import { LLMProvider } from "./provider";

export class MistralProvider implements LLMProvider {
  name = "mistral";
  private client: Mistral;
  private model: string;

  constructor(model: string) {
    this.model = model;
    this.client = new Mistral({
      apiKey: process.env.MISTRAL_API_KEY ?? "",
    });
  }

  models(): string[] {
    return [
      "mistral-small-latest",
      "mistral-medium-latest",
      "open-mixtral-8x7b",
    ];
  }

  async ask(prompt: string): Promise<string> {
    const res = await this.client.chat.complete({
      model: this.model,
      messages: [{ role: "user", content: prompt }],
    });
    //console.log("MISTRAL RESPONSE" , JSON.stringify(res,null,2));
    const raw = res.choices?.[0]?.message?.content;
    if (raw == null) return "";
    if (typeof raw === "string") return raw;
    return (raw as Array<{ type?: string; text?: string }>)
      .map((c) => (c.type === "text" && c.text != null ? c.text : ""))
      .join("");
  }

  async askNoStream(prompt: string): Promise<string> {
    return this.ask(prompt);
  }
}
