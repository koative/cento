const dateFmt = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** "2026-10-12" → "October 12, 2026" (parsed as a local date, never shifted by time zone). */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return dateFmt.format(new Date(y, m - 1, d));
}

export const money = (n: number) => (n === 0 ? "$0" : `$${n.toFixed(2)}`);
