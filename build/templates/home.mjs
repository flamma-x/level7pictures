// Home (/)
import { SITE, PROJECTS, HERO_CYCLE, STATUS, statusOf, statusLabel, metaLine, SLOT_TEXT, COUNTDOWN_LABELS, timeLeft } from "../../data/projects.js";
import { NEWS } from "../../data/news.js";
import { SERVICES } from "../../data/services.js";
import { layout } from "./layout.mjs";
import { countdown, statTile, NOW } from "./components.mjs";
import { esc, picture, webp } from "../lib.mjs";

const obsess = PROJECTS.obsess;
const slot = (name, p = obsess) => SLOT_TEXT[name](p, statusOf(p, NOW), NOW);
const AV1 = "av01.0.01M.08"; // 640×360 background loops

/* ── hero: the ٧ filled with the current title, its footage blurred behind ── */
const heroLayer = (slug, i) => {
  const p = PROJECTS[slug], bg = p.hero.bg;
  const inner = bg.video
    ? `<video muted loop playsinline preload="${i === 0 ? "auto" : "none"}"${i === 0 ? " autoplay" : ""} poster="${webp(bg.poster, 480)}" data-video><source src="/assets/video/${bg.video}-bg.av1.mp4" type='video/mp4; codecs="${AV1}"'><source src="/assets/video/${bg.video}-bg.mp4" type="video/mp4"></video>`
    : `<img src="${webp(p.image.src, 480)}" alt="" decoding="async" style="object-position:${bg.pos}">`;
  return `<div class="hero-layer${i === 0 ? " on" : ""}" data-layer="${i}">${inner}</div>`;
};
const heroDots = () => HERO_CYCLE.map((slug, i) => `<button type="button" class="hero-dot" aria-pressed="${i === 0}" aria-label="Show ${esc(PROJECTS[slug].titleEn)}" data-i="${i}"><span></span></button>`).join("\n");
const glyphData = HERO_CYCLE.map((slug) => ({ t: PROJECTS[slug].titleEn, f: webp(PROJECTS[slug].image.src, 960), p: PROJECTS[slug].hero.glyphPos }));

const hero = () => {
  const first = glyphData[0];
  return `<section class="hero" aria-label="Level 7 Pictures" data-hero='${esc(JSON.stringify(glyphData))}'>
<div class="hero-bg" aria-hidden="true">
${HERO_CYCLE.map(heroLayer).join("\n")}
<div class="hero-scrim"></div>
</div>
<div class="wrap split hero-grid">
<div class="hero-copy">
<span class="kick">Level 7 Pictures · ${SITE.offices.join(" · ")} · Since ${SITE.founded.year}</span>
<h1 class="h1">Arab drama, made for every screen.</h1>
<p lang="ar" dir="rtl" class="ar hero-ar">${SITE.taglineAr}</p>
<p class="lead hero-lead">A production house founded in ${SITE.founded.country} in ${SITE.founded.year}. We develop, produce and deliver series for regional and global platforms.</p>
<div class="hero-ctas">
<a href="/productions" class="btn btn-w">See the productions →</a>
<a href="${SITE.brandReel}" class="btn btn-o" target="_blank" rel="noopener"><svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>Brand reel<span class="sr-only"> (opens Vimeo in a new tab)</span></a>
</div>
<div class="hero-panel" data-project="obsess">
<div class="hero-panel-text">
<span class="hero-panel-date"><span class="nf-badge">Netflix</span><span data-slot="date">${slot("date")}</span></span>
<span class="hero-panel-credit">${esc(obsess.titleEn)}, directed by ${esc(obsess.director)}</span>
</div>
${countdown("obsess", "sm")}
</div>
<div class="hero-dots">
<span class="muted hero-now">In the ٧ now: <span data-hero-now>${esc(first.t)}</span></span>
${heroDots()}
</div>
</div>
<div class="first-sm hero-glyph-cell">
<span aria-hidden="true" class="mark glyph" style="--fill:url(${first.f});--pos:${first.p}">٧</span>
</div>
</div>
</section>`;
};

/* ── status strip ── */
const strip = () => {
  const bhd = PROJECTS["beit-hadam"];
  return `<div class="strip">
<div class="wrap strip-row">
<span class="strip-item" data-project="beit-hadam"><span class="strip-dot strip-dot-blue" aria-hidden="true"></span><span>${esc(bhd.titleEn)} · ${esc(STATUS[statusOf(bhd, NOW)].replace(/^In /, "in "))} · ${esc(bhd.window)}</span></span>
<span class="strip-item" data-project="obsess"><span class="strip-dot" aria-hidden="true"></span><span>${esc(obsess.titleEn)}, directed by ${esc(obsess.director)} · <span data-slot="strip">${slot("strip")}</span></span></span>
</div>
</div>`;
};

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
<div><span class="kick">Our productions</span><h2 id="hw" class="h2">Produced by Level 7</h2></div>
<a href="/productions" class="tlink">All productions →</a>
</div>
${Object.keys(PROJECTS).filter((k) => PROJECTS[k].house === "level7").map(panel).join("\n")}
</section>`;

/* ── Obsess feature ── */
const feature = () => `<section class="section" aria-labelledby="hf">
<div class="wrap">
<div class="feature" data-project="obsess">
<div class="clip">
<video class="feature-video" muted loop playsinline preload="none" aria-hidden="true" poster="${webp(obsess.image.src, 1600)}" data-autoplay-visible><source src="/assets/video/obsess-loop.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'><source src="/assets/video/obsess-loop.mp4" type="video/mp4"></video>
<div class="feature-scrim"></div>
</div>
<div class="feature-body">
<div class="feature-text">
<h2 id="hf" class="kick feature-kick">Directed by our founder, ${esc(obsess.director)}</h2>
<span lang="ar" dir="rtl" class="ar feature-ar">${esc(obsess.titleAr)}</span>
<span class="un feature-line" data-slot="feature-line">${slot("feature-line")}</span>
<a href="/said-el-marouk" class="tlink">Said's portfolio →</a>
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
<div class="wrap g4">
${statTile({ v: SITE.founded.year, l: `Founded in ${SITE.founded.country}`, blue: true })}
${statTile({ v: SITE.offices.length, l: `Offices: ${SITE.offices.join(" and ")}` })}
${statTile({ v: n, l: "Level 7 productions" })}
${statTile({ v: "[N]", l: "Episodes delivered" })}
</div>
</section>`;
};

/* ── studio ── */
const person = (src, alt, name, pos) => `<div class="portrait"><div class="clip">${picture(src, { alt, sizes: "(max-width: 820px) 46vw, 24vw", style: `object-position:${pos}` })}</div><span class="pill portrait-tag">${name}</span></div>`;
const studio = () => `<section class="section" aria-labelledby="ha">
<div class="wrap split">
<div class="stack-16">
<span class="kick">The studio</span>
<h2 id="ha" class="h2">Built by a director and a producer.</h2>
<p class="lead">Said El Marouk and Khouloud Daher run Level 7 with one in-house team, from the first draft to the delivery file.</p>
<a href="/about" class="tlink">About Level 7 →</a>
</div>
<div class="keep2 gap-14">
${person("/assets/img/said-hero.jpg", "Said El Marouk on set", "Said El Marouk", "55% 35%")}
${person("/assets/img/khouloud-daher.jpg", "Khouloud Daher on set", "Khouloud Daher", "45% 30%")}
</div>
</div>
</section>`;

/* ── services (short versions from data/services.js; each card opens its section on /services) ── */
const services = () => `<section class="section" aria-labelledby="hs">
<div class="wrap">
<div class="sec-head">
<div><span class="kick">What we do</span><h2 id="hs" class="h2">One partner, every stage</h2></div>
<a href="/services" class="tlink">Services →</a>
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
<div><span class="kick">News</span><h2 id="hn" class="h2">Latest from the studio</h2></div>
<a href="/news" class="tlink">News &amp; Press →</a>
</div>
<div class="g3">
${NEWS.slice(0, 3).map((n) => `<a href="/news#${n.id}" class="surface news-card zoom">
<div class="news-img">${picture(n.image.src, { sizes: "(max-width: 600px) 92vw, (max-width: 1060px) 46vw, 31vw", style: `object-position:${n.image.pos}` })}</div>
<div class="news-body"><span class="kick news-date">${esc(n.date)}</span><h3 class="h3 news-title">${esc(n.title)}</h3></div>
</a>`).join("\n")}
</div>
</div>
</section>`;

/* ── contact block ── */
const ROUTES = [["A", "Co-productions & commissions"], ["B", "Talent"], ["C", "Crew"], ["D", "Press"]];
const contact = () => `<section class="section" aria-labelledby="hc">
<div class="wrap">
<div class="cta-block">
<span class="clip" aria-hidden="true"><span class="mark cta-glyph">٧</span></span>
<h2 id="hc" class="h1 cta-title">Your story.<br>Next.</h2>
<div class="g4 cta-routes">
${ROUTES.map(([k, t]) => `<a href="/contact" class="route"><span class="kick route-k">Route ${k}</span><span class="un route-t">${esc(t)} →</span></a>`).join("\n")}
</div>
<a href="mailto:${SITE.email}" class="un cta-mail">${SITE.email}</a>
</div>
</div>
</section>`;

/* Old one-page anchors → their new pages (hashes never reach the server, so this runs first thing in <head>) */
const REDIRECTS = { "#obsess": "/said-el-marouk#obsess", "#monsters": "/said-el-marouk#selected-work", "#crime-of-love": "/said-el-marouk#selected-work", "#work": "/productions", "#founder": "/said-el-marouk", "#contact": "/contact" };
const redirectScript = `<script>(function(m,h){if(m[h])location.replace(m[h])})(${JSON.stringify(REDIRECTS)},location.hash)</script>`;

export default () => ({
  path: "index.html",
  html: layout({
    page: "/",
    title: "Level 7 Pictures · Arab drama, made for every screen",
    description: `Level 7 Pictures is a production house founded in ${SITE.founded.country} in ${SITE.founded.year}. We develop, produce and deliver series for regional and global platforms.`,
    head: `${redirectScript}\n<link rel="preload" as="image" href="${glyphData[0].f}" fetchpriority="high">`,
    body: [hero(), strip(), productions(), feature(), stats(), studio(), services(), news(), contact()].join("\n\n"),
  }),
});
