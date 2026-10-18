import { useEffect, useState } from "react";
import { deliveryDays, type DeliveryDay } from "../content";

/** The next choice cutoff: Wednesday 23:59:59 local time. */
export function nextCutoff(now = new Date()) {
  const d = new Date(now);
  d.setDate(d.getDate() + ((3 - d.getDay() + 7) % 7));
  d.setHours(23, 59, 59, 999);
  return d;
}

/** Monday to Thursday of the delivery week that follows the cutoff. */
export function deliveryDates(now = new Date()) {
  const monday = nextCutoff(now);
  monday.setDate(monday.getDate() + 5);
  monday.setHours(12, 0, 0, 0);
  return Object.fromEntries(
    deliveryDays.map((day, i) => [
      day,
      new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i),
    ]),
  ) as Record<DeliveryDay, Date>;
}

export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/** Ticks once a minute so countdowns stay current. */
export function useNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export function timeLeft(now: Date) {
  const mins = Math.max(
    0,
    Math.floor((nextCutoff(now).getTime() - now.getTime()) / 60_000),
  );
  const days = Math.floor(mins / 1440);
  const hours = Math.floor((mins % 1440) / 60);
  if (days > 0) return `${days} ${days === 1 ? "day" : "days"} ${hours} h`;
  return `${hours} h ${mins % 60} min`;
}

/** The menu week label, e.g. "Oct 26 – Nov 1". */
export function menuWeek(now = new Date()) {
  const mon = deliveryDates(now).Mon;
  const sun = new Date(mon.getFullYear(), mon.getMonth(), mon.getDate() + 6);
  const f = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${f(mon)} – ${f(sun)}`;
}
