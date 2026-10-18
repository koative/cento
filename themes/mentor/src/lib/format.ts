const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

const parse = (iso: string) => new Date(iso + "T12:00:00");

/** "14 January 2027" */
export const longDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** "14 Jan" */
export const shortDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

/** 1900 → "32 min" */
export const minutes = (seconds: number) => `${Math.round(seconds / 60)} min`;

/** 1900 → "31:40" */
export function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}
