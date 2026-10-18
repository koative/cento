import { useSyncExternalStore } from "react";
import {
  destinationBySlug,
  legCost,
  tiers,
  type Destination,
  type TierId,
} from "../content";

export type Stop = { slug: string; nights: number };
export type Plan = {
  stops: Stop[];
  start: string;
  travellers: number;
  tier: TierId;
};

const KEY = "odyssey-plan";
const empty: Plan = { stops: [], start: "", travellers: 2, tier: "boutique" };

function load(): Plan {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const saved = JSON.parse(raw) as Partial<Plan>;
    const stops = (saved.stops ?? []).filter((s) => destinationBySlug(s.slug));
    return { ...empty, ...saved, stops };
  } catch {
    return empty;
  }
}

let plan = load();
const listeners = new Set<() => void>();

export function setPlan(update: (p: Plan) => Plan) {
  plan = update(plan);
  try {
    localStorage.setItem(KEY, JSON.stringify(plan));
  } catch {
    // Storage blocked (private mode): the plan still lives for this visit.
  }
  listeners.forEach((l) => l());
}

export function usePlan() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => plan,
  );
}

/** Add a stop (or bump it to the end if already there) with the destination's ideal length. */
export function addStop(d: Destination) {
  setPlan((p) => ({
    ...p,
    stops: [
      ...p.stops.filter((s) => s.slug !== d.slug),
      { slug: d.slug, nights: d.idealNights },
    ],
  }));
}

export function loadStops(stops: Stop[]) {
  setPlan((p) => ({ ...p, stops: stops.map((s) => ({ ...s })) }));
}

/* ------------------------------------------------------------- geography */

/** Great-circle distance in km. */
export function distanceKm(a: Destination, b: Destination) {
  const rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad;
  const dLon = (b.lon - a.lon) * rad;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export type Leg = {
  from: Destination;
  to: Destination;
  km: number;
  mode: "rail" | "flight";
  hours: number;
};

/** Under ~600 km we go by rail or road; beyond that we fly and allow 90 minutes of airport time. */
export function legBetween(from: Destination, to: Destination): Leg {
  const km = distanceKm(from, to);
  const mode = km < 600 ? "rail" : "flight";
  const hours = mode === "rail" ? km / 85 : km / 780 + 1.5;
  return { from, to, km, mode, hours };
}

/* ---------------------------------------------------------------- pricing */

export function summarise(p: Plan) {
  const stops = p.stops.flatMap((s) => {
    const d = destinationBySlug(s.slug);
    return d ? [{ ...s, d }] : [];
  });
  const legs = stops.slice(1).map((s, i) => legBetween(stops[i].d, s.d));
  const factor = tiers.find((t) => t.id === p.tier)?.factor ?? 1;
  const stay = stops.reduce(
    (sum, s) => sum + s.d.nightly * s.nights * factor,
    0,
  );
  const travel = legs.reduce((sum, l) => sum + legCost[l.mode], 0);
  const nights = stops.reduce((sum, s) => sum + s.nights, 0);
  let day = 1;
  const schedule = stops.map((s) => {
    const first = day;
    day += s.nights;
    return { ...s, first, last: day };
  });
  const perPerson = Math.round((stay + travel) / 10) * 10;
  return {
    stops: schedule,
    legs,
    nights,
    days: nights ? nights + 1 : 0,
    perPerson,
    total: perPerson * p.travellers,
  };
}

/* ------------------------------------------------------------- formatting */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

export function duration(hours: number) {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 6) * 10;
  return m === 60 ? `${h + 1} h` : m ? `${h} h ${m}` : `${h} h`;
}

/** Day n of a trip starting on an ISO date, e.g. "Tue 14 Apr". */
export function tripDate(start: string, day: number) {
  const d = new Date(start + "T12:00:00");
  d.setDate(d.getDate() + day - 1);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export const longDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** Read ?key=value from the hash query (#/destinations?region=Europe). */
export function hashParam(key: string) {
  const q = window.location.hash.split("?")[1];
  return q ? new URLSearchParams(q).get(key) : null;
}
