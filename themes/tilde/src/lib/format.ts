import type { Post } from "../content";

const day = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});
const month = new Intl.DateTimeFormat("en-GB", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-14" → "14 Sep 2026" */
export function formatDate(iso: string) {
  return day.format(new Date(iso + "T00:00:00Z"));
}

/** "2026-11" → "Nov 2026" */
export function formatMonth(iso: string) {
  return month.format(new Date(iso + "-01T00:00:00Z"));
}

/** Reading time at 220 words a minute, code included. */
export function readingMinutes(post: Post) {
  const text = post.body
    .map((b) =>
      "p" in b
        ? b.p
        : "h" in b
          ? b.h
          : "code" in b
            ? b.code
            : "list" in b
              ? b.list.join(" ")
              : b.quote,
    )
    .join(" ");
  return Math.ceil(text.split(/\s+/).length / 220);
}
