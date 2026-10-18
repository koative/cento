import {
  articles,
  contributors,
  issues,
  sections,
  type Article,
} from "../content";

export const sectionOf = (slug: string) =>
  sections.find((s) => s.slug === slug)!;
export const contributorOf = (slug: string) =>
  contributors.find((c) => c.slug === slug)!;
export const issueOf = (no: number) => issues.find((i) => i.no === no);
export const articleOf = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const wordCount = (a: Article) =>
  a.body.reduce(
    (n, b) => n + ("text" in b ? b.text.split(/\s+/).length : 0),
    0,
  );
/** Online reading time at 230 words a minute. */
export const minutes = (a: Article) =>
  Math.max(1, Math.round(wordCount(a) / 230));
/** Pages the piece runs across in print: text at ~150 words a page plus a spread per figure. */
export const printPages = (a: Article) =>
  Math.max(
    4,
    Math.round(wordCount(a) / 150) +
      a.body.filter((b) => b.type === "figure").length * 2,
  );

export const money = (n: number) =>
  "$" + (Number.isInteger(n) ? n : n.toFixed(2));

export const longDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const byIssueThenPage = (a: Article, b: Article) =>
  b.issue - a.issue || a.page - b.page;
