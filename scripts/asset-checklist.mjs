// Generates Docs/asset-checklist.md from src/content/media.js (the media registry).
// Run: npm run assets:checklist
import { writeFileSync } from "node:fs";
import { media } from "../src/content/media.js";

const rows = Object.values(media);
const byPage = new Map();
for (const m of rows) {
  if (!byPage.has(m.page)) byPage.set(m.page, []);
  byPage.get(m.page).push(m);
}
const done = rows.filter((m) => m.status === "final").length;

let md = `# Asset checklist (image and video slots)

_Generated from \`src/content/media.js\` by \`npm run assets:checklist\`. Do not edit by hand._

- **${rows.length} slots** · ${done} final · ${rows.length - done} placeholder
- Placeholders render as branded frames labelled "PLACEHOLDER". No stock or AI images are used.
- To fill a slot, add the file under \`public/media/\` and set \`src\`, \`alt\` and \`status: "final"\` for its id in \`src/content/media.js\`.
- Project slots (marked ★) also need **client permission** to show the work.

`;
for (const [page, list] of byPage) {
  md += `\n## ${page}\n\n| Slot id | Section | Type | Aspect | Subject | Status |\n|---|---|---|---|---|---|\n`;
  for (const m of list) {
    md += `| \`${m.id}\`${m.project ? " ★" : ""} | ${m.section} | ${m.type} | ${m.ratio.replace("/", ":")} | ${m.subject}${m.note ? `. ${m.note}` : ""} | ${m.status === "final" ? "✅ final" : "⬜ placeholder"} |\n`;
  }
}
writeFileSync(new URL("../Docs/asset-checklist.md", import.meta.url), md);
console.log(`Docs/asset-checklist.md: ${rows.length} slots (${rows.length - done} placeholder)`);
