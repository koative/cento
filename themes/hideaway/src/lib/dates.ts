/* Calendar days as local "YYYY-MM-DD" strings, so they compare as text and never drift with time zones. */

const pad = (n: number) => String(n).padStart(2, "0");

export const iso = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export function toDate(day: string) {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const isDay = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s);

export const today = () => iso(new Date());

export function addDays(day: string, n: number) {
  const d = toDate(day);
  return iso(new Date(d.getFullYear(), d.getMonth(), d.getDate() + n));
}

/** Whole days from a to b (b later is positive). Rounding absorbs daylight-saving hours. */
export const daysBetween = (a: string, b: string) =>
  Math.round((toDate(b).getTime() - toDate(a).getTime()) / 86_400_000);

/** Every night of a stay: arrival up to (not including) departure. */
export function nightsOf(arrival: string, departure: string) {
  const out: string[] = [];
  for (let d = arrival; d < departure; d = addDays(d, 1)) out.push(d);
  return out;
}

export const weekday = (day: string) => toDate(day).getDay();

/** Monday = 0 … Sunday = 6, for Monday-first grids. */
export const mondayIndex = (day: string) => (weekday(day) + 6) % 7;

export function fmtDay(
  day: string,
  opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  },
) {
  return toDate(day).toLocaleDateString("en-GB", opts);
}

export const fmtLong = (day: string) =>
  fmtDay(day, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const fmtMonth = (day: string) =>
  fmtDay(day, { month: "long", year: "numeric" });
