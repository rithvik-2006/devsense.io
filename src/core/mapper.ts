import fs from "fs";
import path from "path";

export interface MapEntry {
  label: string;
  path: string;
}

const PATH_LABELS: Array<{ pattern: string | RegExp; label: string }> = [
  { pattern: "auth", label: "Auth" },
  { pattern: "api", label: "API" },
  { pattern: "components", label: "UI" },
  { pattern: "prisma", label: "Database" },
  { pattern: /^lib$/, label: "Lib" },
  { pattern: "utils", label: "Utils" },
  { pattern: "hooks", label: "Hooks" },
  { pattern: "styles", label: "Styles" }
];

function findDirs(dir: string, base = ""): string[] {
  const entries: string[] = [];
  const fullPath = path.join(dir, base);

  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isDirectory()) {
    return entries;
  }

  const rel = base || ".";
  entries.push(rel);

  try {
    const names = fs.readdirSync(fullPath);
    for (const name of names) {
      const childRel = base ? `${base}/${name}` : name;
      const childFull = path.join(dir, childRel);
      if (fs.statSync(childFull).isDirectory()) {
        if (
          !name.startsWith(".") &&
          name !== "node_modules" &&
          name !== "dist" &&
          name !== "build"
        ) {
          entries.push(...findDirs(dir, childRel));
        }
      }
    }
  } catch {
    // ignore
  }

  return entries;
}

function matchLabel(dirPath: string): string | null {
  const name = path.basename(dirPath).toLowerCase();
  const full = dirPath.toLowerCase();

  for (const { pattern, label } of PATH_LABELS) {
    if (typeof pattern === "string") {
      if (name.includes(pattern) || full.includes(pattern)) return label;
    } else {
      if (pattern.test(name) || pattern.test(dirPath)) return label;
    }
  }
  return null;
}

export function getProjectMap(): MapEntry[] {
  const cwd = process.cwd();
  const dirs = findDirs(cwd);
  const seen = new Set<string>();
  const entries: MapEntry[] = [];

  for (const dir of dirs) {
    const label = matchLabel(dir);
    if (label && !seen.has(label)) {
      seen.add(label);
      entries.push({ label, path: dir });
    }
  }

  return entries.sort((a, b) => a.label.localeCompare(b.label));
}
