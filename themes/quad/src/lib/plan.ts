import type { Module, Slot } from "../content";

/** A module plan saved from a programme page and picked up by the application form. */
export type SavedPlan = { programme: string; year: string; modules: string[] };

const KEY = "quadwell-plan";

export function savePlan(plan: SavedPlan) {
  try {
    localStorage.setItem(KEY, JSON.stringify(plan));
  } catch {
    /* storage unavailable: the plan just isn't remembered */
  }
}

export function loadPlan(): SavedPlan | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedPlan) : null;
  } catch {
    return null;
  }
}

export function clearPlan() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nothing stored */
  }
}

export const slotKey = (s: Slot) => `${s.day} ${s.hour}`;

/** Slot key → every chosen module meeting in it. Two or more = a clash. */
export function timetable(chosen: Module[]) {
  const grid = new Map<string, Module[]>();
  for (const m of chosen)
    for (const s of m.slots)
      grid.set(slotKey(s), [...(grid.get(slotKey(s)) ?? []), m]);
  return grid;
}
