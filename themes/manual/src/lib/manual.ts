import { articles, categories, type Article, type Block } from "../content";

export const categoryOf = (slug: string) =>
  categories.find((c) => c.slug === slug);
export const chapterOf = (slug: string) =>
  categories.findIndex((c) => c.slug === slug) + 1;
export const articleBySlug = (slug: string) =>
  articles.find((a) => a.slug === slug);
export const articlesIn = (category: string) =>
  articles.filter((a) => a.category === category);

/** Manual reference such as "2.3": chapter number, then position in the chapter. */
export const codeOf = (a: Article) =>
  `${chapterOf(a.category)}.${articlesIn(a.category).indexOf(a) + 1}`;

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/* ------------------------------------------------------------ dates */

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const eastern = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
});
const easternTime = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "America/New_York",
});

/** "Oct 9, 2026" for a date-only string. */
export const formatDay = (iso: string) =>
  day.format(new Date(iso.length === 10 ? iso + "T12:00:00Z" : iso));
/** "Oct 18, 8:12 AM" in Eastern time. */
export const formatStamp = (iso: string) =>
  eastern.format(new Date(iso)) + " ET";
export const formatTime = (iso: string) =>
  easternTime.format(new Date(iso)) + " ET";

/** "2 days ago" relative to a fixed reference instant. */
export function ago(iso: string, now: string) {
  const mins = Math.round((Date.parse(now) - Date.parse(iso)) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours} h ago`;
  const days = Math.round(hours / 24);
  return days === 1 ? "yesterday" : `${days} days ago`;
}

/* ------------------------------------------------------------ search */

function blockText(b: Block): string {
  switch (b.t) {
    case "p":
    case "h":
    case "callout":
      return b.text;
    case "steps":
    case "list":
      return b.items.join(" ");
    case "figure":
      return b.caption;
    case "table":
      return [...b.head, ...b.rows.flat()].join(" ");
  }
}

const bodies: Record<string, string> = Object.fromEntries(
  articles.map((a) => [
    a.slug,
    a.body
      .map(blockText)
      .join(" ")
      .replace(/\*\*|`|\[\[|\]\]/g, ""),
  ]),
);

const stop: Record<string, true> = Object.fromEntries(
  "a an the my i to is it of on in for and or how do does can what why with"
    .split(" ")
    .map((w) => [w, true]),
);

/** Lower-case search words, apostrophes kept so "won't" stays one word. */
export const terms = (q: string) =>
  q
    .toLowerCase()
    .split(/[^a-z0-9'’]+/)
    .map((w) => w.replace(/^['’]+|['’]+$/g, ""))
    .filter((w) => w.length > 1 && !stop[w]);

const words = (s: string) => s.toLowerCase().split(/[^a-z0-9'’]+/);
/** Whole-word or prefix hits, so "pai" finds "pair" while you type. */
const hits = (haystack: string[], t: string) =>
  haystack.filter((w) => w.startsWith(t)).length;

export type Result = { article: Article; score: number; snippet: string };

export function search(query: string): Result[] {
  const ts = terms(query);
  if (!ts.length) return [];
  const out: Result[] = [];
  for (const a of articles) {
    const body = bodies[a.slug];
    const title = words(a.title);
    const tags = a.tags.flatMap(words);
    const summary = words(a.summary);
    const text = words(body);
    let score = 0;
    let matched = 0;
    for (const t of ts) {
      const s =
        hits(title, t) * 8 +
        hits(tags, t) * 5 +
        hits(summary, t) * 3 +
        Math.min(hits(text, t), 4);
      if (s) matched++;
      score += s;
    }
    if (!score) continue;
    // Articles matching every word outrank ones matching a single loud word.
    score *= matched / ts.length;
    out.push({
      article: a,
      score: score + a.reads / 5000,
      snippet: snippetFor(body, ts) ?? a.summary,
    });
  }
  return out.sort((x, y) => y.score - x.score);
}

function snippetFor(body: string, ts: string[]) {
  const sentences = body.match(/[^.!?]+[.!?]?/g) ?? [];
  const hit = sentences.find((s) =>
    ts.some((t) => words(s).some((w) => w.startsWith(t))),
  );
  return hit?.trim();
}
