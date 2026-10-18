import { instructions, offlineRules } from "../content";

export const words = (s: string) =>
  s.match(/[A-Za-z0-9’'$%.,-]+/g)?.filter((w) => /[A-Za-z0-9]/.test(w)) ?? [];

/** Flesch–Kincaid grade with a vowel-group syllable estimate; good enough to compare two drafts. */
export function readingGrade(s: string) {
  const list = words(s);
  if (!list.length) return 0;
  const sentences = Math.max(
    1,
    s.split(/[.!?:]+(?:\s|$)/).filter((x) => x.trim()).length,
  );
  const syllables = list.reduce((sum, w) => {
    const core = w
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .replace(/e$/, "");
    return sum + Math.max(1, core.match(/[aeiouy]+/g)?.length ?? 1);
  }, 0);
  const grade =
    0.39 * (list.length / sentences) + 11.8 * (syllables / list.length) - 15.59;
  return Math.max(1, Math.round(grade * 10) / 10);
}

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Lucid's offline pass: swaps wordy phrases for plain ones and drops filler, keeping capitals and punctuation tidy. */
export function plainPass(text: string) {
  let out = text;
  for (const [find, replace] of offlineRules) {
    out = out.replace(new RegExp(`\\b${escape(find)}\\b,?`, "gi"), (m) => {
      const r = replace && m.endsWith(",") ? replace + "," : replace;
      return /^[A-Z]/.test(m) && r ? r[0].toUpperCase() + r.slice(1) : r;
    });
  }
  return out
    .replace(/[ \t]{2,}/g, " ")
    .replace(/ ([,.;:!?])/g, "$1")
    .replace(/,([.;:!?])/g, "$1")
    .replace(
      /(^|[.!?]\s+)([a-z])/g,
      (_, a: string, b: string) => a + b.toUpperCase(),
    )
    .trim();
}

/** Map a free-text prompt to one of the demo's instructions; null when nothing matches. */
export function matchInstruction(prompt: string) {
  const p = prompt.toLowerCase();
  return (
    instructions.find(
      (i) =>
        i.label.toLowerCase() === p.trim() ||
        i.keywords.some((k) => p.includes(k)),
    ) ?? null
  );
}

export const num = (n: number) => n.toLocaleString("en-US");
export const pct = (n: number) => `${Math.round(n * 100)}%`;
export const date = (
  iso: string,
  opts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  },
) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", opts);

if (import.meta.env.DEV) {
  console.assert(
    plainPass("In order to start, we really need to utilize it.") ===
      "To start, we need to use it.",
    "plainPass",
    plainPass("In order to start, we really need to utilize it."),
  );
  console.assert(
    matchInstruction("make it friendlier")?.id === "warmer",
    "matchInstruction",
  );
}
