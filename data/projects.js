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
  instagram: null,                               // footer shows [Instagram] until set
  linkedin: null,                                // footer shows [LinkedIn] until set
};

/* status: "post" | "streaming" | "coming". A "coming" title with a premiere switches to "streaming"
   at that moment (on load, and live while the page is open). */
export const STATUS = { post: "In post-production", streaming: "Streaming", coming: "Coming soon" };

export const PROJECTS = {
  /* ── Produced by Level 7 ── */
  "beit-hadam": {
    house: "level7", titleEn: "Beit Hadam", titleAr: "بيت هدام",
    status: "post", platform: "Shasha", window: "Ramadan 2027", format: "Series", episodes: null,
    filming: "August 2026",
    basedOn: { author: "Buthaina Al-Essa", work: "All the Things" },
    director: "Said El Marouk",
    cast: ["Abdulmohsen Al-Nemer", "Ali Kakouli", "Laila Abdallah", "Basma Hamada"],
    logline: "A family coming apart across generations, adapted from Buthaina Al-Essa's novel All the Things.",
    image: { src: "/assets/img/bhd-still.jpg", pos: "50% 30%", alt: "Behind the scenes of Beit Hadam" },
    hero: { glyphPos: "50% 35%", bg: { video: "bhd-loop", poster: "/assets/img/bhd-poster-wide.jpg" } },
    trailer: null, pressKit: null,
  },
  "djinn-wedding": {
    house: "level7", titleEn: "Djinn Wedding", titleAr: "عرس الجن",
    status: "streaming", platform: "Shasha", window: "Ramadan 2026", year: 2026, partOf: "Monsters 2",
    director: "Said El Marouk",
    cast: ["Elham Ali"],
    image: { src: "/assets/posters/djinn-wedding.jpg", pos: "50% 22%", alt: "Djinn Wedding poster" },
    hero: { glyphPos: "50% 30%", bg: { pos: "50% 25%" } },
    trailer: null, pressKit: null,
  },
  "deep-state": {
    house: "level7", titleEn: "The Deep State", titleAr: "الدولة العميقة",
    status: "streaming", year: 2023, format: "Series", episodes: 8, runtime: "47 min",
    writer: "Faisal Al Balushi", locations: ["Lebanon", "Cuba", "Kuwait"],
    director: "Said El Marouk",
    image: { src: "/assets/img/deep-state-key.jpg", pos: "50% 22%", alt: "The Deep State key art" },
    hero: { glyphPos: "50% 30%", bg: { pos: "50% 25%" } },
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
  },
  "crime-of-love": { house: "said", titleEn: "Crime of Love", titleAr: "جناية حب", platform: "Shasha Originals", format: "Mini-series", director: "Said El Marouk" },
  "aminas-monster": { house: "said", titleEn: "Amina's Monster", titleAr: "وحش أمينة", series: "Monsters", director: "Said El Marouk" },
  "monster-of-the-bank": { house: "said", titleEn: "Monster of the Bank", titleAr: "وحش البنوك", series: "Monsters", director: "Said El Marouk" },
};

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
