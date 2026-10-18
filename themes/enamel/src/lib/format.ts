import { days, type Hours, type Treatment } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(Math.round(n));

/** "$160–$290" or "$145"; pass a factor for member prices. */
export const priceRange = (
  t: Pick<Treatment, "price" | "priceTo">,
  factor = 1,
) =>
  t.priceTo
    ? `${money(t.price * factor)}–${money(t.priceTo * factor)}`
    : money(t.price * factor);

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "Dr. Mira Okafor" → "MO" */
export const initials = (name: string) =>
  name
    .replace("Dr. ", "")
    .split(" ")
    .map((w) => w[0])
    .join("");

/** 9:15 → "9:15 am", 14:00 → "2 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** "Tue, Oct 21" */
export const dayLabel = (
  d: Date,
  opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  },
) => d.toLocaleDateString("en-US", opts);

/** Open/closed right now plus the next change, from a Sunday-first week of hours. */
export function openStatus(week: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = week[day];
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Open now · until ${clock(today[1])}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Closed · opens ${clock(today[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const h = week[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Closed · opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/** Native constraint validation with our own wording per field; focuses the first bad field. */
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

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
