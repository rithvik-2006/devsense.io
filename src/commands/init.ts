import fs from "fs";
import path from "path";
import { select } from "@inquirer/prompts"
import figlet from "figlet";
import gradient from "gradient-string";
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
  const title = figlet.textSync("DevSense", { horizontalLayout: "full" });
  console.log("\n" + gradient.pastel.multiline(title) + "\n");

  const provider = await select({
    message: "Select AI Provider",
    choices: getProviderChoices(),
  });

  const models = await getModels(provider);

  const model = await select({
    message: "Select Model",
    choices: models.map((m: string) => ({
      name: m,
      value: m,
    })),
  });
  if (!fs.existsSync(DEVSENSE_DIR)) {
    fs.mkdirSync(DEVSENSE_DIR, { recursive: true });
  }

  fs.writeFileSync(
    CONFIG_PATH,
    JSON.stringify(
      {
        provider,
        model,
      },
      null,
      2
    )
  );

  const envKey = getEnvKeyForProvider(provider);
  const envContent = envKey ? `${envKey}=\n` : "";
  fs.writeFileSync(ENV_PATH, envContent);

  console.log("\n✔ DevSense initialized successfully");

  if (envKey) {
    console.log(`\nAdd ${envKey} to .devsense/.env`);
  }

  showTip();
}
