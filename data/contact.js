/* Contact routes, inquiry types and careers copy (V8 design). One source for Home's "Your story. Next." cards,
   the /contact route cards and both forms. */
import { SITE } from "./projects.js";

const mail = (subject) => `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;

/* id = the ?route= value that pre-selects the inquiry type on /contact */
export const ROUTES = [
  { k: "A", id: "co-production", title: "Co-productions & commissions", sub: "Platforms, broadcasters, producers", href: mail("Co-production"), inquiry: "Co-production / commission" },
  { k: "B", id: "talent", title: "Talent", sub: "Reels and scripts", href: mail("Talent submission"), inquiry: "Talent submission" },
  { k: "C", id: "crew", title: "Crew", sub: "Join a production", href: "/careers", inquiry: "Crew" },
  { k: "D", id: "press", title: "Press", sub: "Kits, screeners, interviews", href: "/news", inquiry: "Press" },
];
export const INQUIRIES = [...ROUTES.map((r) => r.inquiry), "Something else"];

export const CAREERS = {
  /* The "Next production" open call. null → card hidden (decided 13 Oct). Shape: { role, department, details } */
  openCall: null,
  calls: [
    { pill: "Ongoing", title: "Crew database", text: "Every department, Lebanon and the Gulf. Sign up below." },
    { pill: "Ongoing", title: "Talent submissions", text: "Actors and writers: reels and scripts reviewed for upcoming slates." },
  ],
  departments: ["Acting", "Writing", "Directing", "Camera", "Production", "Art", "Costume & make-up", "Sound", "Post-production"],
  privacyNote: "We keep your details only to contact you about productions.",
};
