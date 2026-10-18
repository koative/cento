const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const money = (n: number) => usd.format(n);

/** $48.6k / $1.2M — for tight columns and chart labels. */
export function short(n: number) {
  const abs = Math.abs(n);
  const sign = n < 0 ? "−" : "";
  if (abs >= 1e6) return `${sign}$${(abs / 1e6).toFixed(abs >= 1e7 ? 0 : 1)}M`;
  if (abs >= 1e3)
    return `${sign}$${(abs / 1e3).toFixed(abs >= 1e5 ? 0 : 1).replace(/\.0$/, "")}k`;
  return `${sign}$${abs}`;
}

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  timeZone: "UTC",
});
const full = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const shortDate = (iso: string) => day.format(new Date(iso));
export const longDate = (iso: string) => full.format(new Date(iso));

/** Whole days from a to b (ISO dates). */
export const daysBetween = (a: string, b: string) =>
  Math.round((Date.parse(b) - Date.parse(a)) / 864e5);

/** "today" / "1 day ago" / "6 days ago". */
export function ago(iso: string, today: string) {
  const d = daysBetween(iso, today);
  return d === 0 ? "today" : d === 1 ? "1 day ago" : `${d} days ago`;
}

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");
