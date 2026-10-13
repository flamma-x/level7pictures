/* Said El Marouk: portfolio page copy (V8 design). Titles and their facts live in projects.js.
   pending() = shown as designed, blocks main until signed off. */
import { pending } from "./projects.js";

export const SAID = {
  name: "Said El Marouk",
  nameAr: "سعيد الماروق",
  role: "Founder & Director · Level 7 Pictures",
  quote: null, // cut 13 Oct 2026 (design copy, not a sourced quote)
  reel: "https://vimeo.com/saidelmarouk",
  imdb: "https://www.imdb.com/name/nm3656010/", // checked 13 Oct 2026: Said El Marouk, director/writer/producer
  portrait: { src: "/assets/img/said-portrait.jpg", alt: "Portrait of Said El Marouk" },
  numbers: [
    { v: "30+", l: "Years behind the camera", blue: true },
    { v: "70+", l: "Music videos" },
    { v: "5", l: "Production houses founded, incl. Level 7" },
    { v: "4", l: "Countries he has worked from" },
  ],
  obsessBlurb: "A man returns to Kuwait to mourn his father, and is drawn back into the grip of an obsessive love. Written by Eyad Saleh; starring Haya Abdulsalam, Yaqoub Al-Farhan and Laila Abdallah.",
  /* Selected work as director, in the design's order. Level 7 titles get the pill and link to their page. */
  selectedWork: [
    { slug: "obsess", line: "Netflix · 2026", alt: "Obsess", pos: "40% 50%" },
    { slug: "beit-hadam", line: "Shasha · Ramadan 2027", alt: "Beit Hadam", pos: "50% 30%" },
    { slug: "crime-of-love", line: "Shasha Originals · 2026", alt: "Crime of Love", pos: "50% 40%" },
    { slug: "djinn-wedding", line: "Monsters 2 · Shasha · 2026", alt: "Djinn Wedding", pos: "50% 20%" },
    { slug: "aminas-monster", line: "Monsters", alt: "Amina's Monster", pos: "50% 35%" },
    { slug: "monster-of-the-bank", line: "Monsters", alt: "Monster of the Bank", pos: "50% 35%" },
    { slug: "deep-state", line: "Series · 2023", alt: "The Deep State", pos: "50% 20%" },
    { slug: "the-money", line: "Feature · New Century · 2019", alt: "The Money", pos: "50% 20%" },
    { slug: "365-days", line: "Feature debut · 2011", alt: "365 Days of Happiness", pos: "50% 20%" },
  ],
  transformers: {
    kick: "International · 2009", title: "Transformers: Revenge of the Fallen",
    text: "Second unit director and visual consultant to Michael Bay on the Egyptian shoot (Paramount · DreamWorks).",
    image: { src: "/assets/img/transformers-wide.jpg", alt: "Transformers: Revenge of the Fallen, Egyptian shoot" },
  },
  bio: [
    "Born in Beirut in 1969 to deaf parents, Said El Marouk grew up fluent in a language made of image and gesture. It is still the language he directs in.",
    "He trained at the University Film Academy of Belgrade and in Düsseldorf, then spent the nineties in Germany as a first AD, editor and cameraman, and as a director and reporter for German and Arab broadcasters.",
    "Back in Beirut he directed more than seventy music videos for the biggest names in Arabic music, before moving into long form: his Egyptian feature debut, then a run of pan-Arab dramas. In 2020 he founded Level 7 Pictures.",
  ],
  bioImage: { src: "/assets/img/on-set.jpg", alt: "Said El Marouk working through a scene with an actress", pos: "30% 40%" },
  timeline: [
    { when: "1969", where: "Beirut", text: "Born in Beirut to deaf parents." },
    { when: "1988–1992", where: "Belgrade · Düsseldorf", text: "University Film Academy of Belgrade, then Düsseldorf." },
    { when: "1992–2000", where: "Germany", text: "First AD, editor, cameraman; reporter for German and Arab TV." },
    { when: "2000–2004", where: "Beirut", text: "More than seventy music videos. Best Special Effects, 2000." },
    { when: "2005–2009", where: "Beirut · Dubai", text: "Founds S.M Production, Seven Entertainments, Beywood Pictures and Room 11." },
    { when: "2009", where: "Egypt", text: "2nd unit director on Transformers: Revenge of the Fallen." },
    { when: "2011", where: "Cairo", text: "Feature debut, 365 Days of Happiness." },
    { when: "2019–2023", where: "Pan-Arab", text: pending("The Money, The Role, The Deep State.", "The Money, The Deep State.") }, // "The Role" awaits Said's confirmation (IMDb lists The Role – Dor El Omor, 2021)
    { when: "2020", where: "Lebanon", text: "Founds Level 7 Pictures." },
    { when: "2024", where: "Beirut", text: pending("The Lebanese Achievement award at BIAF.") },
    { when: "2025–2026", where: "Kuwait", text: "Monsters, Crime of Love, Djinn Wedding." },
    { when: "Oct 2026", where: "Netflix", text: "Obsess premieres on 30 October." },
    { when: "2027", where: "Shasha", text: "Beit Hadam, for Ramadan 2027." },
  ],
  musicIntro: "From 2000 he directed more than seventy music videos for the biggest names in Arabic music, and has continued since.",
  artists: ["Kadim El Saher", "Elissa", "Najwa Karam", "Haifa Wehbe", "Nawal El Zoghby", "Sherine", "Magida El Roumy", "Mohamad Mounir",
    "Wael Kfoury", "Fadel Shaker", "Assala", "Nawal El Kuwaitiya", "Assi El Hellany", "Rami Ayach", "Fares Karam", "Suzanne Tamim",
    "Madeleine Matar", "Moein Shreif", "Rouwaida El Mahrouki", "Samo Zein", "Houwaida", "Ahmad Al Abdallah", "Abdallah Rashad", "Melhem Zein"],
  awards: [
    { big: "2024", title: pending("The Lebanese Achievement"), note: pending("Honoured at BIAF, Beirut") },
    { big: "Jury", title: "Mentor Arabia", note: "Repeated service on animation and film panels" },
    { big: "2000", title: "Best Special Effects", note: "For the Mohamad Mounir music video" },
  ],
  houses: ["S.M Production · Beirut", "Seven Entertainments · Dubai", "Beywood Pictures · Beirut", "Room 11 · post-production, Beirut", "Level 7 Pictures · 2020"],
  also: ["Commercials, including El Abd Patisserie for Saatchi & Saatchi Egypt", "Live concerts across Western Europe", "Reporter for German and Arab TV"],
};
