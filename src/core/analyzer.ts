import path from "path";
import fs from "fs";
import { FileData } from "./scanner";
import { analyzeNodeProject } from "../analyzers/node";
import { analyzeFlutterProject } from "../analyzers/flutter";
import { analyzePythonProject } from "../analyzers/python";
import { analyzeRustProject } from "../analyzers/rust";

export interface ProjectInfo {
  language: string;
  frameworks: string[];
  databases: string[];
  services: string[];
  fileCount: number;
}

function detectEcosystem(): string[] {
  const cwd = process.cwd();
  const ecosystems: string[] = [];

  if (fs.existsSync(path.join(cwd, "package.json"))) ecosystems.push("node");
  if (fs.existsSync(path.join(cwd, "pubspec.yaml"))) ecosystems.push("flutter");
  if (
    fs.existsSync(path.join(cwd, "requirements.txt")) ||
    fs.existsSync(path.join(cwd, "pyproject.toml"))
  ) {
    ecosystems.push("python");
  }
  if (fs.existsSync(path.join(cwd, "Cargo.toml"))) ecosystems.push("rust");
  if (fs.existsSync(path.join(cwd, "go.mod"))) ecosystems.push("go");
  if (
    fs.existsSync(path.join(cwd, "pom.xml")) ||
    fs.existsSync(path.join(cwd, "build.gradle"))
  ) {
    ecosystems.push("java");
  }

  return ecosystems;
}

function detectLanguage(files: FileData[]): string {
  const cwd = process.cwd();

  // Strong signals: project markers > file count
  if (fs.existsSync(path.join(cwd, "pubspec.yaml"))) return "Dart";
  if (fs.existsSync(path.join(cwd, "requirements.txt"))) return "Python";
  if (fs.existsSync(path.join(cwd, "Cargo.toml"))) return "Rust";
  if (fs.existsSync(path.join(cwd, "go.mod"))) return "Go";

  const counts: Record<string, number> = {};

  for (const file of files) {
    const ext = path.extname(file.path);
    counts[ext] = (counts[ext] || 0) + 1;
  }

  const map: Record<string, string> = {
    ".ts": "TypeScript",
    ".tsx": "TypeScript",
    ".js": "JavaScript",
    ".py": "Python",
    ".cpp": "C++",
    ".java": "Java",
    ".go": "Go",
    ".rs": "Rust",
    ".dart": "Dart"
  };

  let max = 0;
  let detected = "Unknown";

  for (const ext in counts) {
    if (counts[ext] > max && map[ext]) {
      max = counts[ext];
      detected = map[ext];
    }
  }

  return detected;
}

export function analyzeProject(files: FileData[]): ProjectInfo {
  const ecosystems = detectEcosystem();

  let frameworks: string[] = [];
  let databases: string[] = [];
  let services: string[] = [];

  if (ecosystems.includes("node")) {
    const res = analyzeNodeProject();
    frameworks.push(...res.frameworks);
    databases.push(...res.databases);
    services.push(...res.services);
  }

  if (ecosystems.includes("flutter")) {
    const res = analyzeFlutterProject();
    frameworks.push(...res.frameworks);
    services.push(...res.services);
  }

  if (ecosystems.includes("python")) {
    const res = analyzePythonProject();
    frameworks.push(...res.frameworks);
  }

  if (ecosystems.includes("rust")) {
    const res = analyzeRustProject();
    frameworks.push(...res.frameworks);
  }

  return {
    language: detectLanguage(files),
    frameworks: [...new Set(frameworks)],
    databases: [...new Set(databases)],
    services: [...new Set(services)],
    fileCount: files.length
  };
}
