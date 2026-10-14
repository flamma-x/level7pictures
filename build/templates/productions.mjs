// /productions — Level 7's own titles (filterable) + Said El Marouk's work for other producers
import { PROJECTS, LEVEL7_ORDER, SAID_ON_PRODUCTIONS, statusOf, statusLabel, metaLine, SLOT_TEXT } from "../../data/projects.js";
import { workCard } from "./components.mjs";
import { layout } from "./layout.mjs";
import { esc, picture } from "../lib.mjs";

const NOW = Date.now();
/* Filter groups: "In production" covers everything not yet released (post-production today, shooting later) */
export const groupOf = (p, now = NOW) => (statusOf(p, now) === "streaming" ? "streaming" : "production");
const FILTERS = [["all", "All"], ["production", "In production"], ["streaming", "Streaming"]];

const card = (slug) => {
  const p = PROJECTS[slug];
  return `<a href="/productions/${slug}" class="pcard zoom" data-project="${slug}" data-group="${groupOf(p)}">
<div class="clip">
${picture(p.image.src, { alt: p.image.alt, sizes: "(max-width: 600px) 92vw, (max-width: 1060px) 46vw, 31vw", style: `object-position:${p.image.pos}` })}
<div class="pcard-scrim"></div>
</div>
<span class="pill pcard-pill" data-slot="status">${esc(statusLabel(p, NOW))}</span>
<div class="pcard-text">
<span lang="ar" dir="rtl" class="ar pcard-ar">${esc(p.titleAr)}</span>
<h2 class="un pcard-en">${esc(p.titleEn)}</h2>
<span class="muted pcard-meta">${esc(metaLine(p))}</span>
</div>
</a>`;
};

const saidCard = (slug) => {
  const p = PROJECTS[slug];
  const lineHtml = p.premiere ? `<span class="muted scard-meta" data-project="${slug}" data-slot="said-line">${esc(SLOT_TEXT["said-line"](p, statusOf(p, NOW)))}</span>` : null;
  return workCard({ slug, line: p.said.line, lineHtml, href: `/said-el-marouk#${p.said.anchor}` });
};

export default () => ({
  path: "productions.html",
  html: layout({
    page: "/productions",
    title: "Productions · Level 7 Pictures",
    description: "Series developed and produced by Level 7 Pictures for regional and global platforms.",
    body: `<section class="page-head">
<div class="wrap page-head-in">
<span class="kick">Productions · <span lang="ar" dir="rtl">الأعمال</span></span>
<h1 class="h1">Produced by Level 7</h1>
<p class="lead page-lead">Series developed and produced by Level 7 Pictures for regional and global platforms.</p>
</div>
</section>

<section aria-label="Filter" class="filter-sec" data-filter data-js-only>
<div class="wrap chips" role="group" aria-label="Filter by status">
${FILTERS.map(([k, l], i) => `<button type="button" class="btn btn-sm chip" data-filter-key="${k}" aria-pressed="${i === 0}">${l}</button>`).join("\n")}
</div>
<p class="sr-only" role="status" data-filter-status></p>
</section>

<section aria-label="Level 7 productions">
<div class="wrap g3" data-filter-list>
${LEVEL7_ORDER.map(card).join("\n")}
</div>
</section>

<section class="section" aria-labelledby="pd">
<div class="wrap">
<div class="sec-head">
<div><span class="kick">Directed by our founder</span><h2 id="pd" class="h2">Said El Marouk's other work</h2><p class="lead said-lead">Series Said directed for other producers. Shown here for context; the full list lives in his portfolio.</p></div>
<a href="/said-el-marouk" class="tlink">Said's portfolio →</a>
</div>
<div class="g4">
${SAID_ON_PRODUCTIONS.map(saidCard).join("\n")}
</div>
</div>
</section>`,
  }),
});
