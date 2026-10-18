import { useSyncExternalStore } from "react";
import { flights, rideshare, type Flight, type OrbitOption } from "../content";

export type Quote = {
  kind: "microsat" | "cubesat";
  units: number;
  mass: number;
  orbit: string;
  altitude: number;
  flight: string;
  addons: string[];
};

export const defaultQuote: Quote = {
  kind: "microsat",
  units: 6,
  mass: 120,
  orbit: "sso",
  altitude: 800,
  flight: "or-056",
  addons: [],
};

const KEY = "orbit.quote";
let quote: Quote = load();
const listeners = new Set<() => void>();

function load(): Quote {
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? { ...defaultQuote, ...(JSON.parse(raw) as Partial<Quote>) }
      : defaultQuote;
  } catch {
    return defaultQuote;
  }
}

export function setQuote(patch: Partial<Quote>) {
  quote = { ...quote, ...patch };
  try {
    localStorage.setItem(KEY, JSON.stringify(quote));
  } catch {
    /* storage unavailable: the quote lives for this visit only */
  }
  listeners.forEach((l) => l());
}

export function useQuote() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => quote,
  );
}

/** Rideshare flights that fly the chosen orbit, have room left and have not launched. */
export function flightsFor(orbitId: string, now: number): Flight[] {
  const wantSso = orbitId !== "mid";
  return flights.filter(
    (f) =>
      f.type === "Rideshare" &&
      f.openKg > 0 &&
      Date.parse(f.date) > now &&
      f.orbit.startsWith("SSO") === wantSso,
  );
}

const KG_PER_U = 2; // dispenser mass allowance per cubesat unit

export type Priced = {
  orbit: OrbitOption;
  flight: Flight | undefined;
  options: Flight[];
  mass: number;
  lines: { label: string; amount: number }[];
  total: number;
  perKg: number;
  schedule: { label: string; amount: number }[];
  problem: string | null;
};

export function price(q: Quote, now: number): Priced {
  const orbit =
    rideshare.orbits.find((o) => o.id === q.orbit) ?? rideshare.orbits[0];
  const options = flightsFor(orbit.id, now);
  const flight = options.find((f) => f.id === q.flight) ?? options[0];
  const mass = q.kind === "cubesat" ? q.units * KG_PER_U : q.mass;
  const lines: { label: string; amount: number }[] = [];

  if (q.kind === "cubesat") {
    lines.push({
      label: `${q.units}U cubesat dispenser slot, ${orbit.label.toLowerCase()}`,
      amount:
        q.units *
        rideshare.cubesatPerU *
        (orbit.perKg / rideshare.orbits[0].perKg),
    });
  } else {
    const billed = Math.max(q.mass, rideshare.minBilledKg);
    lines.push({
      label: `${billed} kg × ${"$" + orbit.perKg.toLocaleString("en-US")}/kg${billed > q.mass ? " (50 kg minimum)" : ""}`,
      amount: billed * orbit.perKg,
    });
    const port =
      rideshare.ports.find((p) => q.mass <= p.maxKg) ??
      rideshare.ports[rideshare.ports.length - 1];
    if (port.fee) lines.push({ label: port.label, amount: port.fee });
  }

  if (orbit.custom) {
    const km = Math.abs(q.altitude - 550);
    lines.push({
      label: `Wayfarer transfer to ${q.altitude} km`,
      amount: mass * (rideshare.wayfarerPerKg + rideshare.wayfarerPerKgKm * km),
    });
  }

  for (const a of rideshare.addons)
    if (q.addons.includes(a.id))
      lines.push({ label: a.label, amount: a.price });

  const subtotal = lines.reduce((s, l) => s + l.amount, 0);
  const months = flight
    ? (Date.parse(flight.date) - now) / (30.44 * 86400000)
    : 0;
  const timing = !flight
    ? null
    : months < rideshare.shortNotice.months
      ? rideshare.shortNotice
      : months > rideshare.early.months
        ? rideshare.early
        : null;
  if (timing)
    lines.push({
      label: `${timing.label} (${timing.rate > 0 ? "+" : "−"}${Math.abs(timing.rate * 100)}%)`,
      amount: subtotal * timing.rate,
    });

  const total = lines.reduce((s, l) => s + l.amount, 0);
  const tooHeavy = q.kind === "microsat" && q.mass > 450;
  const overCapacity = flight ? mass > flight.openKg : false;
  return {
    orbit,
    flight,
    options,
    mass,
    lines,
    total,
    perKg: total / mass,
    schedule: rideshare.schedule.map((s) => ({
      label: s.label,
      amount: total * s.share,
    })),
    problem: !flight
      ? "No rideshare with open capacity flies this orbit yet. Ask us about a dedicated Kestrel."
      : overCapacity
        ? `${flight.name} has ${flight.openKg} kg left. Choose a later flight or reduce your mass.`
        : tooHeavy
          ? "Rideshare ports carry up to 450 kg. Heavier satellites fly on a dedicated Kestrel."
          : null,
  };
}
