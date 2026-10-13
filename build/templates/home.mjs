// Home (/) — Phase 1 checkpoint: shell only while the menu is reviewed. Sections follow in the next step.
import { layout } from "./layout.mjs";

export default () => ({
  path: "index.html",
  html: layout({
    page: "/",
    title: "Level 7 Pictures · Arab drama, made for every screen",
    description: "Level 7 Pictures is a production house founded in Lebanon in 2020. We develop, produce and deliver series for regional and global platforms.",
    body: `<section class="wrap" style="min-height:100vh;padding-top:140px"><span class="kick">Level 7 Pictures · Dubai · Beirut · Since 2020</span></section>`,
  }),
});
