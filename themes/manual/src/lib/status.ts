import { incidents, statusAsOf, type Impact, type Incident } from "../content";

export type State = "operational" | "degraded" | "outage" | "maintenance";
export type Level = "ok" | Impact;

const now = Date.parse(statusAsOf);
const endOf = (i: Incident) => (i.end ? Date.parse(i.end) : now);

export const isActive = (i: Incident) =>
  Date.parse(i.start) <= now && (!i.end || Date.parse(i.end) > now);
export const isUpcoming = (i: Incident) => Date.parse(i.start) > now;

export const active = incidents.filter(isActive);
export const upcoming = incidents.filter(isUpcoming);
export const past = incidents.filter((i) => !isActive(i) && !isUpcoming(i));

const stateOf: Record<Impact, State> = {
  minor: "degraded",
  major: "outage",
  maintenance: "maintenance",
};
const rank: Record<State, number> = {
  operational: 0,
  maintenance: 1,
  degraded: 2,
  outage: 3,
};

export function componentState(id: string): State {
  return active
    .filter((i) => i.components.includes(id))
    .map((i) => stateOf[i.impact])
    .reduce<State>(
      (worst, s) => (rank[s] > rank[worst] ? s : worst),
      "operational",
    );
}

export const overall: State = active
  .map((i) => stateOf[i.impact])
  .reduce<State>((w, s) => (rank[s] > rank[w] ? s : w), "operational");

export const stateLabel: Record<State, string> = {
  operational: "Operational",
  degraded: "Degraded",
  outage: "Outage",
  maintenance: "Maintenance",
};

export const headline: Record<State, string> = {
  operational: "All systems operational",
  degraded: "Some systems degraded",
  outage: "Partial outage",
  maintenance: "Maintenance in progress",
};

/* ------------------------------------------------------------ 90-day history */

const key = new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York" });
const dayKey = (t: number) => key.format(new Date(t));
const levelRank: Record<Level, number> = {
  ok: 0,
  maintenance: 1,
  minor: 2,
  major: 3,
};

/** Eastern calendar days an incident touched. */
function daysOf(i: Incident) {
  const keys = new Set<string>();
  for (let t = Date.parse(i.start); t < endOf(i); t += 3600000)
    keys.add(dayKey(t));
  keys.add(dayKey(endOf(i)));
  return keys;
}

export type Day = { date: string; level: Level; titles: string[] };

export function history(component: string, span = 90): Day[] {
  const mine = incidents
    .filter((i) => i.components.includes(component) && !isUpcoming(i))
    .map((i) => ({ i, days: daysOf(i) }));
  return Array.from({ length: span }, (_, n) => {
    const date = dayKey(now - (span - 1 - n) * 86400000);
    const touching = mine.filter((m) => m.days.has(date)).map((m) => m.i);
    const level = touching.reduce<Level>(
      (w, i) => (levelRank[i.impact] > levelRank[w] ? i.impact : w),
      "ok",
    );
    return { date, level, titles: touching.map((i) => i.title) };
  });
}

/** Uptime over the window, counting major incidents as full downtime and minor ones as a quarter. */
export function uptime(component: string, span = 90) {
  const from = now - span * 86400000;
  const lost = incidents
    .filter(
      (i) =>
        i.components.includes(component) &&
        i.impact !== "maintenance" &&
        !isUpcoming(i),
    )
    .reduce(
      (sum, i) =>
        sum +
        (endOf(i) - Math.max(Date.parse(i.start), from)) *
          (i.impact === "major" ? 1 : 0.25),
      0,
    );
  return (100 * (1 - lost / (span * 86400000))).toFixed(2);
}

export const durationOf = (i: Incident) => {
  const mins = Math.round((endOf(i) - Date.parse(i.start)) / 60000);
  const h = Math.floor(mins / 60);
  return h ? `${h} h ${mins % 60} min` : `${mins} min`;
};
