export interface LLMProvider {
  ask(prompt: string): Promise<string>;
}
