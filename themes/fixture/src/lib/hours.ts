import { booking } from "../content";

/** Office hours: Mon–Fri 7–19, Sat 8–14. Outside them the emergency dispatch fee applies. */
export function officeOpen(now: Date) {
  const d = now.getDay();
  const h = now.getHours() + now.getMinutes() / 60;
  if (d === 0) return false;
  if (d === 6) return h >= 8 && h < 14;
  return h >= 7 && h < 19;
}

export type VisitDay = {
  iso: string;
  weekday: string;
  date: string;
  windows: { id: string; label: string; full: boolean }[];
};

/**
 * The next `count` bookable days from tomorrow (no Sundays; Saturdays morning only).
 * Fullness is a deterministic pattern so the demo looks like a real diary without a backend.
 */
export function visitDays(now: Date, count: number): VisitDay[] {
  const days: VisitDay[] = [];
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  while (days.length < count) {
    day.setDate(day.getDate() + 1);
    const dow = day.getDay();
    if (dow === 0) continue;
    const seed = day.getDate() * 7 + day.getMonth() * 3;
    const windows = booking.windows
      .filter((w) => dow !== 6 || Number(w.id) < 12)
      .map((w, i) => ({
        ...w,
        full: days.length < 3 && (seed + i * 5) % 4 === 0,
      }));
    days.push({
      iso: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`,
      weekday: day.toLocaleDateString("en-US", { weekday: "short" }),
      date: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      windows,
    });
  }
  return days;
}

/** First open window, for the "next opening" line in the hero. */
export function nextOpening(now: Date) {
  for (const d of visitDays(now, 6)) {
    const w = d.windows.find((x) => !x.full);
    if (w) return `${d.weekday} ${d.date}, ${w.label}`;
  }
  return "";
}
