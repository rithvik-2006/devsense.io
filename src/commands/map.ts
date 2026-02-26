import { getProjectMap } from "../core/mapper";

export async function map() {
  const entries = getProjectMap();

  if (entries.length === 0) {
    console.log("No mapped directories found.");
    return;
  }

  const maxLabel = Math.max(...entries.map((e) => e.label.length), 8);
  for (const { label, path: p } of entries) {
    console.log(`${label.padEnd(maxLabel)} → ${p}`);
  }
}
