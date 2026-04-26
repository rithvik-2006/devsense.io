import { LLMProvider } from "./provider";
import { GeminiProvider } from "./gemini";
import { MistralProvider } from "./mistral";
import { OllamaProvider } from "./ollama";

type ProviderConstructor = new (model: string) => LLMProvider;

interface ProviderMeta {
  label: string;
  models: string[] | (() => Promise<string[]>);
  envKey: string | null;
  create: ProviderConstructor | ((model: string) => LLMProvider);
}

export const PROVIDERS: Record<string, ProviderMeta> = {
  gemini: {
    label: "Gemini (Google)",
    models: ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-pro", "gemini-1.5-flash"],
    envKey: "GEMINI_API_KEY",
    create: GeminiProvider,
  },
  mistral: {
    label: "Mistral",
    models: ["mistral-small-latest", "mistral-medium-latest", "open-mixtral-8x7b"],
    envKey: "MISTRAL_API_KEY",
    create: MistralProvider,
  },
  ollama: {
    label: "Ollama (Local)",  // ← was `name`, should be `label`
    envKey: null,
    models: async () => {
      const provider = new OllamaProvider("");
      return await provider.models();
    },
    create: (model: string) => new OllamaProvider(model),
  },
};

export function getProvider(name: string, model: string): LLMProvider {
  const meta = PROVIDERS[name];
  if (!meta) throw new Error(`Unknown provider: ${name}`);

  // Works for both `new Class(model)` and plain factory `(model) => instance`
  return meta.create instanceof Function && meta.create.prototype
    ? new (meta.create as ProviderConstructor)(model)
    : (meta.create as (model: string) => LLMProvider)(model);
}

export function getProviderChoices() {
  return Object.entries(PROVIDERS).map(([id, meta]) => ({
    name: meta.label,
    value: id,
  }));
}

export async function getModels(providerId: string): Promise<string[]> {
  const meta = PROVIDERS[providerId];
  if (!meta) throw new Error(`Unknown provider: ${providerId}`);

  return typeof meta.models === "function" ? await meta.models() : meta.models;
}

export function getEnvKeyForProvider(providerId: string): string | null | undefined {
  return PROVIDERS[providerId]?.envKey;
}