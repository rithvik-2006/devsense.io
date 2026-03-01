import fs from "fs";
import path from "path";
import inquirer from "inquirer";
import {
  getProviderChoices,
  getModels,
  getEnvKeyForProvider,
} from "../providers/registry";
import { showTip } from "../ui/tips";

const DEVSENSE_DIR = ".devsense";
const CONFIG_PATH = path.join(DEVSENSE_DIR, "config.json");
const ENV_PATH = path.join(DEVSENSE_DIR, ".env");

export async function initProject() {
  console.log("\nWelcome to DevSense 🚀\n");

  const { providerName } = await inquirer.prompt<{ providerName: string }>([
    {
      type: "list",
      name: "providerName",
      message: "Select AI Provider:",
      choices: getProviderChoices(),
    },
  ]);

  const { model } = await inquirer.prompt<{ model: string }>([
    {
      type: "list",
      name: "model",
      message: "Select Model:",
      choices: getModels(providerName),
    },
  ]);

  if (!fs.existsSync(DEVSENSE_DIR)) {
    fs.mkdirSync(DEVSENSE_DIR, { recursive: true });
  }

  fs.writeFileSync(
    CONFIG_PATH,
    JSON.stringify(
      {
        provider: providerName,
        model,
      },
      null,
      2
    )
  );

  const envKey = getEnvKeyForProvider(providerName);
  const envContent = envKey ? `${envKey}=\n` : "";
  fs.writeFileSync(ENV_PATH, envContent);

  console.log("\n✔ DevSense initialized successfully");

  if (envKey) {
    console.log(`\nAdd ${envKey} to .devsense/.env`);
  }

  showTip();
}
