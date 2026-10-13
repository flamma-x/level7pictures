/* Level 7 Pictures: About page copy (V8 design). Unknowns stay as [placeholders]. */
export const COMPANY = {
  kickAr: "من نحن",
  title: "Founded in Lebanon in 2020.",
  // approved 13 Oct 2026: Netflix removed (Obsess/Netflix appears only on the Said El Marouk page)
  intro: "Level 7 Pictures is a film and television production house registered in Dubai and Lebanon. We develop, produce and deliver Arab drama for regional and global platforms, with Shasha among the platforms our work streams on.",
  stats: [
    { v: "2020", l: "Founded in Lebanon", blue: true },
    { v: "DXB · BEY", l: "Registered offices" },
    { v: "level7-count", l: "Level 7 productions" }, // computed from projects.js
    { v: null, ph: "[N]", l: "Crew members on our last shoot" }, // number to come; tile hidden under PRUNE
  ],
  storyTitle: "Six years, three productions",
  story: [
    { when: "2020", what: "Founded in Lebanon", text: "Level 7 Pictures starts in Beirut; later registered in Dubai too." },
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
      image: { src: "/assets/img/said-hero.jpg", alt: "Said El Marouk on set", pos: "55% 35%" } },
    { name: "Khouloud Daher", nameAr: "[الاسم بالعربية]", role: "Co-producer",
      bio: "[Bio from Khouloud: her role at Level 7, what she oversees, and the productions she co-produced.]",
      image: { src: "/assets/img/khouloud-daher.jpg", alt: "Khouloud Daher on set", pos: "45% 30%" } },
  ],
  whereTitle: "Two offices. Shoots across the region.",
  offices: [{ city: "Dubai", address: null }, { city: "Beirut", address: null }],
  shotIn: "Lebanon · Kuwait · Cuba · [more]",
  platforms: "Shasha", // approved 13 Oct 2026: Netflix removed
};
