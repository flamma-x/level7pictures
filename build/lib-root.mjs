// Repo root, shared by the build tools (kept separate so build/images.mjs runs before images.json exists).
import path from "path";
import { fileURLToPath } from "url";
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
