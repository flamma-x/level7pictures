// Home (/) — copy in data/home.js
import { SITE, PROJECTS, VIDEOS, HERO_CYCLE, statusOf, statusLabel, metaLine, SLOT_TEXT, shortDate } from "../../data/projects.js";
import { NEWS } from "../../data/news.js";
import { SERVICES } from "../../data/services.js";
import { HOME as H } from "../../data/home.js";
import { ROUTES } from "../../data/contact.js";
import { layout } from "./layout.mjs";
import { countdown, statsRow, videoTag, NOW } from "./components.mjs";
import { esc, picture, webp, orPh } from "../lib.mjs";

const obsess = PROJECTS.obsess;
const slot = (name, p = obsess) => SLOT_TEXT[name](p, statusOf(p, NOW), NOW);

/* ── hero (V8.1): the ٧ is a window. Footage plays at full brightness inside the ٧ and dimmed around it:
   a #4a5d72 overlay with mix-blend-mode: multiply carries a white ٧ (white × footage = footage). ── */
const heroLayer = (slug, i) => {
  const p = PROJECTS[slug], h = p.hero, first = i === 0;
  const media = h.video
    ? videoTag(h.video, { cls: "hero-media-el", pos: h.pos, posterWidth: h.layout === "vertical" ? 960 : 1600 })
    : picture(p.image.src, { sizes: "100vw", lazy: !first, priority: first, cls: "hero-media-el", style: `object-position:${h.pos}` });
  return `<div class="hero-layer${h.layout === "vertical" ? " hero-layer-v" : ""}${first ? " on" : ""}" data-layer="${i}">${media}</div>`;
};
const heroDots = () => HERO_CYCLE.map((slug, i) => `<button type="button" class="hero-dot" aria-pressed="${i === 0}" aria-label="Show ${esc(PROJECTS[slug].titleEn)}" data-i="${i}"><span></span></button>`).join("\n");

const hero = () => {
  const titles = HERO_CYCLE.map((slug) => PROJECTS[slug].titleEn);
  return `<section class="hero" aria-label="Level 7 Pictures" data-hero='${esc(JSON.stringify(titles))}'>
<div class="hero-media" aria-hidden="true">
${HERO_CYCLE.map(heroLayer).join("\n")}
<div class="hero-window"><span class="mark hero-v">٧</span></div>
<div class="hero-shade"></div>
</div>
<div class="wrap hero-in">
<div class="hero-copy">
<span class="kick">${esc(H.hero.kick)}</span>
<h1 class="h1">${esc(H.hero.title)}</h1>
<p lang="ar" dir="rtl" class="ar hero-ar">${esc(H.hero.titleAr)}</p>
<p class="lead hero-lead">${esc(H.hero.lead)}</p>
<div class="hero-ctas">
<a href="${H.hero.cta.href}" class="btn btn-o">${esc(H.hero.cta.label)}</a>
</div>
<div class="hero-panel" data-project="obsess">
<div class="hero-panel-text">
<span class="hero-panel-date"><span class="nf-badge">Netflix</span><span data-slot="date">${slot("date")}</span></span>
<span class="hero-panel-credit">${esc(obsess.titleEn)}, directed by ${esc(obsess.director)}</span>
</div>
${countdown("obsess", "sm")}
</div>
<div class="hero-dots" role="group" aria-label="${esc(H.hero.dotsLabel)}">
${heroDots()}
</div>
</div>
</div>
</section>`;
};

/* ── status cards under the hero (V8.1 §7): one per entry in data/home.js, text from the project data.
   A title with a premiere gets the launch-switch kicker ("Netflix · in N days" → "Now on Netflix"). ── */
const statusCard = ({ slug, href }) => {
  const p = PROJECTS[slug], s = statusOf(p, NOW);
  const kicker = p.premiere
    ? `<span class="scard2-k kick" data-slot="card-kicker">${esc(SLOT_TEXT["card-kicker"](p, s, NOW))}</span>`
    : `<span class="scard2-k kick" data-slot="status">${esc(statusLabel(p, NOW))}</span>`;
  const meta = p.premiere ? `Directed by ${p.director} · ${shortDate(p.premiere)}` : metaLine(p);
  return `<a href="${href}" class="scard2" data-project="${slug}">
<span class="scard2-thumb">${picture(p.image.src, { sizes: "84px", style: `object-position:${p.image.pos}` })}</span>
<span class="scard2-text">${kicker}<span class="un scard2-t">${esc(p.titleEn)}</span><span class="scard2-m">${esc(meta)}</span></span>
<span class="scard2-arrow" aria-hidden="true">→</span>
</a>`;
};
const statusCards = () => `<section class="status-cards" aria-label="Now">
<div class="wrap status-grid">
${H.statusCards.map(statusCard).join("\n")}
</div>
</section>`;

/* ── Produced by Level 7: one panel per title, alternating sides ── */
const panel = (slug, i) => {
  const p = PROJECTS[slug];
  return `<a href="/productions/${slug}" class="panel${i % 2 ? " flip" : ""}" data-project="${slug}">
<div class="ptext">
<div class="ptop">
<span class="pill pill-o" data-slot="status">${esc(statusLabel(p, NOW))}</span>
<span aria-hidden="true" class="mark pglyph">٧</span>
</div>
<div class="ptitle">
<span lang="ar" dir="rtl" class="ar ptitle-ar">${esc(p.titleAr)}</span>
<h3 class="un ptitle-en">${esc(p.titleEn)}</h3>
<span class="muted ptitle-meta">${esc(metaLine(p))}</span>
</div>
<span class="tlink">Open the title →</span>
</div>
<div class="pimg">${picture(p.image.src, { alt: p.image.alt, sizes: "(max-width: 820px) 100vw, 48vw", style: `object-position:${p.image.pos}` })}</div>
</a>`;
};
const productions = () => `<section class="section" aria-labelledby="hw">
<div class="wrap sec-head sec-head-28">
<div><span class="kick">${esc(H.productions.kick)}</span><h2 id="hw" class="h2">${esc(H.productions.title)}</h2></div>
<a href="/productions" class="tlink">${esc(H.productions.link)}</a>
</div>
${Object.keys(PROJECTS).filter((k) => PROJECTS[k].house === "level7").map(panel).join("\n")}
</section>`;

/* ── Obsess feature ── */
const feature = () => `<section class="section" aria-labelledby="hf">
<div class="wrap">
<div class="feature" data-project="obsess">
<div class="clip">
${videoTag("obsess-loop", { cls: "feature-video", pos: "50% 50%", posterWidth: 1600 }).replace("<video ", "<video data-autoplay-visible ")}
<div class="feature-scrim"></div>
</div>
<div class="feature-body">
<div class="feature-text">
<h2 id="hf" class="kick feature-kick">${esc(H.feature.kick)}</h2>
<span lang="ar" dir="rtl" class="ar feature-ar">${esc(obsess.titleAr)}</span>
<span class="un feature-line" data-slot="feature-line">${slot("feature-line")}</span>
<a href="/said-el-marouk" class="tlink">${esc(H.feature.link)}</a>
</div>
${countdown("obsess", "lg")}
</div>
</div>
</div>
</section>`;

/* ── at a glance ── */
const stats = () => {
  const n = Object.values(PROJECTS).filter((p) => p.house === "level7").length;
  return `<section class="section" aria-label="Level 7 at a glance">
${statsRow([
    { v: SITE.founded.year, l: `Founded in ${SITE.founded.country}`, blue: true },
    { v: SITE.offices.length, l: `Offices: ${SITE.offices.join(" and ")}` },
    { v: n, l: "Level 7 productions" },
  ])}
</section>`;
};

/* ── the people ── */
const person = (x) => `<div class="portrait"><div class="clip">${picture(x.src, { alt: x.alt, sizes: "(max-width: 820px) 46vw, 24vw", style: `object-position:${x.pos}` })}</div><span class="pill portrait-tag">${esc(x.label)}</span></div>`;
const people = () => `<section class="section" aria-labelledby="ha">
<div class="wrap split">
<div class="stack-16">
<span class="kick">${esc(H.people.kick)}</span>
<h2 id="ha" class="h2">${esc(H.people.title)}</h2>
<p class="lead">${esc(H.people.lead)}</p>
<a href="/about" class="tlink">${esc(H.people.link)}</a>
</div>
<div class="keep2 gap-14">
${H.people.portraits.map(person).join("\n")}
</div>
</div>
</section>`;

/* ── services (short versions from data/services.js; each card opens its section on /services) ── */
const services = () => `<section class="section" aria-labelledby="hs">
<div class="wrap">
<div class="sec-head">
<div><span class="kick">${esc(H.services.kick)}</span><h2 id="hs" class="h2">${esc(H.services.title)}</h2></div>
<a href="/services" class="tlink">${esc(H.services.link)}</a>
</div>
<div class="g4">
${SERVICES.map((s, i) => `<a href="/services#${s.id}" class="svc zoom">
<div class="svc-img"><div class="clip">${picture(s.image.src, { sizes: "(max-width: 600px) 92vw, (max-width: 1060px) 46vw, 24vw" })}</div><span class="un svc-n" aria-hidden="true">0${i + 1}</span></div>
<h3 class="h3">${esc(s.homeTitle)}</h3>
<p class="muted svc-d">${esc(s.short)}</p>
</a>`).join("\n")}
</div>
</div>
</section>`;

/* ── news ── */
const news = () => `<section class="section" aria-labelledby="hn">
<div class="wrap">
<div class="sec-head">
<div><span class="kick">${esc(H.news.kick)}</span><h2 id="hn" class="h2">${esc(H.news.title)}</h2></div>
<a href="/news" class="tlink">${esc(H.news.link)}</a>
</div>
<div class="g3">
${NEWS.slice(0, 3).map((n) => `<a href="/news#${n.id}" class="surface news-card zoom">
<div class="news-img">${picture(n.image.src, { sizes: "(max-width: 600px) 92vw, (max-width: 1060px) 46vw, 31vw", style: `object-position:${n.image.pos}` })}</div>
<div class="news-body"><span class="kick news-date">${esc(n.date)}</span><h3 class="h3 news-title">${esc(n.title)}</h3></div>
</a>`).join("\n")}
</div>
</div>
</section>`;

/* ── contact block: each route opens /contact with its inquiry type pre-selected ── */
const contact = () => `<section class="section" aria-labelledby="hc">
<div class="wrap">
<div class="cta-block">
<span class="clip" aria-hidden="true"><span class="mark cta-glyph">٧</span></span>
<h2 id="hc" class="h1 cta-title">${H.contact.title.map(esc).join("<br>")}</h2>
<div class="g4 cta-routes">
${ROUTES.map((r) => `<a href="/contact?route=${r.id}" class="route"><span class="kick route-k">Route ${r.k}</span><span class="un route-t">${esc(r.title)} →</span></a>`).join("\n")}
</div>
<a href="mailto:${SITE.email}" class="un cta-mail">${SITE.email}</a>
</div>
</div>
</section>`;

/* Old one-page anchors → their new pages (hashes never reach the server, so this runs first thing in <head>) */
const REDIRECTS = { "#obsess": "/said-el-marouk#obsess", "#monsters": "/said-el-marouk#selected-work", "#crime-of-love": "/said-el-marouk#selected-work", "#work": "/productions", "#founder": "/said-el-marouk", "#contact": "/contact" };
const redirectScript = `<script>(function(m,h){if(m[h])location.replace(m[h])})(${JSON.stringify(REDIRECTS)},location.hash)</script>`;

/* LCP: the first title's poster, fetched first */
const firstPoster = () => {
  const h = PROJECTS[HERO_CYCLE[0]].hero;
  return h.video ? webp(VIDEOS[h.video].poster, h.layout === "vertical" ? 960 : 1600) : null;
};

export default () => ({
  path: "index.html",
  html: layout({
    page: "/",
    title: `Level 7 Pictures · ${H.hero.title.replace(/\.$/, "")}`,
    description: H.hero.lead,
    head: `${redirectScript}${firstPoster() ? `\n<link rel="preload" as="image" href="${firstPoster()}" fetchpriority="high">` : ""}`,
    body: [hero(), statusCards(), productions(), feature(), stats(), people(), services(), news(), contact()].join("\n\n"),
  }),
});
