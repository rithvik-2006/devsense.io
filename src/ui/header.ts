import { ProjectInfo } from "../core/analyzer";
import { FileData } from "../core/scanner";
import { PROVIDERS } from "../providers/registry";

export function printSessionHeader(info: ProjectInfo, files: FileData[],config: {provider: string, model: string}): void {
  // const frameworkLabel = info.frameworks.length ? info.frameworks[0] : "Project";
  // console.log(
  //   `\nDevSense — ${frameworkLabel} | Language: ${info.language} | AI: Gemini Flash | Files: ${files.length}\n`
  // );
  const frameworkLabel = info.frameworks.length
  ? info.frameworks[0]
  : "Project";

const providerMeta = PROVIDERS[config.provider];
const providerLabel = providerMeta?.label ?? config.provider;

console.log(
  `\nDevSense — ${frameworkLabel} | Language: ${
    info.language
  } | AI: ${providerLabel} (${config.model}) | Files: ${
    files.length
  }\n`
);

}
