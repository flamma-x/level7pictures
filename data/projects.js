/* ═══ Level 7 Pictures: the single source of truth ═══
   Read by build/build.mjs (static pages) and by assets/js/site.js in the browser (launch switch, countdowns).
   Only verified facts go here. Unknown values stay null; templates show the design's [placeholder] instead. */

export const SITE = {
  name: "Level 7 Pictures",
  url: "https://www.levelsevenpictures.com",
  // Share card (og:image / twitter:image) for Home and every general page: 1200×630, built by build/og.mjs.
  // Title pages use /assets/img/og/<slug>.jpg, Said's page his portrait. Never a title Level 7 did not produce.
  share: { src: "/assets/img/og/level7-og.jpg", alt: "Level 7 Pictures: Stories made for every screen. حكايات لكل الشاشات" },
  email: "info@level7p.com",
  offices: ["Abu Dhabi", "Beirut"],                // Dubai → Abu Dhabi (14 Oct 2026)
  founded: { year: 2022, country: "Lebanon" },
  registered: ["Abu Dhabi", "Lebanon"],
  taglineAr: "حكايات لكل الشاشات",
  vimeo: "https://vimeo.com/saidelmarouk",
  brandReel: "https://vimeo.com/saidelmarouk", // approved: opens in a new tab
  arabicSite: null,                              // the عربي nav link is hidden while this is null
  instagram: "https://www.instagram.com/levelsevenpictures/",
  linkedin: false,                               // removed 14 Oct 2026 (false = no link at all)
  privacy: null,                                 // footer Privacy link hidden until the page exists (decided 13 Oct)
  terms: null,                                   // footer Terms link hidden until the page exists
  // episodes-delivered stat dropped 14 Oct 2026
  phones: null,                                  // Phone/WhatsApp tile hidden until a number exists (14 Oct 2026)
};

/* status: "post" | "streaming" | "coming". A "coming" title with a premiere switches to "streaming"
   at that moment (on load, and live while the page is open). */
export const STATUS = { post: "In post-production", streaming: "Streaming", coming: "Coming soon" };

/* Copy shown as designed but not yet signed off: renders normally, and the build lists it so main stays blocked.
   pruneText: what to show instead under PRUNE (omit to remove the item entirely). */
export const pending = (text, pruneText = null) => ({ text, pending: true, prune: pruneText });
export const textOf = (v) => (v && typeof v === "object" && "text" in v ? v.text : v);

/* Title-page fields (Level 7 titles):
   page.bts  VIDEOS key of a behind-the-scenes clip. Set → it takes the trailer box (blurred fill + sharp 9:16 centre).
   trailer   YouTube or Vimeo URL → play button for the shared player. No bts and no trailer → no box at all.
   pressKit  URL of the ZIP. null → the press-kit block is hidden.
   producedFor → "Produced by Level 7 Pictures for <x>".  Fields left out are not shown at all. */
export const PROJECTS = {
  /* ── Produced by Level 7 ── */
  "beit-hadam": {
    house: "level7", titleEn: "Beit Hadam", titleAr: "بيت هدام",
    status: "post", platform: "Shasha", window: "Ramadan 2027", format: "Series", episodes: 7, // verified 14 Oct 2026
    filming: "August 2026",
    basedOn: { author: "Buthaina Al-Essa", work: "All the Things" },
    director: "Said El Marouk",
    cast: ["Abdulmohsen Al-Nemer", "Ali Kakouli", "Laila Abdallah", "Basma Hamada"],
    producedFor: "Shasha",
    logline: "A family coming apart across generations, adapted from Buthaina Al-Essa's novel All the Things.",
    synopsis: "Nasser Al-Azimi comes home to Kuwait after four years abroad to bury his father, and finds a past he walked away from, a country he no longer recognises and a family house coming apart. Adapted from Buthaina Al-Essa's 2017 novel All the Things (كل الأشياء).",
    image: { src: "/assets/img/bhd-still.jpg", pos: "50% 30%", alt: "Behind the scenes of Beit Hadam" },
    hero: { layout: "vertical", video: "beit-hadam-vertical", pos: "50% 22%" }, // Home hero layer (V8.1): sharp vertical clip, right-aligned
    page: { heroPos: "50% 28%", video: "beit-hadam-vertical", trailerImage: { src: "/assets/img/bhd-poster-wide.jpg", pos: "70% 50%" }, bts: "beit-hadam-vertical",
      stills: [{ src: "/assets/img/bhd-still.jpg", alt: "On set", pos: "50% 30%" }] },
    trailer: null, pressKit: null,
  },
  "djinn-wedding": {
    house: "level7", titleEn: "Djinn Wedding", titleAr: "عرس الجن",
    status: "streaming", platform: "Shasha · Netflix", window: "Ramadan 2026", year: 2026, partOf: "Monsters 2", // platform verified 14 Oct
    cardLine: "A Monsters 2 story · Shasha · 2026",  // Home/Productions card line, as designed
    seriesLine: "Monsters 2 · وحوش ٢",               // approved 14 Oct 2026
    genre: "Horror · folklore",                       // approved 13 Oct 2026
    director: "Said El Marouk",
    writer: "Faisal Al-Balushi",
    cast: ["Elham Ali", "Fatat Sultan", "Ahmed Al-Najjar", "Abeer Ahmed", "Hessa Al-Nabhan", "Noura Al-Ameeri"],
    producedFor: "Shasha",
    logline: "A Kuwaiti folk legend turned horror story, part of the Monsters 2 anthology.", // approved 13 Oct 2026
    synopsis: "A 1990s folk singer is booked for a wealthy family's wedding and realises too late that the guests are djinn. Years later, she tells a journalist why she never sang again. Inspired by a story told in Kuwait.",
    image: { src: "/assets/posters/djinn-wedding.jpg", pos: "50% 22%", alt: "Djinn Wedding poster" },
    hero: { pos: "50% 25%" },
    page: { heroPos: "50% 18%", trailerImage: { src: "/assets/posters/djinn-wedding.jpg", pos: "50% 30%" },
      stills: [{ src: "/assets/posters/djinn-wedding.jpg", alt: "Key art", pos: "50% 20%" }] },
    trailer: null, pressKit: null,
  },
  "deep-state": {
    house: "level7", titleEn: "The Deep State", titleAr: "الدولة العميقة",
    status: "streaming", year: 2023, released: "14 Sep 2023", format: "Series", episodes: 8, runtime: "47 min",
    platform: "Shasha · Netflix",                     // approved 14 Oct 2026
    cardLine: "Series · 8 episodes · 2023",           // Home/Productions card line, as designed
    writer: "Faisal Al Balushi", locations: ["Lebanon", "Cuba", "Kuwait"],
    director: "Said El Marouk",
    cast: ["Saad Al-Faraj", "Faisal Al-Omairi", "Jassim Al-Nabhan", "Khaled Al-Buraiki", "Yaqoub Abdullah", "Fahad Al-Abdulmohsen", "Bashar Al-Shatti", "Khaled Al-Mudhaffar", "Rawan Bin Hussain"],
    logline: null, // cut 13 Oct 2026 (was "A pan-Arab political thriller.")
    synopsis: "A military jet goes down and the trail leads to the minister of national security. Two officers set out to find the truth and uncover one secret after another.",
    image: { src: "/assets/img/deep-state-key.jpg", pos: "50% 22%", alt: "The Deep State key art" },
    hero: { pos: "50% 25%" },
    page: { heroPos: "50% 20%", trailerImage: { src: "/assets/img/deep-state-key.jpg", pos: "50% 30%" },
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
    hero: { video: "obsess-loop", pos: "40% 50%" },
    said: { anchor: "obsess" },
  },
  "crime-of-love": { house: "said", titleEn: "Crime of Love", titleAr: "جناية حب", platform: "Shasha Originals", format: "Mini-series", director: "Said El Marouk",
    image: { src: "/assets/img/crime-of-love-still.jpg", pos: "50% 40%", alt: "" }, said: { anchor: "selected-work", line: "Shasha Originals · 2026" } },
  "aminas-monster": { house: "said", titleEn: "Amina's Monster", titleAr: "وحش أمينة", series: "Monsters", director: "Said El Marouk",
    image: { src: "/assets/img/monster-amina.jpg", pos: "50% 35%", alt: "" }, said: { anchor: "selected-work", line: "Monsters · Netflix" } }, // verified 14 Oct
  "monster-of-the-bank": { house: "said", titleEn: "Monster of the Bank", titleAr: "وحش البنوك", series: "Monsters", director: "Said El Marouk",
    image: { src: "/assets/img/monster-bank.jpg", pos: "50% 35%", alt: "" }, said: { anchor: "selected-work", line: "Monsters · Netflix" } }, // verified 14 Oct
  "the-money": { house: "said", titleEn: "The Money", titleAr: "الفلوس", platform: "New Century", format: "Feature", year: 2019, director: "Said El Marouk",
    image: { src: "/assets/posters/money.jpg", pos: "50% 20%", alt: "" } },
  "365-days": { house: "said", titleEn: "365 Days of Happiness", titleAr: "٣٦٥ يوم سعادة", format: "Feature", year: 2011, director: "Said El Marouk",
    image: { src: "/assets/posters/365-days.jpg", pos: "50% 20%", alt: "" } },
};

/* Video clips: poster + sources in order of preference. The browser (site.js) takes the first source whose
   media query matches and whose codec it can play; phones get the lighter -m encodes. */
export const VIDEOS = {
  "beit-hadam-vertical": {
    poster: "/assets/img/beit-hadam-vertical.jpg",
    sources: [
      { src: "/assets/video/beit-hadam-vertical-m.av1.mp4", type: 'video/mp4; codecs="av01.0.04M.08"', media: "(max-width: 600px)" },
      { src: "/assets/video/beit-hadam-vertical-m.mp4", type: "video/mp4", media: "(max-width: 600px)" },
      { src: "/assets/video/beit-hadam-vertical.av1.mp4", type: 'video/mp4; codecs="av01.0.05M.08"' },
      { src: "/assets/video/beit-hadam-vertical.mp4", type: "video/mp4" },
    ],
  },
  "obsess-loop": {
    poster: "/assets/img/obsess-candles.jpg",
    sources: [
      { src: "/assets/video/obsess-loop.av1.mp4", type: 'video/mp4; codecs="av01.0.05M.08"' },
      { src: "/assets/video/obsess-loop.mp4", type: "video/mp4" },
    ],
  },
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
export const longDate = (iso) => new Date(iso).toLocaleDateString("en-GB", { ...DAY, day: "numeric", month: "long", year: "numeric" }); // 30 October 2026 (in sentences; chips and pills use shortDate)

/* One line of facts under a title, same order everywhere: [Monsters 2 story] · platform · [format · episodes] · window or year */
/* Time left as words: "16 days", "1 day", then hours ("2 hrs", "1 hr") on the last day */
const leftText = (p, now) => {
  const t = timeLeft(p.premiere, now);
  const hrs = Math.max(1, t.h + (t.m || t.s ? 1 : 0)); // round up: "2 hrs" at 1 h 30 min
  return t.d > 1 ? `${t.d} days` : t.d === 1 ? "1 day" : hrs === 1 ? "1 hr" : `${hrs} ${COUNTDOWN_LABELS.h.toLowerCase()}`;
};

export const metaLine = (p) => p.cardLine || [
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
  "nav-cta": (p, s) => (s === "streaming" ? `Now on ${p.platform}` : `Obsess · ${shortDate(p.premiere)}`),        // ≥600px
  "nav-cta-short": (p, s) => (s === "streaming" ? p.platform : "Obsess"),                                       // <600px
  "nav-cta-label": (p, s) => (s === "streaming" ? `Now on ${p.platform}: Obsess` : `Obsess · ${shortDate(p.premiere)}: premieres on ${p.platform}`), // accessible name: starts with the visible text (WCAG 2.5.3)
  "date": (p, s) => (s === "streaming" ? `Now on ${p.platform}` : shortDate(p.premiere)),
  "strip": (p, s, now) => (s === "streaming" ? `Now on ${p.platform}` : `${p.platform} · ${leftText(p, now)}`),
  /* Home status card kicker (V8.1 §7): "Netflix · in 16 days" → "Now on Netflix" */
  "card-kicker": (p, s, now) => (s === "streaming" ? `Now on ${p.platform}` : `${p.platform} · in ${leftText(p, now)}`),
  "feature-line": (p, s) => (s === "streaming" ? `${p.titleEn} · Now on ${p.platform}` : `${p.titleEn} · ${p.platform} · ${shortDate(p.premiere)}`),
  "status": (p, s, now) => statusLabel(p, now),
  "said-line": (p, s) => (s === "streaming" ? `Now on ${p.platform}` : `${p.platform} · ${shortDate(p.premiere)}`),
  "said-kick": (p, s) => (s === "streaming" ? `Latest work · Now on ${p.platform}` : `Latest work · ${p.platform}`),
  "said-kick-date": (p, s) => (s === "streaming" ? "" : ` · ${shortDate(p.premiere)}`), // own span: the kicker is uppercase, the date is not
};
