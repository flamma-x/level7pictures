/* Home page copy (V8.1, 13 Oct 2026). Copy pass in progress: edit here, never in the templates. */
export const HOME = {
  hero: {
    kick: "Level 7 Pictures · Abu Dhabi · Beirut · Since 2022",
    title: "Stories made for every screen.",
    titleAr: "حكايات لكل الشاشات",
    lead: "A production house founded in Lebanon in 2022. We develop, produce and deliver for regional and global platforms.",
    cta: { label: "Contact us", href: "/contact" },  // V8.1 §7: one outline button (was "See the productions" + "Brand reel")
    dotsLabel: "Featured titles",
  },
  /* Status cards under the hero (V8.1 §7). Kicker + meta come from the data and the launch switch:
     a title with a premiere shows "Netflix · in N days" → "Now on Netflix" and "Directed by … · 30 Oct". */
  statusCards: [
    { slug: "beit-hadam", href: "/productions/beit-hadam" },
    { slug: "obsess", href: "/said-el-marouk#obsess" },
  ],
  productions: { kick: "Our productions", title: "Produced by Level 7", link: "All productions →" },
  feature: { kick: "Directed by Said El Marouk", link: "Said's portfolio →" },
  people: {
    kick: "The people",
    title: "The people behind Level 7.",
    lead: "Producer Said El Marouk and co-producer Khouloud Daher lead Level 7, with one in-house team from the first draft to the delivery file.",
    link: "About Level 7 →",
    portraits: [
      { src: "/assets/img/said-producer.jpg", alt: "Said El Marouk on set", label: "Said El Marouk · Producer", pos: "50% 50%" }, // cropped from said-hero.jpg to match Khouloud's framing
      { src: "/assets/img/khouloud-daher.jpg", alt: "Khouloud Daher on set", label: "Khouloud Daher · Co-producer", pos: "45% 30%" },
    ],
  },
  services: { kick: "What we do", title: "One partner, every stage", link: "Services →" },
  news: { kick: "News", title: "Latest from the studio", link: "News & Press →" },
  contact: { title: ["Your story.", "Next."] },
};
