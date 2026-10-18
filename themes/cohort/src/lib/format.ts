const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const month = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const day = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** $14,000,000 — the full figure, as a tombstone sets it. */
export const dollars = (n: number) => usd.format(n);

/** $3.8M / $750K — for tables and controls. */
export function compact(n: number) {
  if (n >= 1_000_000)
    return `$${(n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0)}M`;
  return `$${Math.round(n / 1000)}K`;
}

/** "2025-09" or "2025-09-12" → "September 2025" / "September 12, 2025". */
export const monthYear = (iso: string) =>
  month.format(new Date(iso.length === 7 ? `${iso}-01` : iso));
export const longDate = (iso: string) => day.format(new Date(iso));

export const pct = (n: number) => `${n.toFixed(1)}%`;
