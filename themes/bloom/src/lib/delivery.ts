import { useEffect, useState } from "react";
import { zones } from "../content";

export type Zone = (typeof zones)[number];

const CUTOFF_MINUTES = 13 * 60; // same-day orders close at 1 pm
const DAY = 86_400_000;
const AHEAD_DAYS = 60;

/** Re-renders every 30 s so cut-off countdowns stay honest. */
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Local YYYY-MM-DD, the format of <input type="date">. */
export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

function minutesLeft(now: Date) {
  return now.getDay() === 0
    ? 0
    : CUTOFF_MINUTES - (now.getHours() * 60 + now.getMinutes());
}

/** Earliest delivery day: today before the cut-off (same-day zones only), else the next day that isn't a Sunday. */
export function earliest(now: Date, sameDay = true) {
  let d = startOfDay(now);
  if (!(sameDay && minutesLeft(now) > 0)) d = new Date(d.getTime() + DAY);
  if (d.getDay() === 0) d = new Date(d.getTime() + DAY);
  return d;
}

export function cutoffMessage(now: Date) {
  const left = minutesLeft(now);
  if (left > 0) {
    const h = Math.floor(left / 60);
    return `Order in the next ${h ? `${h} h ` : ""}${left % 60} min for delivery today.`;
  }
  const next = earliest(now);
  return `Same-day orders have closed. Order now for delivery ${next.getTime() - startOfDay(now).getTime() === DAY ? "tomorrow" : longDate(next)}.`;
}

/** "EB4 2LT" or "eb4" → Zone A; null when we don't deliver there. */
export function zoneFor(postcode: string): Zone | null {
  const m = postcode.trim().match(/^EB(\d{1,2})(\s*\d[A-Z]{2})?$/i);
  if (!m) return null;
  const district = Number(m[1]);
  return zones.find((z) => z.districts.includes(district)) ?? null;
}

/** Why a delivery date doesn't work, phrased as the fix; null when it is fine. */
export function dateProblem(value: string, now: Date, zone: Zone | null) {
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const first = earliest(now, zone ? zone.sameDay : true);
  if (date.getDay() === 0)
    return "We don't deliver on Sundays. Choose Saturday or Monday instead.";
  if (date < first)
    return `The earliest we can deliver${zone ? ` to ${zone.name}` : ""} is ${longDate(first)}. Choose that day or later.`;
  if (date.getTime() > startOfDay(now).getTime() + AHEAD_DAYS * DAY)
    return `We take orders up to ${AHEAD_DAYS} days ahead. Choose an earlier date.`;
  return null;
}
