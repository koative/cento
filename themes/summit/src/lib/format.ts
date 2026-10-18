import { hours, type Hours } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => (n === 0 ? "Free" : usd.format(n));

/** "2026-10-29" → local Date at midnight (no UTC shift). */
export function toDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isoOf(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const short = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
const long = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});
export const shortDate = (iso: string) => short.format(toDate(iso));
export const longDate = (iso: string) => long.format(toDate(iso));

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Open/closed right now plus the next change. Hours never cross midnight here. */
export function openStatus(now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const [open, close] = hours[day];
  if (mins >= toMin(open) && mins < toMin(close))
    return { open: true, label: `Open now until ${close}` };
  if (mins < toMin(open))
    return { open: false, label: `Closed · opens ${open} today` };
  return {
    open: false,
    label: `Closed · opens ${hours[(day + 1) % 7][0]} tomorrow`,
  };
}

/** Arrival slots every two hours from opening until two hours before closing. */
export function slotsFor(h: Hours) {
  const out: string[] = [];
  for (let m = toMin(h[0]); m <= toMin(h[1]) - 120; m += 120)
    out.push(`${String(m / 60).padStart(2, "0")}:00`);
  return out;
}
