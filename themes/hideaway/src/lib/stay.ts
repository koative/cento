import { useSyncExternalStore } from "react";
import {
  depositShare,
  monthSeason,
  seasons,
  touristTax,
  villas,
  type Season,
  type Villa,
} from "../content";
import {
  addDays,
  daysBetween,
  fmtDay,
  nightsOf,
  today,
  toDate,
  weekday,
} from "./dates";

/* ------------------------------------------------------------ money */

const eur = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});
const eurCents = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});
export const money = (n: number) =>
  (Number.isInteger(n) ? eur : eurCents).format(n);

/* ------------------------------------------------------------ seasons */

export const seasonOf = (day: string): Season =>
  monthSeason[toDate(day).getMonth()];
export const rateOn = (villa: Villa, day: string) => villa.rates[seasonOf(day)];
export const lowestRate = (villa: Villa) =>
  Math.min(...Object.values(villa.rates));

/* ------------------------------------------------------------ availability (demo data) */

function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const bookedCache = new Map<string, Set<string>>();

/**
 * Nights already taken, generated from the villa's seed so the calendar looks lived-in
 * for any "today": Saturday-to-Saturday weeks in high summer, shorter stays the rest of the year.
 */
export function bookedNights(villa: Villa) {
  const hit = bookedCache.get(villa.slug);
  if (hit) return hit;
  const r = rng(villa.seed);
  const set = new Set<string>();
  const end = addDays(today(), 430);
  let d = addDays(today(), 1 + Math.floor(r() * 4));
  while (d < end) {
    const peak = seasonOf(d) === "peak";
    let length: number;
    if (peak) {
      while (weekday(d) !== 6) d = addDays(d, 1);
      length = r() < 0.3 ? 14 : 7;
    } else {
      length = 3 + Math.floor(r() * (seasonOf(d) === "low" ? 4 : 7));
    }
    for (const n of nightsOf(d, addDays(d, length))) set.add(n);
    d = addDays(d, length);
    const busy = seasonOf(d) === "low" ? 0.35 : 0.65;
    if (r() > busy)
      d = addDays(
        d,
        peak ? 7 : 2 + Math.floor(r() * (seasonOf(d) === "low" ? 14 : 8)),
      );
  }
  bookedCache.set(villa.slug, set);
  return set;
}

export const isBooked = (villa: Villa, night: string) =>
  bookedNights(villa).has(night);

export const isSaturdayRule = (day: string) => seasonOf(day) === "peak";

/** The first problem with a stay, worded as the fix; null when the dates work. */
export function checkStay(
  villa: Villa,
  arrival: string,
  departure: string,
): string | null {
  if (!arrival || !departure)
    return "Choose both an arrival and a departure date.";
  if (arrival < today())
    return "Arrival is in the past. Choose a date from today onwards.";
  if (departure <= arrival)
    return "Departure has to be at least one night after arrival.";
  const nights = daysBetween(arrival, departure);
  if (nights > 28)
    return "For stays longer than 28 nights, write to us and we will quote a monthly rate.";
  const season = seasonOf(arrival);
  if (season === "peak") {
    if (weekday(arrival) !== 6)
      return `In July and August ${villa.name} changes over on Saturdays. Choose a Saturday arrival.`;
    if (nights % 7)
      return "In July and August stays run in whole weeks: 7, 14 or 21 nights.";
  }
  const min = seasons[season].minNights;
  if (nights < min)
    return `The minimum stay in ${seasons[season].label.toLowerCase()} is ${min} nights.`;
  const clash = nightsOf(arrival, departure).find((n) => isBooked(villa, n));
  if (clash)
    return `${villa.name} is already booked on the night of ${fmtDay(clash)}. Try other dates or another house.`;
  return null;
}

/** Can a stay start on this day at all? */
export const canArrive = (villa: Villa, day: string) =>
  day >= today() &&
  !isBooked(villa, day) &&
  (!isSaturdayRule(day) || weekday(day) === 6);

/* ------------------------------------------------------------ quote */

export type Quote = {
  nights: number;
  lines: { season: Season; nights: number; rate: number }[];
  stay: number;
  cleaning: number;
  tax: number;
  total: number;
  deposit: number;
};

export function quoteFor(
  villa: Villa,
  arrival: string,
  departure: string,
  adults: number,
): Quote {
  const lines: Quote["lines"] = [];
  for (const n of nightsOf(arrival, departure)) {
    const season = seasonOf(n);
    const rate = villa.rates[season];
    const last = lines[lines.length - 1];
    if (last && last.season === season) last.nights++;
    else lines.push({ season, nights: 1, rate });
  }
  const nights = lines.reduce((s, l) => s + l.nights, 0);
  const stay = lines.reduce((s, l) => s + l.nights * l.rate, 0);
  const tax = Math.round(adults * nights * touristTax * 100) / 100;
  const total = stay + villa.cleaning + tax;
  return {
    nights,
    lines,
    stay,
    cleaning: villa.cleaning,
    tax,
    total,
    deposit: Math.round(total * depositShare),
  };
}

/* ------------------------------------------------------------ the stay being planned */

export type Stay = {
  villa: string;
  arrival: string;
  departure: string;
  adults: number;
  children: number;
};

const KEY = "hideaway-stay";
const empty: Stay = {
  villa: "",
  arrival: "",
  departure: "",
  adults: 2,
  children: 0,
};

function load(): Stay {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (raw) return { ...empty, ...(JSON.parse(raw) as Partial<Stay>) };
  } catch {
    /* storage unavailable: start empty */
  }
  return empty;
}

let state = load();
const listeners = new Set<() => void>();

export function setStay(patch: Partial<Stay>) {
  state = { ...state, ...patch };
  try {
    sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* keep it in memory only */
  }
  listeners.forEach((l) => l());
}

export function useStay() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}

export const findVilla = (slug: string) => villas.find((v) => v.slug === slug);
