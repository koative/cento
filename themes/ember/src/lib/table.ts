import { useSyncExternalStore } from "react";
import { dishes, type Course, type Dish } from "../content";

/** The table plan: how many are coming and how many of each dish. Persisted, but works without storage. */
export type Plan = { guests: number; items: Record<string, number> };

const KEY = "ember.table.v1";
const listeners = new Set<() => void>();

let plan: Plan = (() => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(KEY) ?? "null",
    ) as Plan | null;
    if (
      saved &&
      typeof saved.guests === "number" &&
      saved.items &&
      typeof saved.items === "object"
    )
      return saved;
  } catch {
    /* corrupt or unavailable storage: start fresh */
  }
  return { guests: 2, items: {} };
})();

function commit(next: Plan) {
  plan = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode: the plan still lasts this visit */
  }
  listeners.forEach((l) => l());
}

export const usePlan = () =>
  useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => plan,
  );

export const setGuests = (guests: number) =>
  commit({ ...plan, guests: Math.min(12, Math.max(1, guests)) });

export function setQty(id: string, qty: number) {
  const { [id]: _, ...rest } = plan.items;
  commit({
    ...plan,
    items: qty > 0 ? { ...plan.items, [id]: Math.min(9, qty) } : rest,
  });
}

export const add = (id: string) => setQty(id, (plan.items[id] ?? 0) + 1);
export const clearPlan = () => commit({ ...plan, items: {} });

export type Line = { dish: Dish; qty: number };

export const linesOf = (p: Plan): Line[] =>
  dishes
    .filter((d) => p.items[d.id])
    .map((dish) => ({ dish, qty: p.items[dish.id] }));

export const countOf = (p: Plan) =>
  Object.values(p.items).reduce((n, q) => n + q, 0);
export const totalOf = (p: Plan) =>
  linesOf(p).reduce((n, l) => n + l.qty * l.dish.price, 0);

/* ------------------------------------------------------------ the suggestion */

/** Roughly how much of a person each plate feeds, as the floor staff would say it. */
const portions: Partial<Record<Course, number>> = {
  start: 0.5,
  small: 1,
  oven: 1.5,
  large: 2,
  side: 0.5,
};

/** What the floor team would steer a table of `g` towards. */
const aims = (g: number): Partial<Record<Course, number>> => ({
  start: Math.ceil(g / 4),
  small: Math.ceil(g * 0.75),
  oven: Math.ceil(g / 2.5),
  large: Math.floor(g / 3),
  sweet: Math.ceil(g / 2),
});

export type Advice = {
  tone: "empty" | "light" | "good" | "feast";
  message: string;
  rows: { course: Course; have: number; aim: number }[];
};

export function advise(p: Plan): Advice {
  const g = p.guests;
  const have: Partial<Record<Course, number>> = {};
  for (const { dish, qty } of linesOf(p))
    have[dish.course] = (have[dish.course] ?? 0) + qty;
  const aim = aims(g);
  const order: Course[] = [
    "start",
    "small",
    "oven",
    "large",
    "side",
    "sweet",
    "drink",
  ];
  const rows = order
    .filter((c) => (aim[c] ?? 0) > 0 || (have[c] ?? 0) > 0)
    .map((c) => ({ course: c, have: have[c] ?? 0, aim: aim[c] ?? 0 }));

  const fed = order.reduce(
    (n, c) => n + (have[c] ?? 0) * (portions[c] ?? 0),
    0,
  );
  const who = g === 1 ? "one" : `${g}`;
  if (!fed)
    return {
      tone: "empty",
      rows,
      message: `Add a few savoury dishes and we'll tell you whether it's enough for ${who}.`,
    };
  if (fed < g * 1.6) {
    const gap =
      (have.oven ?? 0) < (aim.oven ?? 0)
        ? "a pie from the oven"
        : "another small plate";
    return {
      tone: "light",
      rows,
      message: `Light for ${who}. We'd add ${gap}.`,
    };
  }
  if (fed > g * 3.2)
    return {
      tone: "feast",
      rows,
      message: `That's a feast for ${who}. Plates come as they're ready, so you can always order more on the night.`,
    };
  return {
    tone: "good",
    rows,
    message: `A good spread for ${who}. Leave dessert until later — you'll know by then.`,
  };
}
