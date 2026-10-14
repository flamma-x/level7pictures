/* News items, newest first. Home shows the first three; /news lists them all. Copy as approved in the V8 design.
   source.url: the article (checked 13 Oct 2026). source.project: take the URL from that title's `link` in projects.js;
   while it is null the source line is hidden. */
export const NEWS = [
  { id: "obsess-premiere", date: "Oct 2026", title: "Obsess, directed by Said El Marouk, premieres on Netflix on 30 October 2026",
    image: { src: "/assets/img/obsess-candles.jpg", pos: "40% 50%" },
    source: { name: "Netflix", project: "obsess" } },
  { id: "beit-hadam-filming", date: "Aug 2026", title: "Cameras roll on Beit Hadam, adapted from Buthaina Al-Essa's novel",
    image: { src: "/assets/img/bhd-still.jpg", pos: "50% 30%" },
    source: { name: "Sayidaty", url: "https://www.sayidaty.net/node/1837453", lang: "ar" } },        // 3 Aug 2026: filming begins, Shasha, Ramadan 2027
  { id: "djinn-wedding-trends", date: "Feb 2026", title: "Djinn Wedding trends across the Gulf during Ramadan",
    image: { src: "/assets/posters/djinn-wedding.jpg", pos: "50% 22%" },
    source: { name: "Al Jazeera", lang: "ar",                                                       // 22 Feb 2026: #عرس_الجن trended within hours
      url: "https://www.aljazeera.net/arts/2026/2/22/%D9%85%D8%B3%D9%84%D8%B3%D9%84-%D8%B9%D8%B1%D8%B3-%D8%A7%D9%84%D8%AC%D9%86-%D8%AD%D9%8A%D9%86-%D9%8A%D8%AA%D8%AD%D9%88%D9%84-%D8%A7%D9%84%D9%81%D9%88%D9%84%D9%83%D9%84%D9%88%D8%B1" } },
];
