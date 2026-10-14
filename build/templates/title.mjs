// /productions/<slug> — one template for every Level 7 title, filled from data/projects.js
import { SITE, PROJECTS, VIDEOS, LEVEL7_ORDER, statusLabel } from "../../data/projects.js";
import { videoTag } from "./components.mjs";
import { layout } from "./layout.mjs";
import { esc, bidi, picture, webp, clean, cleanList, orPh, FLAGS } from "../lib.mjs";

const NOW = Date.now();
const row = (dt, dd) => (dd ? `<div><dt class="kick">${esc(dt)}</dt><dd>${bidi(dd)}</dd></div>` : "");

/* Facts strip: Status · Platform · Format · Premiere/Released · one extra fact */
const facts = (p) => {
  const eps = p.episodes ? (p.runtime ? `${p.episodes} × ${p.runtime}` : `${p.episodes} episodes`) : orPh(null, "[N] episodes");
  const format = p.partOf ? `A ${p.partOf} story` : [p.format, eps].filter(Boolean).join(" · ");
  return [
    row("Status", statusLabel(p, NOW)),
    row("Platform", p.platform),
    row("Format", format),
    p.released ? row("Released", p.released) : row("Premiere", p.window),
    row("Filming began", p.filming),
    row("Shot in", p.locations?.join(" · ")),
    row("Genre", clean(p.genre)),
  ].join("\n");
};

/* Credits: Directed by · Based on / Written by · Starring · Series · Produced by */
const credits = (p) => [
  row("Directed by", p.director),
  p.basedOn ? row("Based on the novel by", p.basedOn.author) : row("Written by", p.writer),
  row("Starring", cleanList(p.cast).join(", ")),
  row("Series", clean(p.seriesLine)),
  row("Produced by", `Level 7 Pictures${p.producedFor ? ` for ${p.producedFor}` : ""}`),
].join("\n");

/* Behind the scenes (V8.1 §10): one clip twice in the trailer box. A blurred, dimmed copy fills it; the sharp
   copy sits centred at 9:16. Both muted loops, started together by site.js; reduced motion keeps the posters. */
const bts = (p) => {
  const v = (cls) => videoTag(p.page.bts, { cls, posterWidth: 960 });
  return `<div class="trailer bts" data-bts>
<div class="clip">
${v("bts-bg")}
${v("bts-fg")}
</div>
<span class="pill bts-pill">Behind the scenes</span>
</div>`;
};

/* Trailer box: the BTS clip when set; otherwise a trailer link puts a play button for the shared player
   over the key art. Neither → no box. */
const trailer = (p) => {
  if (p.page.bts) return bts(p);
  if (!p.trailer) return "";
  const img = p.page.trailerImage;
  return `<div class="trailer">
<div class="clip">
${picture(img.src, { sizes: "(max-width: 1440px) 92vw, 1312px", style: `object-position:${img.pos}` })}
<div class="trailer-shade"></div>
</div>
<div class="trailer-center">
<button type="button" class="play" data-trailer="${esc(p.trailer)}" data-trailer-title="${esc(p.titleEn)} trailer" aria-label="Play trailer: ${esc(p.titleEn)}"><svg aria-hidden="true" width="24" height="24" viewBox="0 0 14 14"><path d="M3.5 1.5v11l9-5.5z" fill="currentColor"/></svg></button>
<span class="kick trailer-label">Watch the trailer</span>
</div>
</div>`;
};

/* Trailer/BTS box + stills; the section goes when both are empty */
const media = (p) => {
  const box = trailer(p), row = stills(p);
  if (!box && !row) return "";
  const label = [box && (p.page.bts ? "Behind the scenes" : "Trailer"), row && "stills"].filter(Boolean).join(" and ");
  return `<section class="t-sec" aria-label="${label[0].toUpperCase() + label.slice(1)}">
<div class="wrap">
${box}
${row ? `<div class="g3 stills">\n${row}\n</div>` : ""}
</div>
</section>`;
};

/* Stills: only real stills count; one that repeats the hero image is not shown (approved 13 Oct).
   No real stills → no row at all. Some real stills → the row is topped up to three with the design's
   placeholder (removed under PRUNE). */
const stills = (p) => {
  const slots = p.page.stills.filter((s) => s.src !== p.image.src);
  if (!slots.length) return "";
  if (!FLAGS.prune) while (slots.length < 3) slots.push(null);
  return slots.map((s) => s
    ? `<div class="still">${picture(s.src, { alt: s.alt, sizes: "(max-width: 600px) 92vw, (max-width: 1060px) 46vw, 31vw", style: `object-position:${s.pos}` })}</div>`
    : `<div class="still"><span class="muted still-ph">[Still from the producers]</span></div>`).join("\n");
};

/* The story (logline + synopsis) beside the credits; with neither, the credits stand alone */
const story = (p) => {
  const logline = clean(p.logline), synopsis = orPh(clean(p.synopsis), "[Longer synopsis from the producers.]");
  const text = logline || synopsis
    ? `<div class="t-story-text">
<span class="kick">The story</span>
${logline ? `<p class="un t-logline">${esc(logline)}</p>` : ""}
${synopsis ? `<p class="lead">${esc(synopsis)}</p>` : ""}
</div>` : "";
  return `<div class="wrap split t-story">
${text}
<dl class="t-credits">
${credits(p)}
</dl>
</div>`;
};

/* schema.org for search engines: approved facts only (pending copy is left out) */
const jsonLd = (slug, p) => {
  const d = { "@context": "https://schema.org", "@type": "TVSeries", name: p.titleEn, alternateName: p.titleAr, url: `${SITE.url}/productions/${slug}`,
    image: SITE.url + p.image.src, director: { "@type": "Person", name: p.director },
    productionCompany: { "@type": "Organization", name: SITE.name, url: SITE.url } };
  if (p.cast?.length && !p.cast.some((c) => c.includes("["))) d.actor = p.cast.map((name) => ({ "@type": "Person", name }));
  if (p.episodes) d.numberOfEpisodes = p.episodes;
  if (p.released) d.datePublished = new Date(`${p.released} 12:00 UTC`).toISOString().slice(0, 10);
  if (typeof p.logline === "string") d.description = p.logline;
  return `<script type="application/ld+json">${JSON.stringify(d)}</script>`;
};

const page = (slug, i) => {
  const p = PROJECTS[slug];
  const next = LEVEL7_ORDER[(i + 1) % LEVEL7_ORDER.length];
  return {
    path: `productions/${slug}.html`,
    html: layout({
      page: "/productions",
      title: `${p.titleEn} · Level 7 Pictures`,
      description: clean(p.logline) || `${p.titleEn}, a Level 7 Pictures production.`,
      image: p.image.src,
      head: jsonLd(slug, p) + (p.page.video ? `\n<link rel="preload" as="image" href="${webp(VIDEOS[p.page.video].poster, 960)}" fetchpriority="high">` : ""),
      withPlayer: Boolean(p.trailer),
      body: `<section class="t-hero${p.page.video ? " t-hero-has-video" : ""}" aria-label="${esc(p.titleEn)}">
<div class="clip">
${p.page.video
  /* optional hero video: right-aligned, left fade; poster first (LCP), clip after load, only while visible */
  ? videoTag(p.page.video, { cls: "t-hero-video", pos: "50% 25%" }).replace("<video ", "<video data-autoplay-visible ")
  : picture(p.image.src, { alt: p.image.alt, sizes: "100vw", lazy: false, priority: true, cls: "t-hero-img", style: `object-position:${p.page.heroPos}` })}
<div class="t-hero-shade"></div>
</div>
<div class="wrap t-hero-in">
<a href="/productions" class="tlink t-back">← All productions</a>
<span class="pill pill-o t-pill" data-project="${slug}" data-slot="status">${esc(statusLabel(p, NOW))}</span>
<h1 class="t-title">
<span lang="ar" dir="rtl" class="ar t-title-ar">${esc(p.titleAr)}</span>
<span class="un t-title-en">${esc(p.titleEn)}</span>
</h1>
</div>
</section>

<section aria-label="Facts">
<div class="wrap">
<dl class="t-facts">
${facts(p)}
</dl>
</div>
</section>

<section class="t-sec">
${story(p)}
</section>

${media(p)}

<section class="t-sec">
<div class="wrap t-foot">
${p.pressKit ? `<div class="surface t-kit"><div><div class="kick">Press kit</div><div class="t-kit-d">Key art, stills, logline and credits</div></div><a href="${esc(p.pressKit)}" class="btn btn-sm btn-w t-kit-btn" download>Download (ZIP) ↓</a></div>` : ""}
<a href="/productions/${next}" class="surface t-next">
<div><div class="kick">Next title</div><div class="un t-next-t">${esc(PROJECTS[next].titleEn)}</div></div><span aria-hidden="true" class="t-next-arrow">→</span>
</a>
</div>
</section>`,
    }),
  };
};

export default () => LEVEL7_ORDER.map(page);
