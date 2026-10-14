// /news — News & Press
import { SITE, PROJECTS, LEVEL7_ORDER } from "../../data/projects.js";
import { NEWS } from "../../data/news.js";
import { layout } from "./layout.mjs";
import { secTitle } from "./components.mjs";
import { esc, picture } from "../lib.mjs";

/* Source link: direct URL, or the linked title's `link` from projects.js; hidden while there is none */
const source = (s) => {
  const url = s.url || (s.project && PROJECTS[s.project].link);
  if (!url) return "";
  return `<a href="${esc(url)}" class="tlink" target="_blank" rel="noopener"${s.lang ? ` hreflang="${s.lang}"` : ""}>Source: ${esc(s.name)} ↗<span class="sr-only"> (opens in a new tab${s.lang === "ar" ? ", article in Arabic" : ""})</span></a>`;
};

const item = (n, i) => `<article id="${n.id}" class="surface split news-item zoom" aria-labelledby="${n.id}-title">
<div class="news-item-img"><div class="clip">${picture(n.image.src, { sizes: "(max-width: 820px) 88vw, 44vw", lazy: i > 0, style: `object-position:${n.image.pos}` })}</div></div>
<div class="news-item-text">
<span class="kick news-date">${esc(n.date)}</span>
<h2 id="${n.id}-title" class="h3 news-item-title">${esc(n.title)}</h2>
${source(n.source)}
</div>
</article>`;

/* Press kit card: links to the title page; the download button appears once a ZIP is set in projects.js */
const kit = (slug) => {
  const p = PROJECTS[slug];
  return `<div class="surface pk">
<div class="pk-img"><div class="clip">${picture(p.image.src, { sizes: "(max-width: 600px) 92vw, (max-width: 1060px) 46vw, 31vw", style: `object-position:${p.image.pos}` })}</div></div>
<div class="pk-body">
<div class="scard-title"><h3 class="un pk-name"><a href="/productions/${slug}" class="pk-link">${esc(p.titleEn)}</a></h3><span lang="ar" dir="rtl" class="ar scard-ar">${esc(p.titleAr)}</span></div>
${p.pressKit ? `<a href="${esc(p.pressKit)}" class="btn btn-sm btn-w pk-btn" download>Download press kit ↓</a>` : `<span class="muted pk-note">Press kit coming</span>`}
</div>
</div>`;
};

export default () => ({
  path: "news.html",
  html: layout({
    page: "/news",
    title: "News & Press · Level 7 Pictures",
    description: "Announcements from the studio, and press kits for every title.",
    body: `<section class="page-head">
<div class="wrap page-head-in">
<span class="kick">News &amp; Press · <span lang="ar" dir="rtl">الأخبار</span></span>
<h1 class="h1">News &amp; Press</h1>
<p class="lead page-lead">Announcements from the studio, and press kits for every title.</p>
</div>
</section>

<section aria-label="News">
<div class="wrap news-list">
${NEWS.map(item).join("\n")}
</div>
</section>

<section class="section" aria-labelledby="press-kits">
<div class="wrap">
${secTitle("press-kits", "Press kits", "Key art, stills and credits")}
<div class="g3">
${LEVEL7_ORDER.map(kit).join("\n")}
</div>
<div class="surface press-contact">
<div><div class="kick">Press contact</div><div class="press-contact-d">Interviews, screeners and set visits</div></div>
<a href="mailto:${SITE.email}?subject=Press" class="btn btn-w">${SITE.email}</a>
</div>
</div>
</section>`,
  }),
});
