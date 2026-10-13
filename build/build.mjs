// Static site build: node build/build.mjs
// Renders every route from data/projects.js + build/templates into plain HTML at the repo root
// (committed; Vercel serves it as-is with cleanUrls). Lists every [placeholder] still on the site.
import fs from "fs";
import path from "path";
import { ROOT } from "./lib.mjs";
import home from "./templates/home.mjs";

const pages = [home()];

const placeholders = [];
for (const { path: rel, html } of pages) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ");
  for (const m of text.matchAll(/\[[^\]\n]{1,80}\]/g)) placeholders.push(`${rel}: ${m[0]}`);
}
const uniq = [...new Set(placeholders)];
console.log(`built ${pages.length} page(s): ${pages.map((p) => p.path).join(", ")}`);
console.log(uniq.length ? `placeholders still visible (${uniq.length}) — main is blocked until these are filled:\n  ${uniq.join("\n  ")}` : "no placeholders");
fs.writeFileSync(path.join(ROOT, "build/placeholders.txt"), uniq.join("\n") + (uniq.length ? "\n" : ""));
