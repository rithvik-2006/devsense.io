import path from "path";
import fs from "fs";

export interface PythonAnalysisResult {
  frameworks: string[];
  databases: string[];
  services: string[];
}

export function analyzePythonProject(): PythonAnalysisResult {
  const cwd = process.cwd();
  const frameworks: string[] = [];

  const reqPath = path.join(cwd, "requirements.txt");
  const pyprojectPath = path.join(cwd, "pyproject.toml");

  let content = "";

  if (fs.existsSync(reqPath)) {
    content += fs.readFileSync(reqPath, "utf8");
  }
  if (fs.existsSync(pyprojectPath)) {
    content += fs.readFileSync(pyprojectPath, "utf8");
  }

  if (content.includes("django")) frameworks.push("Django");
  if (content.includes("fastapi")) frameworks.push("FastAPI");
  if (content.includes("flask")) frameworks.push("Flask");

  return {
    frameworks,
    databases: [],
    services: []
  };
}
