import { LLMProvider } from "./provider";
import { GeminiProvider } from "./gemini";
import { MistralProvider } from "./mistral";

type ProviderConstructor = new (model: string) => LLMProvider;

interface ProviderMeta {
  label: string;
  models: string[];
  envKey: string;
  create: ProviderConstructor;
}

/**
 * 🔥 Single source of truth
 */
export const PROVIDERS: Record<string, ProviderMeta> = {
  gemini: {
    label: "Gemini (Google)",
    models: [
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-1.5-pro",
      "gemini-1.5-flash",
    ],
    envKey: "GEMINI_API_KEY",
    create: GeminiProvider,
  },

  mistral: {
    label: "Mistral",
    models: [
      "mistral-small-latest",
      "mistral-medium-latest",
      "open-mixtral-8x7b",
    ],
    envKey: "MISTRAL_API_KEY",
    create: MistralProvider,
  },
};

export function getProvider(name: string, model: string): LLMProvider {
  const meta = PROVIDERS[name];

  if (!meta) {
    throw new Error(`Unknown provider: ${name}`);
  }

  return new meta.create(model);
}

export function getProviderChoices() {
  return Object.entries(PROVIDERS).map(([id, meta]) => ({
    value: id,
    name: meta.label,
  }));
}

export function getModels(providerId: string): string[] {
  const meta = PROVIDERS[providerId];

  if (!meta) {
    throw new Error(`Unknown provider: ${providerId}`);
  }

  return meta.models;
}

export function getEnvKeyForProvider(providerId: string): string | undefined {
  return PROVIDERS[providerId]?.envKey;
}
