import { useSyncExternalStore } from "react";
import { exhibits, type AgeGroup } from "../content";
import { fromMin, toMin } from "./format";

/** The family day plan: who is coming, when you arrive, which galleries in which order. */
export type Plan = { ages: AgeGroup[]; arrival: string; stops: string[] };

const KEY = "fable-plan";
const empty: Plan = { ages: [], arrival: "10:30", stops: [] };

function load(): Plan {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

let plan = load();
const listeners = new Set<() => void>();

function set(next: Plan) {
  plan = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the plan lives for this visit only */
  }
  listeners.forEach((l) => l());
}

export function usePlan() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => plan,
  );
}

export const toggleAge = (id: AgeGroup) =>
  set({
    ...plan,
    ages: plan.ages.includes(id)
      ? plan.ages.filter((a) => a !== id)
      : [...plan.ages, id],
  });
export const setArrival = (arrival: string) => set({ ...plan, arrival });
export const toggleStop = (slug: string) =>
  set({
    ...plan,
    stops: plan.stops.includes(slug)
      ? plan.stops.filter((s) => s !== slug)
      : [...plan.stops, slug],
  });
export function moveStop(slug: string, by: -1 | 1) {
  const i = plan.stops.indexOf(slug);
  const j = i + by;
  if (i < 0 || j < 0 || j >= plan.stops.length) return;
  const stops = [...plan.stops];
  [stops[i], stops[j]] = [stops[j], stops[i]];
  set({ ...plan, stops });
}
export const clearStops = () => set({ ...plan, stops: [] });

/** An exhibit suits the family when it fits at least one chosen age group (or none are chosen). */
export const suits = (ages: AgeGroup[], exhibitAges: AgeGroup[]) =>
  !ages.length || ages.some((a) => exhibitAges.includes(a));

export type Leg =
  | { kind: "stop"; slug: string; name: string; start: string; end: string }
  | { kind: "lunch"; start: string; end: string };

const WALK = 5;
const LUNCH = 30;
export const CLOSE = "17:00";

/** Timeline for the plan: each gallery's stay plus a short walk, with lunch slotted in at noon. */
export function schedule(p: Plan) {
  let t = toMin(p.arrival);
  let lunched = t >= toMin("12:00");
  const legs: Leg[] = [];
  for (const slug of p.stops) {
    const ex = exhibits.find((e) => e.slug === slug);
    if (!ex) continue;
    if (!lunched && t >= toMin("12:00")) {
      legs.push({ kind: "lunch", start: fromMin(t), end: fromMin(t + LUNCH) });
      t += LUNCH + WALK;
      lunched = true;
    }
    legs.push({
      kind: "stop",
      slug,
      name: ex.name,
      start: fromMin(t),
      end: fromMin(t + ex.stay),
    });
    t += ex.stay + WALK;
  }
  const finish = fromMin(t - (legs.length ? WALK : 0));
  return { legs, finish, late: toMin(finish) > toMin(CLOSE) };
}
