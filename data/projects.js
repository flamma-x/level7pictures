/* ═══ Level 7 Pictures: the single source of truth ═══
   Read by build/build.mjs (static pages) and by assets/js/site.js in the browser (launch switch, countdowns).
   Only verified facts go here. Unknown values stay null; templates show the design's [placeholder] instead. */

export const SITE = {
  name: "Level 7 Pictures",
  url: "https://level7pictures.com",
  email: "info@level7p.com",
  offices: ["Dubai", "Beirut"],
  founded: { year: 2020, country: "Lebanon" },
  registered: ["Dubai", "Lebanon"],
  taglineAr: "دراما عربية لكل الشاشات",
  vimeo: "https://vimeo.com/saidelmarouk",
  brandReel: "https://vimeo.com/saidelmarouk", // approved: opens in a new tab
  arabicSite: null,                              // the عربي nav link is hidden while this is null
  instagram: null,                               // footer shows [Instagram] until set (hidden under PRUNE)
  linkedin: null,                                // footer shows [LinkedIn] until set (hidden under PRUNE)
  privacy: null,                                 // footer Privacy link hidden until the page exists (decided 13 Oct)
  terms: null,                                   // footer Terms link hidden until the page exists
  episodesDelivered: null,                       // Home stat shows [N] until set (tile hidden under PRUNE)
  phones: null,                                  // e.g. ["+971 …", "+961 …"]; Contact shows [+971 …] · [+961 …] until set
};

/* status: "post" | "streaming" | "coming". A "coming" title with a premiere switches to "streaming"
   at that moment (on load, and live while the page is open). */
export const STATUS = { post: "In post-production", streaming: "Streaming", coming: "Coming soon" };

/* Copy shown as designed but not yet signed off: renders normally, and the build lists it so main stays blocked.
   pruneText: what to show instead under PRUNE (omit to remove the item entirely). */
export const pending = (text, pruneText = null) => ({ text, pending: true, prune: pruneText });
export const textOf = (v) => (v && typeof v === "object" && "text" in v ? v.text : v);

/* Title-page fields (Level 7 titles):
   trailer   YouTube or Vimeo URL. null → the trailer box shows its "coming" state, no play button.
   pressKit  URL of the ZIP. null → the press-kit block is hidden.
   producedFor → "Produced by Level 7 Pictures for <x>".  Fields left out are not shown at all. */
export const PROJECTS = {
  /* ── Produced by Level 7 ── */
  "beit-hadam": {
    house: "level7", titleEn: "Beit Hadam", titleAr: "بيت هدام",
    status: "post", platform: "Shasha", window: "Ramadan 2027", format: "Series", episodes: null,
    filming: "August 2026",
    basedOn: { author: "Buthaina Al-Essa", work: "All the Things" },
    director: "Said El Marouk",
    cast: ["Abdulmohsen Al-Nemer", "Ali Kakouli", "Laila Abdallah", "Basma Hamada"],
    producedFor: "Shasha",
    logline: "A family coming apart across generations, adapted from Buthaina Al-Essa's novel All the Things.",
    image: { src: "/assets/img/bhd-still.jpg", pos: "50% 30%", alt: "Behind the scenes of Beit Hadam" },
    hero: { glyphPos: "50% 35%", bg: { video: "bhd-loop", poster: "/assets/img/bhd-poster-wide.jpg" } },
    page: { heroPos: "50% 28%", trailerImage: { src: "/assets/img/bhd-poster-wide.jpg", pos: "70% 50%" }, comingLabel: "Teaser coming",
      stills: [{ src: "/assets/img/bhd-still.jpg", alt: "On set", pos: "50% 30%" }] },
    trailer: null, pressKit: null,
  },
  "djinn-wedding": {
    house: "level7", titleEn: "Djinn Wedding", titleAr: "عرس الجن",
    status: "streaming", platform: "Shasha", window: "Ramadan 2026", year: 2026, partOf: "Monsters 2",
    seriesLine: "Monsters 2 · [وحوش ٢]",            // Arabic series name awaiting confirmation
    genre: "Horror · folklore",                       // approved 13 Oct 2026
    director: "Said El Marouk",
    cast: ["Elham Ali", "[full cast]"],
    producedFor: "Shasha",
    logline: "A Kuwaiti folk legend turned horror story, part of the Monsters 2 anthology.", // approved 13 Oct 2026
    image: { src: "/assets/posters/djinn-wedding.jpg", pos: "50% 22%", alt: "Djinn Wedding poster" },
    hero: { glyphPos: "50% 30%", bg: { pos: "50% 25%" } },
    page: { heroPos: "50% 18%", trailerImage: { src: "/assets/posters/djinn-wedding.jpg", pos: "50% 30%" }, comingLabel: "Trailer coming",
      stills: [{ src: "/assets/posters/djinn-wedding.jpg", alt: "Key art", pos: "50% 20%" }] },
    trailer: null, pressKit: null,
  },
  "deep-state": {
    house: "level7", titleEn: "The Deep State", titleAr: "الدولة العميقة",
    status: "streaming", year: 2023, released: "14 Sep 2023", format: "Series", episodes: 8, runtime: "47 min",
    // platform: awaiting confirmation, so no Platform row is shown
    writer: "Faisal Al Balushi", locations: ["Lebanon", "Cuba", "Kuwait"],
    director: "Said El Marouk",
    cast: ["[Cast from the producers]"],
    logline: null, // cut 13 Oct 2026 (was "A pan-Arab political thriller.")
    image: { src: "/assets/img/deep-state-key.jpg", pos: "50% 22%", alt: "The Deep State key art" },
    hero: { glyphPos: "50% 30%", bg: { pos: "50% 25%" } },
    page: { heroPos: "50% 20%", trailerImage: { src: "/assets/img/deep-state-key.jpg", pos: "50% 30%" }, comingLabel: "Trailer coming",
      stills: [{ src: "/assets/img/deep-state-key.jpg", alt: "Key art", pos: "50% 20%" }] },
    trailer: null, pressKit: null,
  },

  /* ── Directed by Said El Marouk for other producers (shown as his work) ── */
  "obsess": {
    house: "said", titleEn: "Obsess", titleAr: "النفس المطمئنة",
    status: "coming", premiere: "2026-10-30T00:00:00+03:00", platform: "Netflix",
    director: "Said El Marouk",
    link: null,     // Netflix title URL, once public
    trailer: null,  // adding a URL here is all it takes to surface a trailer
    image: { src: "/assets/img/obsess-candles.jpg", pos: "40% 50%", alt: "" },
    hero: { glyphPos: "40% 50%", bg: { video: "obsess-loop", poster: "/assets/img/obsess-candles.jpg" } },
    said: { anchor: "obsess" },
  },
  "crime-of-love": { house: "said", titleEn: "Crime of Love", titleAr: "جناية حب", platform: "Shasha Originals", format: "Mini-series", director: "Said El Marouk",
    image: { src: "/assets/img/crime-of-love-still.jpg", pos: "50% 40%", alt: "" }, said: { anchor: "selected-work", line: "Shasha Originals · Mini-series" } },
  "aminas-monster": { house: "said", titleEn: "Amina's Monster", titleAr: "وحش أمينة", series: "Monsters", director: "Said El Marouk",
    image: { src: "/assets/img/monster-amina.jpg", pos: "50% 35%", alt: "" }, said: { anchor: "selected-work", line: "Monsters" } },
  "monster-of-the-bank": { house: "said", titleEn: "Monster of the Bank", titleAr: "وحش البنوك", series: "Monsters", director: "Said El Marouk",
    image: { src: "/assets/img/monster-bank.jpg", pos: "50% 35%", alt: "" }, said: { anchor: "selected-work", line: "Monsters" } },
  "the-money": { house: "said", titleEn: "The Money", titleAr: "الفلوس", platform: "New Century", format: "Feature", year: 2019, director: "Said El Marouk",
    image: { src: "/assets/posters/money.jpg", pos: "50% 20%", alt: "" } },
  "365-days": { house: "said", titleEn: "365 Days of Happiness", titleAr: "٣٦٥ يوم سعادة", format: "Feature", year: 2011, director: "Said El Marouk",
    image: { src: "/assets/posters/365-days.jpg", pos: "50% 20%", alt: "" } },
};
/* Title pages, in "Next title" order (wraps around) */
export const LEVEL7_ORDER = ["beit-hadam", "djinn-wedding", "deep-state"];
/* "Said El Marouk's other work" on /productions, in this order */
export const SAID_ON_PRODUCTIONS = ["obsess", "crime-of-love", "aminas-monster", "monster-of-the-bank"];

/* Home hero: the ٧ cycles through these, in this order */
export const HERO_CYCLE = ["beit-hadam", "djinn-wedding", "deep-state", "obsess"];

/* ── Shared status logic (build + browser) ── */
export const statusOf = (p, now = Date.now()) =>
  p.status === "coming" && p.premiere && now >= new Date(p.premiere).getTime() ? "streaming" : p.status;
export const statusLabel = (p, now) => {
  const s = statusOf(p, now);
  return s === "streaming" && p.premiere ? `Now on ${p.platform}` : STATUS[s];
};
const DAY = { timeZone: "Asia/Kuwait" };
export const shortDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { ...DAY, day: "numeric", month: "short" });             // 30 Oct
export const longDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { ...DAY, day: "numeric", month: "short", year: "numeric" }); // 30 Oct 2026

/* One line of facts under a title, same order everywhere: [Monsters 2 story] · platform · [format · episodes] · window or year */
export const metaLine = (p) => [
  p.partOf && `A ${p.partOf} story`,
  p.platform,
  !p.platform && p.format,
  !p.platform && p.episodes && `${p.episodes} episodes`,
  p.status === "post" ? p.window : p.year,
].filter(Boolean).join(" · ");

/* Countdown: one label set everywhere (approved: Days / Hrs / Min / Sec) */
export const COUNTDOWN_LABELS = { d: "Days", h: "Hrs", m: "Min", s: "Sec" };
export const timeLeft = (iso, now = Date.now()) => {
  const ms = Math.max(0, new Date(iso).getTime() - now);
  return { ms, d: Math.floor(ms / 864e5), h: Math.floor(ms / 36e5) % 24, m: Math.floor(ms / 6e4) % 60, s: Math.floor(ms / 1e3) % 60 };
};

/* Text slots that change at launch. Rendered at build time and re-rendered in the browser (site.js). */
export const SLOT_TEXT = {
  "nav-cta": (p, s) => (s === "streaming" ? `Obsess · Now on ${p.platform}` : `Obsess · ${shortDate(p.premiere)}`),
  "date": (p, s) => (s === "streaming" ? `Now on ${p.platform}` : longDate(p.premiere)),
  "strip": (p, s, now) => {
    if (s === "streaming") return `Now on ${p.platform}`;
    const t = timeLeft(p.premiere, now);
    const hrs = Math.max(1, t.h + (t.m || t.s ? 1 : 0)); // round up: "2 hrs" at 1 h 30 min
    const left = t.d > 1 ? `${t.d} days` : t.d === 1 ? "1 day" : hrs === 1 ? "1 hr" : `${hrs} ${COUNTDOWN_LABELS.h.toLowerCase()}`;
    return `${p.platform} · ${left}`;
  },
  "feature-line": (p, s) => (s === "streaming" ? `${p.titleEn} · Now on ${p.platform}` : `${p.titleEn} · ${p.platform} · ${longDate(p.premiere)}`).toUpperCase(),
  "status": (p, s, now) => statusLabel(p, now),
  "said-line": (p, s) => (s === "streaming" ? `Now on ${p.platform}` : `${p.platform} · ${longDate(p.premiere)}`),
  "said-kick": (p, s) => (s === "streaming" ? `Latest work · Now on ${p.platform}` : `Latest work · ${p.platform} · ${longDate(p.premiere)}`),
};
