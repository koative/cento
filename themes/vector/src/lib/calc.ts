import type { Charger, Trim } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);
export const cents = (n: number) => `$${n.toFixed(2)}`;

/** Piecewise-linear lookup in a sorted [x, y] table, clamped at both ends. */
function lerp(table: [number, number][], x: number) {
  if (x <= table[0][0]) return table[0][1];
  for (let i = 1; i < table.length; i++) {
    const [x1, y1] = table[i];
    if (x <= x1) {
      const [x0, y0] = table[i - 1];
      return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
    }
  }
  return table[table.length - 1][1];
}

// Illustrative factors relative to the combined-cycle range (70 °F, mixed driving).
const TEMP: [number, number][] = [
  [-10, 0.6],
  [20, 0.77],
  [40, 0.88],
  [60, 0.97],
  [70, 1],
  [85, 0.97],
  [100, 0.88],
];
const SPEED: [number, number][] = [
  [45, 1.2],
  [55, 1.1],
  [65, 0.99],
  [70, 0.93],
  [75, 0.86],
  [80, 0.79],
];

export function estimateRange(
  trim: Trim,
  tempF: number,
  mph: number,
  wheelFactor = 1,
) {
  return Math.round(
    trim.range * lerp(TEMP, tempF) * lerp(SPEED, mph) * wheelFactor,
  );
}

/** The published winter figure: 20 °F at a steady 70 mph on Aero wheels. */
export const winterRange = (trim: Trim) => estimateRange(trim, 20, 70);

/** Charging power (kW) the pack accepts at a state of charge 0–100. */
export function chargePower(trim: Trim, charger: Charger, soc: number) {
  if (!charger.dc) return Math.min(charger.kw, 11) * (soc < 95 ? 1 : 0.55);
  const taper = lerp(
    [
      [0, 0.8],
      [10, 1],
      [40, 1],
      [80, 0.3],
      [100, 0.1],
    ],
    soc,
  );
  return Math.min(charger.kw, trim.peakDc * taper);
}

/** Minutes, energy from the grid and cost to go from one state of charge to another. */
export function chargeSession(
  trim: Trim,
  charger: Charger,
  from: number,
  to: number,
) {
  const efficiency = charger.dc ? 0.94 : 0.9;
  let hours = 0;
  for (let soc = from; soc < to; soc++)
    hours +=
      trim.battery / 100 / efficiency / chargePower(trim, charger, soc + 0.5);
  const kwh = (((to - from) / 100) * trim.battery) / efficiency;
  return {
    minutes: Math.round(hours * 60),
    kwh,
    cost: kwh * charger.price,
    miles: Math.round(((to - from) / 100) * trim.range),
  };
}

export function duration(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} h ${m} min` : `${h} h`;
}
