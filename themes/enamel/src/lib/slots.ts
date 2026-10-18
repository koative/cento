import { dentists, hours } from "../content";
import { clock, toMin } from "./format";

export type Slot = { time: string; dentist: string };

const pad = (n: number) => String(n).padStart(2, "0");
export const dateKey = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/** Stable pseudo-random 0–1 per string, so the diary looks the same on every visit. */
function noise(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

/** Midnight dates for the next `n` days, today included. */
export function daysAhead(n = 14, now = new Date()) {
  return Array.from(
    { length: n },
    (_, i) => new Date(now.getFullYear(), now.getMonth(), now.getDate() + i),
  );
}

/**
 * Free start times on one day for the given dentists, every 15 minutes, skipping ~70% as already booked.
 * With several dentists each time is offered once, by the first dentist free at that time.
 */
export function slotsFor(
  day: Date,
  who: string[],
  minutes: number,
  now = new Date(),
): Slot[] {
  const open = hours[day.getDay()];
  if (!open) return [];
  const earliest =
    dateKey(day) === dateKey(now)
      ? now.getHours() * 60 + now.getMinutes() + 60
      : 0;
  const out: Slot[] = [];
  for (let m = toMin(open[0]); m + minutes <= toMin(open[1]); m += 15) {
    if (m < earliest || (m >= 12 * 60 + 30 && m < 13 * 60 + 15)) continue; // lunch
    const time = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
    const free = who.find((slug) => {
      const d = dentists.find((x) => x.slug === slug);
      return (
        d?.days.includes(day.getDay()) &&
        noise(`${dateKey(day)}${slug}${time}`) > 0.72
      );
    });
    if (free) out.push({ time, dentist: free });
  }
  return out;
}

export function nextFree(who: string[], minutes: number, now = new Date()) {
  for (const day of daysAhead(21, now)) {
    const slot = slotsFor(day, who, minutes, now)[0];
    if (slot) return { day, ...slot, label: clock(slot.time) };
  }
  return null;
}
