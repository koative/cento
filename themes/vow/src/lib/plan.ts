import { useSyncExternalStore } from "react";
import {
  budgetLines,
  milestones,
  type BudgetLineId,
  type Package,
} from "../content";

export type Plan = {
  date: string;
  guests: number;
  budget: number;
  priorities: BudgetLineId[];
  done: string[];
};

const KEY = "vow-plan";
const DAY = 86_400_000;

/** ISO date (yyyy-mm-dd) in local time. */
export const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const today = () => {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const parseDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

/** A Saturday about seventeen months out, so a fresh plan starts with nothing overdue. */
function defaultDate() {
  const d = today();
  d.setDate(d.getDate() + 500);
  d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7));
  return iso(d);
}

const fallback: Plan = {
  date: defaultDate(),
  guests: 100,
  budget: 60000,
  priorities: ["photo"],
  done: [],
};

function load(): Plan {
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? { ...fallback, ...(JSON.parse(raw) as Partial<Plan>) }
      : fallback;
  } catch {
    return fallback;
  }
}

let plan = load();
const listeners = new Set<() => void>();

export function setPlan(patch: Partial<Plan>) {
  plan = { ...plan, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(plan));
  } catch {
    /* storage unavailable: the plan still lives for this visit */
  }
  listeners.forEach((l) => l());
}

export function resetPlan() {
  setPlan({ ...fallback, date: defaultDate() });
}

export function usePlan() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => plan,
  );
}

export const weeksUntil = (date: string) =>
  Math.round((parseDate(date).getTime() - today().getTime()) / (7 * DAY));

export type Step = (typeof milestones)[number] & {
  due: Date;
  state: "done" | "late" | "next" | "later";
};

/** Every milestone with its due date, and whether it is done, overdue, the next one up, or later. */
export function schedule(p: Plan): Step[] {
  const wedding = parseDate(p.date).getTime();
  const now = today().getTime();
  let nextFound = false;
  return milestones.map((m) => {
    const due = new Date(wedding - m.weeks * 7 * DAY);
    let state: Step["state"] = "later";
    if (p.done.includes(m.id)) state = "done";
    else if (due.getTime() < now) state = "late";
    else if (!nextFound) {
      state = "next";
      nextFound = true;
    }
    return { ...m, due, state };
  });
}

/** Split the budget by our usual shares; each priority weighs 1.5×, then everything is renormalised. */
export function allocate(budget: number, priorities: BudgetLineId[]) {
  const weights = budgetLines.map(
    (l) => l.share * (priorities.includes(l.id) ? 1.5 : 1),
  );
  const total = weights.reduce((a, b) => a + b, 0);
  return budgetLines.map((l, i) => ({
    ...l,
    pct: (weights[i] / total) * 100,
    amount: Math.round((budget * weights[i]) / total / 50) * 50,
  }));
}

export function suggest(weeks: number, guests: number): Package["id"] {
  if (guests <= 20) return "elope";
  if (weeks >= 52) return "full";
  if (weeks >= 10) return "partial";
  return "month";
}

export const money = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const longDate = (d: Date | string) =>
  (typeof d === "string" ? parseDate(d) : d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
