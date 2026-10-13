// Static site build
//   node build/build.mjs                 build with the saved flags (build/config.json)
//   node build/build.mjs --prune         launch cut-off: remove every [placeholder] and pending item, and keep it that way
//   node build/build.mjs --no-prune      show placeholders again
//   node build/build.mjs --forms / --no-forms   switch the Careers + Contact forms on / off (saved)
//   node build/build.mjs --preview --prune --out ../preview   render a variant into another folder; repo and flags untouched
// Renders every route from data/ + build/templates into plain HTML at the repo root (committed; Vercel serves it
// as-is with cleanUrls), writes sitemap.xml, and lists everything that must be resolved before main:
// visible [placeholders] and copy marked pending() in the data.
import fs from "fs";
import path from "path";
import { ROOT as REPO, FLAGS } from "./lib.mjs";
import { saveFlags } from "./flags.mjs";

const args = process.argv.slice(2);
const preview = args.includes("--preview");
for (const f of ["prune", "forms"]) { if (args.includes(`--${f}`)) FLAGS[f] = true; if (args.includes(`--no-${f}`)) FLAGS[f] = false; }
const outArg = args.indexOf("--out");
const ROOT = preview ? path.resolve(outArg > -1 ? args[outArg + 1] : "../preview") : REPO;
if (!preview && args.some((a) => /^--(no-)?(prune|forms)$/.test(a))) saveFlags();
import { SITE, PROJECTS } from "../data/projects.js";
import home from "./templates/home.mjs";
import productions from "./templates/productions.mjs";
import titles from "./templates/title.mjs";
import about from "./templates/about.mjs";
import said from "./templates/said.mjs";
import services from "./templates/services.mjs";
import news from "./templates/news.mjs";
import careers from "./templates/careers.mjs";
import contact from "./templates/contact.mjs";
import { SERVICES } from "../data/services.js";
import { SAID } from "../data/said.js";
import { COMPANY } from "../data/company.js";

const pages = [home(), productions(), ...titles(), about(), said(), services(), news(), careers(), contact()];

const blockers = [];
for (const { path: rel, html } of pages) {
  const out = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  const text = html.replace(/<(script|style)[\s\S]*?<\/\1>/g, "").replace(/<[^>]+>/g, " ");
  for (const m of text.matchAll(/\[[^\]\n]{1,400}\]/g)) blockers.push(`${rel}: ${m[0].replace(/\s+/g, " ")}`); // any length: long placeholders count too
}
// copy shown on the site but not yet signed off
const walk = (v, at) => {
  if (v && typeof v === "object") {
    if (v.pending) { if (!FLAGS.prune) blockers.push(`data ${at}: [pending approval] "${v.text}"`); } // pruned items are not on the site
    else for (const [k, x] of Object.entries(v)) walk(x, `${at}.${k}`);
  }
};
for (const [slug, p] of Object.entries(PROJECTS)) walk(p, slug);
walk(SAID, "said"); walk(COMPANY, "company"); walk(SERVICES, "services");

// sitemap from the routes actually built
const route = (rel) => "/" + rel.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${SITE.url}${route(p.path).replace(/\/$/, "") || "/"}</loc></url>`).join("\n")}
</urlset>
`);

const uniq = [...new Set(blockers)];
console.log(`built ${pages.length} page(s) into ${preview ? ROOT : "the repo"} · prune ${FLAGS.prune ? "ON" : "off"} · forms ${FLAGS.forms ? "ON" : "off"}: ${pages.map((p) => route(p.path)).join(", ")}`);
console.log(uniq.length ? `main is blocked until these are resolved (${uniq.length}):\n  ${uniq.join("\n  ")}` : "nothing blocking main");
if (!preview) fs.writeFileSync(path.join(ROOT, "build/placeholders.txt"), uniq.join("\n") + (uniq.length ? "\n" : ""));
