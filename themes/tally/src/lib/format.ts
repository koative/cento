const usd0 = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const ledger = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** $1,150 */
export const dollars = (n: number) => usd0.format(n);

/** Accounting style: 4,200.00 and (4,200.00) for negatives. */
export const amount = (n: number) =>
  n < 0 ? `(${ledger.format(-n)})` : ledger.format(n);

export const fmt = {
  long: new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
  short: new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }),
  monthYear: new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }),
  month: new Intl.DateTimeFormat("en-US", { month: "short" }),
  weekday: new Intl.DateTimeFormat("en-US", { weekday: "short" }),
  published: new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
};

export const inDays = (days: number) =>
  days === 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;

/** "2026-09-24" → a local date (no UTC shift). */
export function isoDate(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
