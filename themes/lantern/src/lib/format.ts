import { brand } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const money = (n: number) => usd.format(n);

/** Dates are stored as yyyy-mm-dd and read in UTC so they never shift a day with the visitor's timezone. */
export function formatDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
) {
  return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", {
    ...opts,
    timeZone: "UTC",
  });
}

/** Whole days from the site's "as of" date to `iso`; negative once it has passed. */
export function daysUntil(iso: string) {
  return Math.round((Date.parse(iso) - Date.parse(brand.asOf)) / 86_400_000);
}
