import fs from "fs";
import path from "path";
import { glob } from "glob";
import ignore from "ignore";

export interface FileData {
  path: string;
  content: string;
}

export async function scanProject(): Promise<FileData[]> {
  const root = process.cwd();

  // Load .gitignore rules
  const ig = ignore();

  const gitignorePath = path.join(root, ".gitignore");

  if (fs.existsSync(gitignorePath)) {
    const gitignore = fs.readFileSync(gitignorePath, "utf8");
    ig.add(gitignore);
  }

  // Find all files
  const files = await glob("**/*", {
    cwd: root,
    nodir: true,
    dot: false
  });

  const results: FileData[] = [];

  for (const file of files) {
    // Skip ignored files
    if (ig.ignores(file)) continue;

    // Skip heavy folders manually
    if (
      file.includes("node_modules") ||
      file.includes(".git") ||
      file.includes("dist") ||
      file.includes("build")
    ) continue;
    if (results.length > 300) break;
    try {
      const fullPath = path.join(root, file);

      const content = fs.readFileSync(fullPath, "utf8");

      results.push({
        path: file,
        content
      });
    } catch {
      // Ignore binary/unreadable files
    }
  }

  return results;
}