import { days, type Hours } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export const fromMin = (n: number) =>
  `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

/** "14:20" → "2:20 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

export const duration = (min: number) =>
  min < 60
    ? `${min} min`
    : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60} min` : ""}`;

/** Open/closed right now plus the next change, from a Sunday-first week of hours. */
export function openStatus(hours: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hours[day];
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Open until ${clock(today[1])}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Opens ${clock(today[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const h = hours[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation, worded per field name.
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
  if (first) {
    const target = form.elements.namedItem(first);
    const el =
      target instanceof RadioNodeList
        ? (target[0] as HTMLElement | undefined)
        : (target as HTMLElement | null);
    el?.focus();
  }
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
