import { FileData } from "./scanner";
import { ProjectInfo } from "./analyzer";

export function buildContext(
  files: FileData[],
  info: ProjectInfo,
  question: string
): string {
  const snippets = files.slice(0, 25).map(
    (f) => `
File: ${f.path}
${f.content.slice(0, 500)}
`
  );

  return `
You are DevSense, an AI developer assistant.

Project Stack:
Language: ${info.language}
Frameworks: ${info.frameworks.join(", ") || "None"}
Databases: ${info.databases.join(", ") || "None"}

Code Snippets:
${snippets.join("\n")}

Answer the question clearly for a developer.

Question:
${question}
`;
}

export function buildContextForFile(
  filePath: string,
  content: string,
  info: ProjectInfo
): string {
  const snippet = content.slice(0, 8000);

  return `
You are DevSense, an AI developer assistant.

Project Stack:
Language: ${info.language}
Frameworks: ${info.frameworks.join(", ") || "None"}
Databases: ${info.databases.join(", ") || "None"}

File to explain: ${filePath}

\`\`\`
${snippet}
\`\`\`

Explain this file using sections:

SUMMARY:
ROLE:
KEY FUNCTIONS:
ARCHITECTURE NOTES:

Keep concise and structured. Use bullet points where helpful.
`;
}
