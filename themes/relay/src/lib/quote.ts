import type { Mode, QuoteMode } from "../content";
import { hub, km, routeFactor } from "./geo";

type Tariff = {
  label: string;
  mode: Mode;
  base: number;
  perKm?: number;
  perPallet?: number;
  perPalletKm?: number;
  perKg?: number;
  fuel: number;
  kmh: number;
  handling: number;
  co2: number;
  maxPallets: number;
};

/* Sample tariff. kmh is effective door-to-door speed, handling is hours at both ends, co2 is kg CO₂e per tonne-km. */
export const tariffs: Record<QuoteMode, Tariff> = {
  groupage: {
    label: "Road groupage",
    mode: "road",
    base: 0,
    perPallet: 38,
    perPalletKm: 0.082,
    fuel: 0.14,
    kmh: 24,
    handling: 18,
    co2: 0.098,
    maxPallets: 17,
  },
  ftl: {
    label: "Full truckload",
    mode: "road",
    base: 140,
    perKm: 1.36,
    fuel: 0.14,
    kmh: 34,
    handling: 4,
    co2: 0.062,
    maxPallets: 33,
  },
  rail: {
    label: "Intermodal rail",
    mode: "rail",
    base: 310,
    perKm: 0.94,
    fuel: 0.06,
    kmh: 22,
    handling: 20,
    co2: 0.018,
    maxPallets: 33,
  },
  sea: {
    label: "Short-sea",
    mode: "sea",
    base: 420,
    perKm: 0.58,
    fuel: 0.09,
    kmh: 15,
    handling: 30,
    co2: 0.014,
    maxPallets: 33,
  },
  air: {
    label: "Air freight",
    mode: "air",
    base: 90,
    perKg: 2.85,
    fuel: 0.22,
    kmh: 90,
    handling: 10,
    co2: 0.62,
    maxPallets: 6,
  },
};

export type QuoteInput = {
  from: string;
  to: string;
  mode: QuoteMode;
  pallets: number;
  weight: number;
  tailLift: boolean;
  adr: boolean;
  saturday: boolean;
  value: number;
};

export type QuoteResult =
  | { ok: false; reason: string }
  | {
      ok: true;
      lines: [string, number][];
      total: number;
      distance: number;
      days: number;
      co2: number;
      chargeable: number;
    };

/** Carried from the homepage calculator to /quote within the session. */
export const draft: { current: QuoteInput } = {
  current: {
    from: "RTM",
    to: "MIL",
    mode: "groupage",
    pallets: 6,
    weight: 3200,
    tailLift: false,
    adr: false,
    saturday: false,
    value: 0,
  },
};

/** EUR pallet 1.2 × 0.8 × 1.6 m at the IATA 1:6000 volume ratio. */
const AIR_KG_PER_PALLET = 256;

export function price(q: QuoteInput): QuoteResult {
  const t = tariffs[q.mode];
  if (q.from === q.to)
    return {
      ok: false,
      reason:
        "Origin and destination are the same hub. Pick a different destination.",
    };
  const missing = [q.from, q.to].filter((c) => !hub(c).modes.includes(t.mode));
  if (missing.length)
    return {
      ok: false,
      reason: `${t.label} does not run from ${missing.map((c) => hub(c).city).join(" or ")}. Try road or another hub.`,
    };
  if (q.pallets > t.maxPallets)
    return {
      ok: false,
      reason: `${t.label} takes up to ${t.maxPallets} pallets per booking. Reduce the pallets or choose full truckload.`,
    };
  if (!(q.pallets >= 1))
    return { ok: false, reason: "Enter at least one pallet." };
  if (!(q.weight > 0))
    return {
      ok: false,
      reason: "Enter the gross weight in kg, including pallets.",
    };
  if (q.weight > q.pallets * 1200)
    return {
      ok: false,
      reason: `That is over 1,200 kg per pallet. Add pallets or check the weight.`,
    };

  const distance = km(q.from, q.to) * routeFactor[t.mode];
  const chargeable =
    q.mode === "air"
      ? Math.max(q.weight, q.pallets * AIR_KG_PER_PALLET)
      : q.weight;
  let linehaul = t.base;
  if (t.perKm) linehaul += distance * t.perKm;
  if (t.perPallet && t.perPalletKm)
    linehaul += q.pallets * (t.perPallet + distance * t.perPalletKm);
  if (t.perKg) linehaul += chargeable * t.perKg * (1 + distance / 2000);

  const lines: [string, number][] = [
    [
      q.mode === "air"
        ? `Air freight, ${Math.round(chargeable)} chargeable kg`
        : `${t.label} linehaul`,
      linehaul,
    ],
  ];
  lines.push([
    `Fuel surcharge ${Math.round(t.fuel * 100)}%`,
    linehaul * t.fuel,
  ]);
  if (q.adr) lines.push(["Dangerous goods (ADR/RID/DGR) 18%", linehaul * 0.18]);
  if (q.tailLift && t.mode === "road") lines.push(["Tail-lift delivery", 45]);
  if (q.saturday && t.mode === "road") lines.push(["Saturday delivery", 120]);
  if (q.value > 0)
    lines.push([
      "Cargo insurance 0.35% of value",
      Math.max(25, q.value * 0.0035),
    ]);

  const total = lines.reduce((sum, [, n]) => sum + n, 0);
  const days = Math.max(1, Math.ceil((distance / t.kmh + t.handling) / 24));
  const co2 = (q.weight / 1000) * distance * t.co2;
  return { ok: true, lines, total, distance, days, co2, chargeable };
}
