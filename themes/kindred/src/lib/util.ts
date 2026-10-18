import { days, fees, type Animal, type Hours } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

export function ageLabel(months: number) {
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"}`;
}

export type AgeGroup = "baby" | "young" | "adult" | "senior";
export const ageGroups: { value: AgeGroup; label: string }[] = [
  { value: "baby", label: "Under 1 year" },
  { value: "young", label: "1–3 years" },
  { value: "adult", label: "3–8 years" },
  { value: "senior", label: "8 years +" },
];
export function ageGroup(months: number): AgeGroup {
  if (months < 12) return "baby";
  if (months < 36) return "young";
  if (months < 96) return "adult";
  return "senior";
}

export const feeFor = (a: Animal) =>
  fees.find((f) => f.species === a.species && a.ageMonths < f.maxMonths)
    ?.price ?? 0;

/* ------------------------------------------------------------ hours */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** Open/closed right now plus the next change, from a Sunday-first week of same-day hours. */
export function openStatus(week: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = week[day];
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Open now until ${clock(today[1])}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Opens today at ${clock(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const h = week[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Closed · opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} at ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;
type Container = HTMLFormElement | HTMLFieldSetElement;

/**
 * Native constraint validation with our own wording per field name, over a form or one fieldset of it.
 * Returns an empty object when valid; otherwise focuses the first bad field.
 */
export function validate(
  scope: Container,
  messages: Record<string, string>,
  extra: Errors = {},
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(scope.elements)) {
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
    const target = scope.querySelector<HTMLElement>(`[name="${first}"]`);
    target?.focus();
  }
  return errors;
}

/** Fake network latency so loading states are visible. Nothing is sent anywhere. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/** Short demo reference like KIN-4821. */
export const reference = (prefix: string) =>
  `${prefix}-${String(Math.floor(1000 + Math.random() * 9000))}`;
