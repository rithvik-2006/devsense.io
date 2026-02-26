import path from "path";
import fs from "fs";

export interface FlutterAnalysisResult {
  frameworks: string[];
  databases: string[];
  services: string[];
}

export function analyzeFlutterProject(): FlutterAnalysisResult {
  const pubspecPath = path.join(process.cwd(), "pubspec.yaml");

  if (!fs.existsSync(pubspecPath)) {
    return { frameworks: [], databases: [], services: [] };
  }

  const content = fs.readFileSync(pubspecPath, "utf8");

  const frameworks = ["Flutter"];
  const services: string[] = [];

  if (content.includes("firebase")) services.push("Firebase");
  if (content.includes("supabase")) services.push("Supabase");

  return {
    frameworks,
    databases: [],
    services
  };
}
