const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const day = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export const usd = (n: number) => money.format(n);

/** "2026-09-02" → "2 September 2026". */
export const longDate = (iso: string) =>
  day.format(new Date(`${iso}T00:00:00Z`));
