import fs from "fs";
import path from "path";

export interface DevSenseConfig {
  provider: string;
  model: string;
}

const CONFIG_PATH = path.join(process.cwd(), ".devsense", "config.json");

export function loadConfig(): DevSenseConfig {
  if (!fs.existsSync(CONFIG_PATH)) {
    throw new Error(
      "DevSense is not initialized. Run `devsense init` first."
    );
  }

  const raw = fs.readFileSync(CONFIG_PATH, "utf8");

  try {
    const config = JSON.parse(raw) as DevSenseConfig;
    if (!config.provider || !config.model) {
      throw new Error("Invalid config: missing provider or model.");
    }
    return config;
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Error(
        "Invalid .devsense/config.json. Run `devsense init` to recreate it."
      );
    }
    throw e;
  }
}
