import { barbers, brand, days, type Barber } from "../content";
import { fromMin, toMin } from "./format";

const STEP = 20;

/** Local yyyy-mm-dd, used as the day's id. */
export const dayId = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export function upcomingDays(count = 14, from = new Date()) {
  return Array.from(
    { length: count },
    (_, i) => new Date(from.getFullYear(), from.getMonth(), from.getDate() + i),
  );
}

/** Deterministic "already booked" pattern so the demo book looks lived-in and stays stable between visits. */
function taken(barber: string, day: string, time: string) {
  let h = 7;
  for (const ch of barber + day + time) h = (h * 31 + ch.charCodeAt(0)) % 9973;
  return h % 10 < 4;
}

/** Start times ("HH:MM") a barber can take a service of `minutes` on `date`. */
export function slotsFor(
  barber: Barber,
  date: Date,
  minutes: number,
  now = new Date(),
) {
  const hours = brand.hours[date.getDay()];
  if (!hours || !barber.days.includes(date.getDay())) return [];
  const id = dayId(date);
  const earliest =
    id === dayId(now) ? now.getHours() * 60 + now.getMinutes() + 30 : 0;
  const out: string[] = [];
  for (let t = toMin(hours[0]); t + minutes <= toMin(hours[1]); t += STEP) {
    const time = fromMin(t);
    if (t >= earliest && !taken(barber.id, id, time)) out.push(time);
  }
  return out;
}

/** Every open start time that day, each with the first barber (by chair) who can take it. */
export function openChairs(
  date: Date,
  minutes: number,
  only?: string,
  now = new Date(),
) {
  const map = new Map<string, Barber>();
  for (const b of barbers) {
    if (only && b.id !== only) continue;
    for (const t of slotsFor(b, date, minutes, now))
      if (!map.has(t)) map.set(t, b);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([time, barber]) => ({ time, barber }));
}

/** The next free chair from now, looking up to a week ahead. */
export function nextChair(minutes = 40, now = new Date()) {
  for (const date of upcomingDays(7, now)) {
    const first = openChairs(date, minutes, undefined, now)[0];
    if (first) return { date, ...first };
  }
  return null;
}

/** "today", "tomorrow" or the weekday name. */
export function whenLabel(date: Date, now = new Date()) {
  const diff = Math.round(
    (new Date(date).setHours(0, 0, 0, 0) - new Date(now).setHours(0, 0, 0, 0)) /
      86400000,
  );
  return diff === 0 ? "today" : diff === 1 ? "tomorrow" : days[date.getDay()];
}

/** Working days in shop order (the week starts Tuesday), runs collapsed: "Tue–Sat", "Sun, Tue & Wed". */
export function workdays(list: number[]) {
  const order = [2, 3, 4, 5, 6, 0, 1];
  const short = (d: number) => days[d].slice(0, 3);
  const runs: number[][] = [];
  order.forEach((d, i) => {
    if (!list.includes(d)) return;
    const last = runs[runs.length - 1];
    if (last && order.indexOf(last[last.length - 1]) === i - 1) last.push(d);
    else runs.push([d]);
  });
  const parts = runs.map((r) =>
    r.length > 2
      ? `${short(r[0])}–${short(r[r.length - 1])}`
      : r.map(short).join(", "),
  );
  return parts.length > 1
    ? `${parts.slice(0, -1).join(", ")} & ${parts[parts.length - 1]}`
    : parts[0];
}
