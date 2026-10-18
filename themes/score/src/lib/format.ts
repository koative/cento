import type { Hours, Recital, Teacher } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/** Midnight today plus n days. */
export function dayFromNow(n: number, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  d.setDate(d.getDate() + n);
  return d;
}

/** "16:30" → "4:30 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

export const recitalDate = (r: Recital) => dayFromNow(r.inDays);

/* ------------------------------------------------------------ trial slots */

export type Slot = { time: string; teacher: Teacher };

/** The next `count` teaching days (Monday–Saturday), starting tomorrow. */
export function bookableDays(count = 10, from = new Date()) {
  const days: Date[] = [];
  for (let i = 1; days.length < count; i++) {
    const d = dayFromNow(i, from);
    if (d.getDay() !== 0) days.push(d);
  }
  return days;
}

/** Deterministic "already booked" pattern so the demo calendar looks lived-in but stays stable per day. */
function taken(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return h % 3 === 0;
}

/** Open 30-minute trial slots on a day for the teachers of one programme, earliest first. */
export function slotsFor(day: Date, teachers: Teacher[]): Slot[] {
  const weekday = day.getDay() as keyof Hours;
  const slots: Slot[] = [];
  for (const teacher of teachers) {
    const span = teacher.hours[weekday];
    if (!span) continue;
    const [start, end] = span.map((t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    });
    for (let m = start; m + 30 <= end; m += 60) {
      const time = `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
      if (!taken(`${teacher.slug}${day.toDateString()}${time}`))
        slots.push({ time, teacher });
    }
  }
  return slots.sort((a, b) => a.time.localeCompare(b.time));
}

export const isoDay = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
