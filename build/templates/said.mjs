// /said-el-marouk — Said El Marouk's portfolio
import { PROJECTS } from "../../data/projects.js";
import { SAID as S } from "../../data/said.js";
import { layout } from "./layout.mjs";
import { statTile, secTitle, countdown, slot, workCard } from "./components.mjs";
import { esc, picture, webp, clean } from "../lib.mjs";

const obsess = PROJECTS.obsess;
const ext = (href, cls, label, icon = "") => `<a href="${href}" class="${cls}" target="_blank" rel="noopener">${icon}${label}<span class="sr-only"> (opens in a new tab)</span></a>`;
const PLAY = `<svg aria-hidden="true" width="12" height="12" viewBox="0 0 14 14"><path d="M3 1.5v11l9-5.5z" fill="currentColor"/></svg>`;

const head = () => `<section class="said-head" aria-label="${esc(S.name)}">
<div class="wrap split">
<div class="said-intro">
<span class="kick">${esc(S.role)}</span>
<h1 class="h1">${esc(S.name)}</h1>
<p lang="ar" dir="rtl" class="ar said-ar">${esc(S.nameAr)}</p>
${clean(S.quote) ? `<blockquote class="quote">“${esc(clean(S.quote))}”</blockquote>` : ""}
<div class="hero-ctas">
${ext(S.reel, "btn btn-w", "Watch the reel ↗", PLAY)}
${S.imdb ? ext(S.imdb, "btn btn-o", "IMDb ↗") : ""}
</div>
</div>
<div class="first-sm said-portrait">
${picture(S.portrait.src, { alt: S.portrait.alt, sizes: "(max-width: 820px) 92vw, 46vw", lazy: false, priority: true })}
</div>
</div>
</section>`;

const feature = () => `<section id="obsess" class="section" aria-labelledby="obsess-title">
<div class="wrap">
<div class="feature feature-540" data-project="obsess">
<div class="clip">
<video class="feature-video" muted loop playsinline preload="none" aria-hidden="true" poster="${webp(obsess.image.src, 1600)}" data-autoplay-visible><source src="/assets/video/obsess-loop.av1.mp4" type='video/mp4; codecs="av01.0.05M.08"'><source src="/assets/video/obsess-loop.mp4" type="video/mp4"></video>
<div class="feature-scrim"></div>
</div>
<div class="feature-body">
<div class="feature-text">
<h2 id="obsess-title" class="kick feature-kick">${slot("said-kick", "obsess")}${slot("said-kick-date", "obsess").replace("<span ", `<span class="nocaps" `)}</h2>
<span lang="ar" dir="rtl" class="ar feature-ar">${esc(obsess.titleAr)}</span>
<span class="un feature-en">${esc(obsess.titleEn)}</span>
<p class="lead feature-blurb">${esc(S.obsessBlurb)}</p>
</div>
${countdown("obsess", "lg")}
</div>
</div>
</div>
</section>`;

const work = () => `<section id="selected-work" class="section" aria-labelledby="selected-work-title">
<div class="wrap">
${secTitle("selected-work-title", "Filmography", "Selected work as director")}
<div class="g4">
${S.selectedWork.map((w) => {
  const level7 = PROJECTS[w.slug].house === "level7";
  return workCard({ ...w, pill: level7 ? "Level 7" : null, href: level7 ? `/productions/${w.slug}` : null });
}).join("\n")}
</div>
</div>
</section>`;

const transformers = () => {
  const t = S.transformers;
  return `<section id="transformers" class="section" aria-labelledby="transformers-title">
<div class="wrap">
<div class="wide-card">
<div class="clip">${picture(t.image.src, { alt: t.image.alt, sizes: "(max-width: 1440px) 92vw, 1312px" })}<div class="wide-card-shade"></div></div>
<div class="wide-card-text">
<span class="kick">${esc(t.kick)}</span>
<h2 id="transformers-title" class="h2">${esc(t.title)}</h2>
<p class="lead">${esc(t.text)}</p>
</div>
</div>
</div>
</section>`;
};

const bio = () => `<section id="biography" class="section" aria-labelledby="biography-title">
<div class="wrap split bio">
<div class="bio-text">
<span class="kick">Biography</span>
<h2 id="biography-title" class="h2">A language of image and gesture.</h2>
${S.bio.map((p) => `<p class="lead">${esc(p)}</p>`).join("\n")}
</div>
${picture(S.bioImage.src, { alt: S.bioImage.alt, sizes: "(max-width: 820px) 92vw, 46vw", cls: "bio-img", style: `object-position:${S.bioImage.pos}` })}
</div>
</section>`;

/* Timeline (V8.1): header with ← 01 / 13 →, a scroll-snap track aligned to the content edge that bleeds right,
   cards on a line with ring dots (Level 7 entries filled blue), and a progress bar. site.js drives it. */
const timeline = () => {
  const items = S.timeline.filter((e) => clean(e.text));
  const pad = (n) => String(n).padStart(2, "0");
  return `<section id="timeline" class="section" aria-labelledby="timeline-title">
<div class="wrap tl-head">
<div>${secTitle("timeline-title", "Timeline", "Thirty years, four countries", "tl-title")}</div>
<div class="tl-nav" data-js-only>
<button type="button" class="tl-btn" data-tl-step="-1" aria-label="Previous entry"><span aria-hidden="true">←</span></button>
<span class="un tl-count" aria-live="polite"><span data-tl-cur>01</span> / ${pad(items.length)}</span>
<button type="button" class="tl-btn" data-tl-step="1" aria-label="Next entry"><span aria-hidden="true">→</span></button>
</div>
</div>
<div class="tl" role="region" aria-label="Timeline, scroll sideways" tabindex="0" data-tl>
<ol class="tl-list">
${items.map((e) => `<li class="tl-card${e.l7 ? " tl-l7" : ""}"><span class="un tl-when">${esc(e.when)}</span><span class="kick tl-where">${esc(e.where)}</span><p class="tl-text">${esc(clean(e.text))}</p></li>`).join("\n")}
</ol>
</div>
<div class="wrap"><div class="tl-progress" aria-hidden="true" data-js-only><span data-tl-bar style="width:${(100 / items.length).toFixed(3)}%"></span></div></div>
</section>`;
};

const music = () => `<section id="music-videos" class="section" aria-labelledby="music-title">
<div class="wrap split bio">
<div class="mv-intro">
<span class="kick">Music video</span>
<h2 id="music-title" class="h2">Seventy videos. One generation.</h2>
<p class="lead">${esc(S.musicIntro)}</p>
${ext(S.reel, "tlink", "Watch the reel on Vimeo ↗")}
</div>
<ul class="artists" aria-label="Artists">
${S.artists.map((a) => `<li>${esc(a)}</li>`).join("\n")}
</ul>
</div>
</section>`;

const recognition = () => `<section id="recognition" class="section" aria-labelledby="recognition-title">
<div class="wrap">
${secTitle("recognition-title", "Recognition & more", "Awards and standing")}
<div class="g3">
${S.awards.filter((a) => clean(a.title)).map((a) => `<div class="surface award"><span class="un award-big">${esc(a.big)}</span><span class="un award-title">${esc(clean(a.title))}</span><span class="muted award-note">${esc(clean(a.note))}</span></div>`).join("\n")}
</div>
<div class="g2 mt-16">
<div class="surface list-tile"><div class="kick">Production houses founded</div><ul>${S.houses.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
<div class="surface list-tile"><div class="kick">Also</div><ul>${S.also.map((h) => `<li>${esc(h)}</li>`).join("")}</ul></div>
</div>
</div>
</section>`;

const cta = () => `<section class="section" aria-labelledby="work-with">
<div class="wrap">
<div class="cta-band">
<h2 id="work-with" class="h2">Work with Said through Level 7.</h2>
<a href="/contact" class="btn btn-w">Contact us</a>
</div>
</div>
</section>`;

export default () => ({
  path: "said-el-marouk.html",
  html: layout({
    page: "/said-el-marouk",
    title: "Said El Marouk · Level 7 Pictures",
    description: `${S.name}, founder and director of Level 7 Pictures. ${S.bio[0]}`,
    share: { src: "/assets/img/og/said-el-marouk.jpg", alt: S.portrait.alt },
    head: `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@type": "Person", name: S.name, alternateName: S.nameAr, jobTitle: "Director", worksFor: { "@type": "Organization", name: "Level 7 Pictures" }, sameAs: [S.reel, S.imdb].filter(Boolean) })}</script>`,
    body: [head(), `<section aria-label="Career in numbers"><div class="wrap g4">\n${S.numbers.map(statTile).join("\n")}\n</div></section>`,
      feature(), work(), transformers(), bio(), timeline(), music(), recognition(), cta()].join("\n\n"),
  }),
});
