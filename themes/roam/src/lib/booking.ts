import { useSyncExternalStore } from "react";
import {
  cars,
  coverage,
  deals,
  extras,
  fees,
  miles,
  stations,
  type Car,
  type Deal,
} from "../content";
import { day, fromToday, shortDate } from "./format";

export type Draft = {
  pickup: string;
  dropoff: string;
  from: string;
  fromTime: string;
  to: string;
  toTime: string;
  young: boolean;
  car: string;
  coverage: string;
  extras: Record<string, number>;
  code: string;
  step: number;
};

const KEY = "roam-booking";

const fresh = (): Draft => ({
  pickup: "harbor-airport",
  dropoff: "harbor-airport",
  from: fromToday(14),
  fromTime: "10:00",
  to: fromToday(18),
  toTime: "10:00",
  young: false,
  car: "",
  coverage: "basic",
  extras: {},
  code: "",
  step: 1,
});

function load(): Draft {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch {
    /* storage blocked: start fresh */
  }
  return fresh();
}

let draft = load();
const listeners = new Set<() => void>();

function publish(next: Draft) {
  draft = next;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(draft));
  } catch {
    /* storage blocked: keep it in memory */
  }
  listeners.forEach((l) => l());
}

export const setDraft = (patch: Partial<Draft>) =>
  publish({ ...draft, ...patch });
export const resetDraft = () => publish(fresh());

export function useDraft() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => {
        listeners.delete(cb);
      };
    },
    () => draft,
  );
}

/* ------------------------------------------------------------ pricing */

const HOUR = 3_600_000;

/** Rental days, with the 59-minute grace period before an extra day counts. */
export function rentalDays(
  d: Pick<Draft, "from" | "fromTime" | "to" | "toTime">,
) {
  const start = new Date(`${d.from}T${d.fromTime}`).getTime();
  const end = new Date(`${d.to}T${d.toTime}`).getTime();
  if (!(end > start)) return 0;
  return Math.max(1, Math.ceil((end - start - 0.99 * HOUR) / (24 * HOUR)));
}

export function routeMiles(a: string, b: string) {
  return a === b ? 0 : (miles[`${a}|${b}`] ?? miles[`${b}|${a}`] ?? 0);
}

export function oneWayFee(a: string, b: string) {
  const m = routeMiles(a, b);
  if (m <= fees.oneWayFreeMiles) return 0;
  return Math.round((fees.oneWayBase + fees.oneWayPerMile * m) / 5) * 5;
}

export const stationName = (id: string) =>
  stations.find((s) => s.id === id)?.short ?? id;

/** Why a deal can't be used on this trip, or null when it applies. */
export function dealProblem(
  deal: Deal,
  d: Draft,
  days: number,
  car?: Car,
): string | null {
  const r = deal.rule;
  if (r.minDays && days < r.minDays)
    return `${deal.code} needs ${r.minDays} days or more; this trip is ${days}.`;
  if (r.maxDays && days > r.maxDays)
    return `${deal.code} covers up to ${r.maxDays} days; this trip is ${days}.`;
  if (r.weekdays && !r.weekdays.includes(day(d.from).getDay()))
    return `${deal.code} needs a Tuesday, Wednesday or Thursday pickup; yours is ${shortDate(d.from)}.`;
  if (
    r.leadDays &&
    day(d.from).getTime() < day(fromToday(r.leadDays)).getTime()
  )
    return `${deal.code} needs a pickup at least ${r.leadDays} days from today.`;
  if (r.cars && car && !r.cars.includes(car.id))
    return `${deal.code} is for the ${r.cars.map((id) => cars.find((c) => c.id === id)?.name).join(" or ")}.`;
  if (
    r.route &&
    !(
      r.route.includes(d.pickup) &&
      r.route.includes(d.dropoff) &&
      d.pickup !== d.dropoff
    )
  )
    return `${deal.code} is for one-way trips between ${r.route.map(stationName).join(" and ")}.`;
  return null;
}

export const findDeal = (code: string) =>
  deals.find((x) => x.code === code.trim().toUpperCase());

export type Line = { label: string; amount: number; note?: string };

export function quote(d: Draft) {
  const car = cars.find((c) => c.id === d.car);
  const days = rentalDays(d);
  const deal = d.code ? findDeal(d.code) : undefined;
  const problem = deal ? dealProblem(deal, d, days, car) : null;
  const active = deal && !problem ? deal.rule : undefined;
  const lines: Line[] = [];
  if (!car || !days) return { car, days, lines, total: 0, deal, problem };

  const base = car.rate * days;
  lines.push({ label: `${car.name}, ${days} × $${car.rate}`, amount: base });
  let rental = base;
  if (days >= fees.weeklyDays) {
    const off = -Math.round(base * fees.weeklyDiscount);
    lines.push({ label: "Weekly rate, 10% off", amount: off });
    rental += off;
  }
  if (active?.percent) {
    const off = -Math.round(rental * (active.percent / 100));
    lines.push({ label: `${deal!.code}, ${active.percent}% off`, amount: off });
    rental += off;
  }
  if (active?.perDayOff) {
    const off = -active.perDayOff * days;
    lines.push({
      label: `${deal!.code}, $${active.perDayOff} a day off`,
      amount: off,
    });
    rental += off;
  }

  const cover = coverage.find((c) => c.id === d.coverage) ?? coverage[0];
  if (cover.perDay)
    lines.push({ label: `${cover.name} cover`, amount: cover.perDay * days });

  for (const x of extras) {
    const qty = d.extras[x.id] ?? 0;
    if (!qty || (x.only && !x.only.includes(car.id))) continue;
    const unit =
      x.per === "day" ? Math.min(x.price * days, x.cap ?? Infinity) : x.price;
    const free =
      active?.freeExtras?.includes(x.id) ||
      (x.id === "snow-chains" && d.pickup === "ridgeline");
    lines.push({
      label: `${x.name}${qty > 1 ? ` × ${qty}` : ""}`,
      amount: free ? 0 : unit * qty,
      note: free ? "included" : undefined,
    });
  }

  if (d.young)
    lines.push({
      label: "Young driver, 21–24",
      amount: fees.youngDriverPerDay * days,
    });

  const oneWay = oneWayFee(d.pickup, d.dropoff);
  if (oneWay)
    lines.push({
      label: `One way, ${routeMiles(d.pickup, d.dropoff)} mi`,
      amount: active?.waiveOneWay ? 0 : oneWay,
      note: active?.waiveOneWay ? deal!.code : undefined,
    });

  if (stations.find((s) => s.id === d.pickup)?.airportFee) {
    lines.push({
      label: "Airport concession fee, 11.1%",
      amount: Math.round(rental * fees.airportRate * 100) / 100,
    });
  }
  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const tax = Math.round(subtotal * fees.taxRate * 100) / 100;
  lines.push({ label: "Sales tax, 8.25%", amount: tax });
  const total = Math.round((subtotal + tax) * 100) / 100;
  return { car, days, lines, total, deal, problem };
}

/** Cheapest daily figure to advertise ("from $39/day"). */
export const fromRate = Math.min(...cars.map((c) => c.rate));
