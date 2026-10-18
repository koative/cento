import { aftercare, rates, type Design } from "../content";

export const money = (n: number) => "$" + n.toLocaleString("en-US");

/**
 * Flash is priced at its starting size; area grows with the square of the size but
 * small pieces carry fixed set-up time, so price scales with size^1.6 (rounded to $10).
 */
export function estimate(d: Design, cm: number) {
  const price = Math.max(
    rates.minimum,
    Math.round((d.price * (cm / d.minCm) ** 1.6) / 10) * 10,
  );
  const hours = Math.max(1, Math.round((price / rates.hourly) * 2) / 2);
  return { price, hours };
}

export const hoursLabel = (h: number) => `${h} ${h === 1 ? "hour" : "hours"}`;

export function stageFor(days: number) {
  return aftercare.stages.findIndex((s) => days >= s.from && days <= s.to);
}

/** Query string after the hash route, e.g. #/book?design=orbit. */
export function routeQuery() {
  return new URLSearchParams(window.location.hash.split("?")[1] ?? "");
}
