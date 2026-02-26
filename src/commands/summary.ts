import { scanProject } from "../core/scanner";
import { analyzeProject } from "../core/analyzer";
import { showTip } from "../ui/tips";

export async function summary() {
  console.log("🔍 Scanning project...\n");

  const files = await scanProject();
  const info = analyzeProject(files);

  console.log(`
Project Summary
---------------
Language   : ${info.language}
Frameworks : ${info.frameworks.length ? info.frameworks.join(", ") : "Unknown"}
Databases  : ${info.databases.length ? info.databases.join(", ") : "Unknown"}
Services   : ${info.services.length ? info.services.join(", ") : "None detected"}
Files      : ${info.fileCount}
`);
  showTip();
}
