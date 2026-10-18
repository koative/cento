import { useSyncExternalStore } from "react";
import { classes, passes, type Pass } from "../content";

/* "My week": the classes a visitor has pinned on the timetable, kept in localStorage. */

const KEY = "tempo.week";
const listeners = new Set<() => void>();

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw)
      ? raw.filter((id) => classes.some((c) => c.id === id))
      : [];
  } catch {
    return [];
  }
}

let week = load();

function save(next: string[]) {
  week = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable (private mode): the week still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useWeek() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => week,
  );
}

export const toggleClass = (id: string) =>
  save(week.includes(id) ? week.filter((x) => x !== id) : [...week, id]);

export const clearWeek = () => save([]);

/* ------------------------------------------------------------ pass maths */

/** Average classes in a month for a weekly habit: 52 weeks ÷ 12 months. */
const WEEKS_PER_MONTH = 52 / 12;

export type PassCost = { pass: Pass; monthly: number };

/** Monthly cost of each pass that covers `perWeek` classes, cheapest first. */
export function costs(perWeek: number): PassCost[] {
  const perMonth = perWeek * WEEKS_PER_MONTH;
  return passes
    .filter((p) => p.unit !== "month" || (p.perWeek ?? Infinity) >= perWeek)
    .map((pass) => ({
      pass,
      monthly: Math.round(
        pass.unit === "month"
          ? pass.price
          : perMonth * (pass.perClass ?? pass.price),
      ),
    }))
    .sort((a, b) => a.monthly - b.monthly);
}
