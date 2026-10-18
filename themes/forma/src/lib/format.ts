import type { Post } from "../content";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const longDate = (iso: string) =>
  dateFormat.format(new Date(iso + "T12:00:00"));

/** Reading time at ~220 words a minute, never less than one. */
export function readMinutes(post: Post) {
  const words = post.body
    .map((b) => ("p" in b ? b.p : "h" in b ? b.h : b.quote))
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const area = (m2: number) => m2.toLocaleString("en-GB") + " m²";

/** Query string of the current hash route, e.g. #/projects?type=Homes. */
export const hashQuery = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "");
