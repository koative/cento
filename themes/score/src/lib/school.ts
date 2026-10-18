import {
  fees,
  programmes,
  recitals,
  teachers,
  type Programme,
  type Recital,
} from "../content";
import { recitalDate } from "./format";

export const teachersFor = (slug: string) =>
  teachers.filter((t) => t.programmes.includes(slug));

export const programmeBySlug = (slug: string) =>
  programmes.find((p) => p.slug === slug);

/** Lowest price a new student would pay per lesson or class. */
export const fromPrice = (p: Programme) =>
  p.group?.perSession ?? fees.private[0].perLesson;

export type DatedRecital = Recital & { date: Date };

/** Upcoming recitals soonest first, past ones most recent first. */
export function season(now = new Date()): {
  upcoming: DatedRecital[];
  past: DatedRecital[];
} {
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  ).getTime();
  const dated = recitals.map((r) => ({ ...r, date: recitalDate(r) }));
  return {
    upcoming: dated
      .filter((r) => r.date.getTime() >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime()),
    past: dated
      .filter((r) => r.date.getTime() < today)
      .sort((a, b) => b.date.getTime() - a.date.getTime()),
  };
}
