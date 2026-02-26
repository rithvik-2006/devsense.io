import { ProjectInfo } from "../core/analyzer";
import { FileData } from "../core/scanner";

export function printSessionHeader(info: ProjectInfo, files: FileData[]): void {
  const frameworkLabel = info.frameworks.length ? info.frameworks[0] : "Project";
  console.log(
    `\nDevSense — ${frameworkLabel} | Language: ${info.language} | AI: Gemini Flash | Files: ${files.length}\n`
  );
}
