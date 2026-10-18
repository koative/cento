import { classes, type ClassItem } from "../content";
import { isoOf } from "./format";

export type Session = { item: ClassItem; date: string; time: string };

/** Upcoming class sessions from today over the next `days` days, in time order. */
export function upcomingSessions(
  days = 7,
  only?: ClassItem,
  from = new Date(),
): Session[] {
  const out: Session[] = [];
  for (let i = 0; i < days; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    for (const item of only ? [only] : classes) {
      for (const s of item.schedule)
        if (s.day === d.getDay())
          out.push({ item, date: isoOf(d), time: s.time });
    }
  }
  return out.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
}
