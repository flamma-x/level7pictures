/* Services: one source for the Home teaser (homeTitle + short) and /services (title + long + tags). */
import { pending } from "./projects.js";

export const SERVICES = [
  { id: "production", homeTitle: "Production", title: "Production",
    short: "Drama series and features for broadcasters and streamers.",
    long: "Drama series and features for regional broadcasters and global streamers, shot in Lebanon, the Gulf and beyond.",
    tags: ["Series", "Features", "Streaming originals"],
    image: { src: "/assets/img/on-set-desert.jpg", alt: "Shooting on location", pos: "50% 40%" } },
  { id: "development", homeTitle: "Development & packaging", title: "Development & packaging",
    short: "Concepts, scripts and talent, ready to commission.",
    long: "Shaping concepts, scripts and talent into projects ready for financing and commissioning, including literary adaptations.",
    tags: ["Scripts", "Adaptations", "Casting", pending("Financing")], // implies Level 7 arranges financing: awaiting sign-off
    image: { src: "/assets/img/svc-development.jpg", alt: "Working through a scene with an actress", pos: "50% 30%" } },
  { id: "management", homeTitle: "Production management", title: "Production management",
    short: "Crews, schedules and budgets across the region.",
    long: pending("Crews, schedules and budgets run across Lebanon, the Gulf and Egypt."), // no Level 7 shoot in Egypt on record
    tags: ["Crews", "Schedules", "Budgets", "Locations"],
    image: { src: "/assets/img/svc-management.jpg", alt: "Cast and crew on set", pos: "50% 50%" } },
  { id: "post", homeTitle: "Post & delivery", title: "Post-production & delivery",
    short: "Editorial, finishing and platform-spec delivery.",
    long: "Editorial, colour, finishing and delivery to broadcast and streaming specifications.",
    tags: ["Edit", "Colour", "Sound", "Delivery"],
    image: { src: "/assets/img/obsess-night.jpg", alt: "Colour-graded frame", pos: "50% 50%" } },
];

export const STEPS = [
  { t: "Develop", d: "Idea, script and creative team." },
  { t: "Package", d: "Cast, budget and schedule for commissioning." },
  { t: "Produce", d: "Prep, shoot and day-to-day production." },
  { t: "Deliver", d: "Post and platform-spec masters." },
];
