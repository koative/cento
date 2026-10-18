const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

/** $86.4M for contract values, $412,000 below a million. */
export const money = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : usd.format(n);

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});
const month = new Intl.DateTimeFormat("en-US", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export const dateLabel = (iso: string) => day.format(new Date(iso));

/** Calendar month a programme week falls in, from the project's start date. */
export const monthAt = (startIso: string, week: number) =>
  month.format(new Date(Date.parse(startIso) + week * 7 * 86_400_000));
