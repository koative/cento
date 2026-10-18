const euro = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const euroCents = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});
const number = new Intl.NumberFormat("en-IE");
const stamp = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const day = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "short",
});
const long = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const eur = (n: number) => euro.format(n);
export const eurCents = (n: number) => euroCents.format(n);
export const num = (n: number) => number.format(Math.round(n));
export const when = (d: Date) =>
  stamp
    .format(d)
    .replace(",", "")
    .replace(/ (\d\d:\d\d)$/, ", $1");
export const dayOf = (d: Date) => day.format(d);
export const longDate = (iso: string) => long.format(new Date(iso));
