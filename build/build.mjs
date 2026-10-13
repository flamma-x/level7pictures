// Static site build: node build/build.mjs
// Renders every route from data/ + build/templates into plain HTML at the repo root (committed; Vercel serves it
// as-is with cleanUrls), writes sitemap.xml, and lists everything that must be resolved before main:
// visible [placeholders] and copy marked pending() in the data.
import fs from "fs";
import path from "path";
import { ROOT } from "./lib.mjs";
import { SITE, PROJECTS } from "../data/projects.js";
import home from "./templates/home.mjs";
import productions from "./templates/productions.mjs";
import titles from "./templates/title.mjs";
import about from "./templates/about.mjs";
import said from "./templates/said.mjs";
import { SAID } from "../data/said.js";
import { COMPANY } from "../data/company.js";

const pages = [home(), productions(), ...titles(), about(), said()];

const blockers = [];
for (const { path: rel, html } of pages) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ");
  for (const m of text.matchAll(/\[[^\]\n]{1,80}\]/g)) blockers.push(`${rel}: ${m[0]}`);
}
// copy shown on the site but not yet signed off
const walk = (v, at) => {
  if (v && typeof v === "object") {
    if (v.pending) blockers.push(`data ${at}: [pending approval] "${v.text}"`);
    else for (const [k, x] of Object.entries(v)) walk(x, `${at}.${k}`);
  }
};
for (const [slug, p] of Object.entries(PROJECTS)) walk(p, slug);
walk(SAID, "said"); walk(COMPANY, "company");

// sitemap from the routes actually built
const route = (rel) => "/" + rel.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE.url}${route(p.path).replace(/\/$/, "") || "/"}</loc></url>`).join("\n")}
</urlset>
`);

const uniq = [...new Set(blockers)];
console.log(`built ${pages.length} page(s): ${pages.map((p) => route(p.path)).join(", ")}`);
console.log(uniq.length ? `main is blocked until these are resolved (${uniq.length}):\n  ${uniq.join("\n  ")}` : "nothing blocking main");
fs.writeFileSync(path.join(ROOT, "build/placeholders.txt"), uniq.join("\n") + (uniq.length ? "\n" : ""));
