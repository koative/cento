import { useSyncExternalStore } from "react";
import { model, planner } from "../content";

export type Plan = {
  panels: number[];
  orientation: string;
  bill: number;
  batteries: number;
  ev: boolean;
};

export type Hour = {
  gen: number;
  use: number;
  direct: number;
  charge: number;
  discharge: number;
  exported: number;
  imported: number;
  soc: number;
};

export type Estimate = {
  kwp: number;
  annualGen: number;
  annualUse: number;
  selfUsed: number;
  exported: number;
  savings: number;
  offset: number; // share of the yearly bill covered, 0–1
  price: number;
  payback: number;
  hours: Hour[];
};

/** Rough average-day simulation scaled to a year. Good enough for a planner, not a quote. */
export function estimate(plan: Plan): Estimate {
  const o =
    model.orientations.find((x) => x.id === plan.orientation) ??
    model.orientations[0];
  const kwp = (plan.panels.length * model.panelWatts) / 1000;
  const annualGen = kwp * model.yieldPerKwp * o.factor;
  const annualUse =
    (plan.bill * 12) / model.importRate + (plan.ev ? model.evKwhPerYear : 0);

  const sunShape = Array.from({ length: 24 }, (_, h) => {
    const x = (h + 0.5 - o.peak) / o.spread;
    return Math.abs(x) < 1 ? Math.cos((x * Math.PI) / 2) ** 1.6 : 0;
  });
  const genDay = scale(sunShape, annualGen / 365);
  const houseDay = scale(
    model.usageShape,
    (plan.bill * 12) / model.importRate / 365,
  );
  const evDay = scale(model.evShape, plan.ev ? model.evKwhPerYear / 365 : 0);

  const capacity = plan.batteries * model.batteryKwh;
  const power = plan.batteries * model.batteryKw;
  let soc = 0;
  let hours: Hour[] = [];
  // Two passes so the battery starts the day holding whatever last evening left in it.
  for (let pass = 0; pass < 2; pass++) {
    hours = genDay.map((gen, h) => {
      const use = houseDay[h] + evDay[h];
      const direct = Math.min(gen, use);
      const surplus = gen - direct;
      const deficit = use - direct;
      const charge = Math.min(surplus, power, (capacity - soc) / 0.95);
      const discharge = Math.min(deficit, power, soc);
      soc += charge * 0.95 - discharge;
      return {
        gen,
        use,
        direct,
        charge,
        discharge,
        exported: surplus - charge,
        imported: deficit - discharge,
        soc,
      };
    });
  }

  const sum = (k: keyof Hour) => hours.reduce((t, x) => t + x[k], 0) * 365;
  const selfUsed = sum("direct") + sum("discharge");
  const exported = sum("exported");
  const bill = annualUse * model.importRate;
  // Export credits can zero a bill but are not paid out beyond it.
  const savings = Math.min(
    bill,
    selfUsed * model.importRate + exported * model.exportRate,
  );
  const price =
    Math.round(
      (kwp * 1000 * model.pricePerWatt +
        plan.batteries * model.batteryPrice +
        (plan.ev ? model.evChargerPrice : 0)) /
        10,
    ) * 10;
  const offset = bill ? savings / bill : 0;

  return {
    kwp,
    annualGen,
    annualUse,
    selfUsed,
    exported,
    savings,
    offset,
    price,
    payback: savings > 0 ? price / savings : 0,
    hours,
  };
}

function scale(shape: number[], total: number) {
  const s = shape.reduce((a, b) => a + b, 0);
  return shape.map((v) => (s ? (v / s) * total : 0));
}

/** Monthly payment on an amortised loan. */
export function monthlyPayment(principal: number, apr: number, years: number) {
  const r = apr / 100 / 12;
  const n = years * 12;
  if (principal <= 0) return 0;
  return r === 0 ? principal / n : (principal * r) / (1 - (1 + r) ** -n);
}

/* ---------- Saved plan: shared by planner, financing and quote; survives reloads when storage allows ---------- */

const KEY = "grid.plan";
let plan: Plan = load();
const listeners = new Set<() => void>();

function load(): Plan {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw)
      return { ...planner.defaults, ...(JSON.parse(raw) as Partial<Plan>) };
  } catch {
    /* storage blocked: fall back to defaults */
  }
  return planner.defaults;
}

export function savePlan(next: Plan) {
  plan = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage blocked: keep it for this visit only */
  }
  listeners.forEach((l) => l());
}

export function usePlan() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => plan,
  );
}

/* ---------- Formatting ---------- */

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
const usdCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});
const num = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

// Typographic minus for credits and negatives.
export const money = (n: number) => usd.format(Math.round(n)).replace("-", "−");
export const cents = (n: number) => usdCents.format(n).replace("-", "−");
export const kwh = (n: number) => `${num.format(n)} kWh`;
export const kw = (n: number) => `${n.toFixed(1)} kW`;
export const clock = (h: number) => `${String(h).padStart(2, "0")}:00`;
