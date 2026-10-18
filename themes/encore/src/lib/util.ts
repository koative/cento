import { days, type Hours } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/** Local-midnight Date from an ISO day, so "2026-10-24" never slips a day across time zones. */
export const day = (iso: string) => new Date(iso + "T00:00:00");

const fmt = (o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", o);
const dShort = fmt({ month: "short", day: "numeric" });
const dLong = fmt({ weekday: "long", month: "long", day: "numeric" });
const dWeek = fmt({ weekday: "short", month: "short", day: "numeric" });
const dYear = fmt({ month: "short", day: "numeric", year: "numeric" });

export const shortDate = (iso: string) => dShort.format(day(iso));
export const longDate = (iso: string) => dLong.format(day(iso));
export const weekDate = (iso: string) => dWeek.format(day(iso));

/** "Oct 9 – Nov 8, 2026" */
export const runDates = (opens: string, closes: string) =>
  `${shortDate(opens)} – ${dYear.format(day(closes))}`;

export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

/* ------------------------------------------------------------ box office hours */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

export function openStatus(hours: Hours[], now = new Date()) {
  const today = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const h = hours[today];
  if (h && mins >= toMin(h[0]) && mins < toMin(h[1]))
    return { open: true, label: `Box office open until ${clock(h[1])}` };
  if (h && mins < toMin(h[0]))
    return { open: false, label: `Box office opens ${clock(h[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const next = hours[(today + i) % 7];
    if (next)
      return {
        open: false,
        label: `Box office opens ${i === 1 ? "tomorrow" : days[(today + i) % 7]} ${clock(next[0])}`,
      };
  }
  return { open: false, label: "Box office closed" };
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/** Native constraint validation with our own wording; focuses the first bad field. */
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
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
  return errors;
}

/** Fake latency so loading states are visible. */
export const pause = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
