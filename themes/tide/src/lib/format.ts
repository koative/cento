const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});
const gbpPence = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});
const num = new Intl.NumberFormat("en-GB");

export const money = (n: number) =>
  (Number.isInteger(n) ? gbp : gbpPence).format(n);
export const count = (n: number) => num.format(n);

/** "2026-10-24" → Date at local noon, so the weekday never slips across time zones. */
export const day = (iso: string) => new Date(`${iso}T12:00:00`);

export const longDate = (iso: string) =>
  day(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const shortDate = (iso: string) =>
  day(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
