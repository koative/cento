const gbp = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
});
export const money = (n: number) => gbp.format(n);

const toDate = (iso: string) => new Date(iso + "T12:00:00");

/** "Sat 7 Nov 2026" */
export const longDate = (iso: string) =>
  toDate(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/** { day: "07", month: "Nov", weekday: "Sat" } for calendar-style date blocks. */
export function dateParts(iso: string) {
  const d = toDate(iso);
  return {
    day: String(d.getDate()).padStart(2, "0"),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
    weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
    year: d.getFullYear(),
  };
}
