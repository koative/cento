import { films, type Film } from "../content";

export const filmBySlug = (slug: string): Film | undefined =>
  films.find((f) => f.slug === slug);

/** 64.5 → "00:01:04:12" at 24 frames per second, the way an edit timeline reads. */
export function timecode(seconds: number) {
  const frames = Math.floor(seconds * 24);
  const pad = (n: number) => String(n).padStart(2, "0");
  const ss = Math.floor(frames / 24);
  return `${pad(Math.floor(ss / 3600))}:${pad(Math.floor(ss / 60) % 60)}:${pad(ss % 60)}:${pad(frames % 24)}`;
}

const dayFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});
const monthFmt = new Intl.DateTimeFormat("en-GB", {
  month: "long",
  year: "numeric",
});
const fullFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const asDate = (iso: string) => new Date(iso + "T12:00:00");
export const dayLabel = (iso: string) => dayFmt.format(asDate(iso));
export const monthLabel = (iso: string) => monthFmt.format(asDate(iso));
export const fullDate = (iso: string) => fullFmt.format(asDate(iso));

/** Query string after the hash route: #/contact?type=screening → "screening". */
export const hashParam = (key: string) =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(key);

export const runtimeLabel = (min: number) =>
  min >= 60 ? `${Math.floor(min / 60)} h ${min % 60} min` : `${min} min`;

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Returns an empty object when the form is valid and focuses the first bad field otherwise.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements)) {
    if (!(
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ))
      continue;
    if (el.name && !el.disabled && !el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  Object.assign(errors, extra);
  const first = Object.keys(errors)[0];
  if (first)
    (form.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
  return errors;
}

/** Fake network latency so the sending state is visible. Nothing leaves the browser. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
