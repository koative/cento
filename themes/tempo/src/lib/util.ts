import type { DanceClass } from "../content";

/** "18:30" → "6:30 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const endOf = (c: DanceClass) => {
  const end = toMin(c.start) + c.mins;
  return `${Math.floor(end / 60)}:${String(end % 60).padStart(2, "0")}`;
};

export const overlaps = (a: DanceClass, b: DanceClass) =>
  a.day === b.day &&
  toMin(a.start) < toMin(b.start) + b.mins &&
  toMin(b.start) < toMin(a.start) + a.mins;

/** Monday = 0, matching the timetable. */
export const todayIndex = (now = new Date()) => (now.getDay() + 6) % 7;

/** Classes still to start today, or tomorrow's first ones when today is done. */
export function upNext(all: DanceClass[], count = 4, now = new Date()) {
  const today = todayIndex(now);
  const mins = now.getHours() * 60 + now.getMinutes();
  const sorted = [...all].sort((a, b) => toMin(a.start) - toMin(b.start));
  const left = sorted.filter((c) => c.day === today && toMin(c.start) > mins);
  if (left.length)
    return { label: "Still to come today", items: left.slice(0, count) };
  const tomorrow = (today + 1) % 7;
  return {
    label: "First up tomorrow",
    items: sorted.filter((c) => c.day === tomorrow).slice(0, count),
  };
}

/** The next calendar date for a timetable weekday, from tomorrow onwards. */
export function nextDate(day: number, now = new Date()) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  d.setDate(d.getDate() + (((day - todayIndex(now) + 6) % 7) + 1));
  return d;
}

export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/** "2026-10-30" → { day: "30", month: "Oct", weekday: "Fri" } without timezone drift. */
export function dateParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return {
    date,
    day: String(d),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
}

/** Read ?key= from the hash route (#/trial?style=salsa); the router ignores queries. */
export const queryParam = (key: string) =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "").get(key) ?? "";

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/** Native constraint validation with our own wording per field; focuses the first bad field. */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
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
  const first = Object.keys(errors)[0];
  if (first) {
    const el = form.elements.namedItem(first);
    (el instanceof RadioNodeList
      ? (el[0] as HTMLElement)
      : (el as HTMLElement | null)
    )?.focus();
  }
  return errors;
}

/** Fake network latency so the loading state is visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
