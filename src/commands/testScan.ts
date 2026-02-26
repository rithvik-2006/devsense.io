import { scanProject } from "../core/scanner";

export async function testScan() {
  const files = await scanProject();

  console.log(`Scanned ${files.length} files`);
}