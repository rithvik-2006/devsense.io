import { ProjectInfo } from "../core/analyzer";
import { FileData } from "../core/scanner";
import { PROVIDERS } from "../providers/registry";

export function printSessionHeader(info: ProjectInfo, files: FileData[],config: {provider: string, model: string}, isLocal: boolean = false): void {
  const frameworkLabel = info.frameworks.length
  ? info.frameworks[0]
  : "Project";

const providerMeta = PROVIDERS[config.provider];
const providerLabel = providerMeta?.label ?? config.provider;
const localityLabel = isLocal ? "Local" : "Cloud";

console.log(
  `\nDevSense — ${frameworkLabel} | Language: ${
    info.language
  } | AI: ${providerLabel} (${config.model}) | ${localityLabel} | Files: ${
    files.length
  }\n`
);

}
