// Build flags, persisted in build/config.json so every build (including the pre-push hook) renders the same site.
//   prune  true → every [placeholder] and pending() item is removed cleanly instead of shown (launch cut-off).
//   forms  true → the Careers and Contact forms are rendered (switch on once Resend + a privacy notice exist).
import fs from "fs";
import path from "path";
import { ROOT } from "./lib-root.mjs";

const FILE = path.join(ROOT, "build/config.json");
export const FLAGS = { prune: false, forms: false, ...(fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, "utf8")) : {}) };
export const saveFlags = () => fs.writeFileSync(FILE, JSON.stringify({ prune: FLAGS.prune, forms: FLAGS.forms }, null, 2) + "\n");
