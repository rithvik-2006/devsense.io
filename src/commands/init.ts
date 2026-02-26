import fs from "fs";
import path from "path";
import { showTip } from "../ui/tips";

export function initProject() {
  const dir = ".devsense";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.writeFileSync(
    path.join(dir, "config.json"),
    JSON.stringify(
      {
        provider: "openai",
        model: "gpt-4o-mini"
      },
      null,
      2
    )
  );

  fs.writeFileSync(path.join(dir, ".env"), "");

  console.log("✅ DevSense initialized");
  showTip();
}