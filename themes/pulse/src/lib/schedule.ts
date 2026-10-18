import {
  artists,
  stages,
  walkMinutes,
  type Artist,
  type DayId,
} from "../content";
import { createStore } from "./store";

/** Minutes after noon on the festival day. Times before noon belong to the night that started the day before. */
export function minutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return (h < 12 ? h + 24 : h) * 60 + m - 12 * 60;
}

/** Back to a clock label from minutes after noon. */
export function clock(min: number) {
  const total = (min + 12 * 60) % (24 * 60);
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

export const span = (a: Artist) => [minutes(a.start), minutes(a.end)] as const;

export function duration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return [h && `${h}h`, m && `${m}m`].filter(Boolean).join(" ");
}

/** Minutes two sets overlap; 0 when they don't or fall on different days. */
export function overlap(a: Artist, b: Artist) {
  if (a.day !== b.day || a.slug === b.slug) return 0;
  const [as, ae] = span(a);
  const [bs, be] = span(b);
  return Math.max(0, Math.min(ae, be) - Math.max(as, bs));
}

export const setsOn = (day: DayId) =>
  artists
    .filter((a) => a.day === day)
    .sort((a, b) => minutes(a.start) - minutes(b.start));

/** Whole-hour window that covers every set on a day. */
export function dayWindow(day: DayId) {
  const sets = setsOn(day);
  const from = Math.floor(Math.min(...sets.map((a) => span(a)[0])) / 60) * 60;
  const to = Math.ceil(Math.max(...sets.map((a) => span(a)[1])) / 60) * 60;
  return { from, to };
}

export const stageOf = (a: Artist) => stages.find((s) => s.id === a.stage)!;

/* ------------------------------------------------------------ my timetable */

const known = new Set(artists.map((a) => a.slug));

export const plan = createStore<string[]>("pulse-plan", [], (raw) =>
  Array.isArray(raw)
    ? raw.filter((s): s is string => typeof s === "string" && known.has(s))
    : [],
);

export const usePlan = plan.useValue;

export function togglePick(slug: string) {
  const now = plan.get();
  plan.set(now.includes(slug) ? now.filter((s) => s !== slug) : [...now, slug]);
}

export function clearDay(day: DayId) {
  plan.set(
    plan.get().filter((s) => artists.find((a) => a.slug === s)?.day !== day),
  );
}

export const picked = (slugs: string[]) =>
  artists
    .filter((a) => slugs.includes(a.slug))
    .sort((a, b) => minutes(a.start) - minutes(b.start));

/** Picks on the same day that overlap the given set. */
export const clashesWith = (a: Artist, slugs: string[]) =>
  picked(slugs).filter((b) => overlap(a, b) > 0);

/** One line of advice for a clash: how long they overlap and how far apart the stages are. */
export function clashAdvice(a: Artist, b: Artist) {
  const walk = walkMinutes[a.stage][b.stage];
  const where = walk
    ? `${walk} min walk between ${stageOf(a).name} and ${stageOf(b).name}`
    : `both on ${stageOf(a).name}`;
  return `${a.name} and ${b.name} overlap by ${duration(overlap(a, b))} · ${where}`;
}

/** Plain-text plan for the clipboard. */
export function planText(slugs: string[], dayLabel: (d: DayId) => string) {
  const sets = picked(slugs);
  const byDay = (["fri", "sat", "sun"] as DayId[]).filter((d) =>
    sets.some((a) => a.day === d),
  );
  return byDay
    .map((d) =>
      [
        dayLabel(d).toUpperCase(),
        ...sets
          .filter((a) => a.day === d)
          .map((a) => `${a.start}–${a.end}  ${a.name} @ ${stageOf(a).name}`),
      ].join("\n"),
    )
    .join("\n\n");
}
