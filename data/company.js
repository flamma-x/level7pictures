/* Level 7 Pictures: About page copy (V8 design, verified content 14 Oct 2026). */
export const COMPANY = {
  kickAr: "من نحن",
  title: "Founded in Lebanon in 2022.",
  // approved 13 Oct 2026: Netflix removed from the intro (Obsess/Netflix appears on the Said El Marouk page)
  // 14 Oct 2026: Dubai → Abu Dhabi everywhere
  intro: "Level 7 Pictures is a film and television production house registered in Abu Dhabi and Lebanon. We develop, produce and deliver Arab drama for regional and global platforms, with Shasha among the platforms our work streams on.",
  stats: [
    { v: "2022", l: "Founded in Lebanon", blue: true },
    { v: "AUH · BEY", l: "Registered offices" },
    { v: "level7-count", l: "Level 7 productions" }, // computed from projects.js
    // crew-members stat dropped 14 Oct 2026
  ],
  storyTitle: "Four years, three productions",
  story: [
    { when: "2022", what: "Founded in Lebanon", text: "Level 7 Pictures starts in Beirut; later registered in Abu Dhabi too." },
    { when: "2023", what: "The Deep State", text: "Eight-episode political thriller, shot in Lebanon, Cuba and Kuwait." },
    { when: "2026", what: "Djinn Wedding", text: "A Monsters 2 story for Shasha, Ramadan 2026." },
    { when: "Aug 2026", what: "Beit Hadam shoots", text: "Filming begins on the Buthaina Al-Essa adaptation." },
    { when: "2027", what: "Beit Hadam premieres", text: "On Shasha for Ramadan 2027." },
  ],
  leadersKick: "The people",
  leadersTitle: "The people behind Level 7",
  leaders: [
    { name: "Said El Marouk", nameAr: "سعيد الماروق", role: "Producer", link: "/said-el-marouk", linkText: "Full portfolio →",
      bio: "Producer at Level 7, with more than thirty years behind the camera. He leads the slate, from The Deep State to Djinn Wedding and Beit Hadam.",
      image: { src: "/assets/img/said-producer.jpg", alt: "Said El Marouk on set", pos: "50% 50%" } }, // same framing as Khouloud
    { name: "Khouloud Daher", nameAr: "خلود ضاهر", role: "Co-producer", // verified 14 Oct 2026
      bio: "Co-producer at Level 7 Pictures. Khouloud runs production across the slate, from Monsters to Djinn Wedding and Beit Hadam.",
      image: { src: "/assets/img/khouloud-daher.jpg", alt: "Khouloud Daher on set", pos: "45% 30%" } }, // hi-res portrait coming
  ],
  whereTitle: "Two offices. Shoots across the region.",
  /* address shown only when known (no placeholder) */
  offices: [{ city: "Abu Dhabi", address: "twofour54, PO Box 769490" }, { city: "Beirut", address: null }],
  // "We've shot in" block removed 14 Oct 2026: Level 7 shoots in any country
  platforms: "Shasha",
};
