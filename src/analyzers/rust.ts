import path from "path";
import fs from "fs";

export interface RustAnalysisResult {
  frameworks: string[];
  databases: string[];
  services: string[];
}

export function analyzeRustProject(): RustAnalysisResult {
  const cargoPath = path.join(process.cwd(), "Cargo.toml");

  if (!fs.existsSync(cargoPath)) {
    return { frameworks: [], databases: [], services: [] };
  }

  const content = fs.readFileSync(cargoPath, "utf8");
  const frameworks: string[] = [];

  if (content.includes("actix-web")) frameworks.push("Actix");
  if (content.includes("rocket")) frameworks.push("Rocket");

  return {
    frameworks,
    databases: [],
    services: []
  };
}
