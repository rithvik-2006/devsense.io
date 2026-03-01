export interface LLMProvider {
  name: string;

  ask(prompt: string): Promise<string>;

  askNoStream?(prompt: string): Promise<string>;

  stream?(prompt: string): Promise<void>;

  models(): string[];
}
