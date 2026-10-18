import { endpoints, guides, releases, resources } from "../content";

export type Kind = "Guide" | "API" | "Changelog";
export type Hit = {
  kind: Kind;
  title: string;
  meta: string;
  to: string;
  text: string;
  snippet: string;
};

const plain = (s: string) => s.replace(/`/g, "");

// ponytail: linear scan over ~60 entries; swap for a prebuilt inverted index if the docs grow past a few thousand pages.
const INDEX: Omit<Hit, "snippet">[] = [
  ...guides.flatMap((g) => [
    {
      kind: "Guide" as const,
      title: g.title,
      meta: `${g.topic} · ${g.minutes} min`,
      to: `/guides/${g.slug}`,
      text: plain(g.summary),
    },
    ...g.sections.map((s) => ({
      kind: "Guide" as const,
      title: `${g.title} › ${s.heading}`,
      meta: g.topic,
      to: `/guides/${g.slug}`,
      text: plain(
        [...s.body, ...(s.steps ?? []), s.note?.text ?? ""].join(" "),
      ),
    })),
  ]),
  ...resources.map((r) => ({
    kind: "API" as const,
    title: r.name,
    meta: "Resource",
    to: `/api/${r.slug}`,
    text: r.summary,
  })),
  ...endpoints.map((e) => ({
    kind: "API" as const,
    title: `${e.summary} · ${e.op}`,
    meta: `${e.method} ${e.path}`,
    to: `/api/${e.resource}`,
    text: e.description,
  })),
  ...releases.map((r) => ({
    kind: "Changelog" as const,
    title: `${r.version} · ${r.title}`,
    meta: r.date,
    to: "/changelog",
    text: plain([r.body, ...r.changes.map((c) => c.text)].join(" ")),
  })),
];

export function search(query: string, kind: Kind | "All"): Hit[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return INDEX.filter((e) => kind === "All" || e.kind === kind)
    .map((e) => {
      const hay = `${e.title} ${e.meta} ${e.text}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = terms.reduce(
        (s, t) => s + (e.title.toLowerCase().includes(t) ? 3 : 1),
        0,
      );
      const at = Math.max(0, e.text.toLowerCase().indexOf(terms[0]) - 50);
      const snippet =
        (at ? "…" : "") +
        e.text.slice(at, at + 160) +
        (at + 160 < e.text.length ? "…" : "");
      return { ...e, snippet, score };
    })
    .filter((h) => h !== null)
    .sort((a, b) => b.score - a.score);
}
