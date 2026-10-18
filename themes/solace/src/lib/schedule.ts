import {
  clinicians,
  locations,
  services,
  type Location,
  type Service,
} from "../content";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
/** Monday-first order for timetables. */
export const WEEK = [1, 2, 3, 4, 5, 6, 0];

export const clinicianBy = (slug: string) =>
  clinicians.find((c) => c.slug === slug);
export const locationBy = (slug: string) =>
  locations.find((l) => l.slug === slug);
export const serviceBy = (slug: string) =>
  services.find((s) => s.slug === slug);

export type Slot = {
  date: string;
  time: number;
  clinician: string;
  location: string;
};

export function iso(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function fromIso(s: string) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function fmtTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

export const fmtDay = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/** The next `count` clinic days starting today (Sundays skipped — every clinic is closed). */
export function upcomingDays(count: number, from = new Date()) {
  const out: Date[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (out.length < count) {
    if (d.getDay() !== 0) out.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

// FNV-1a: a stable pseudo-random "already booked" pattern, so the demo diary looks the same on every visit.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const LUNCH: [number, number] = [12 * 60 + 30, 13 * 60 + 30];

/** Open slots for a service on one day, optionally narrowed to a location and/or clinician. */
export function slotsFor(
  service: Service,
  date: Date,
  opts: { location?: string; clinician?: string } = {},
  now = new Date(),
): Slot[] {
  const dow = date.getDay();
  const isToday = iso(date) === iso(now);
  const earliest = now.getHours() * 60 + now.getMinutes() + 60;
  const out: Slot[] = [];
  for (const c of clinicians) {
    if (
      !service.clinicians.includes(c.slug) ||
      (opts.clinician && opts.clinician !== c.slug)
    )
      continue;
    for (const [loc, days] of Object.entries(c.schedule)) {
      if (
        !days.includes(dow) ||
        !service.locations.includes(loc) ||
        (opts.location && opts.location !== loc)
      )
        continue;
      const hours = locationBy(loc)?.hours[dow];
      if (!hours) continue;
      for (
        let t = hours[0] + 30;
        t + service.minutes <= hours[1] - 15;
        t += 30
      ) {
        if (t + service.minutes > LUNCH[0] && t < LUNCH[1]) continue;
        if (isToday && t < earliest) continue;
        if (hash(iso(date) + c.slug + t) % 10 < 6) continue;
        out.push({
          date: iso(date),
          time: t,
          clinician: c.slug,
          location: loc,
        });
      }
    }
  }
  return out.sort((a, b) => a.time - b.time);
}

/** First open slots across the next fortnight. */
export function nextSlots(
  service: Service,
  count: number,
  opts: { location?: string; clinician?: string } = {},
) {
  const out: Slot[] = [];
  for (const day of upcomingDays(14)) {
    out.push(...slotsFor(service, day, opts));
    if (out.length >= count) break;
  }
  return out.slice(0, count);
}

export function openState(loc: Location, now = new Date()) {
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = loc.hours[now.getDay()];
  if (today && mins >= today[0] && mins < today[1])
    return { open: true, text: `Open now, until ${fmtTime(today[1])}` };
  for (let i = 0; i < 7; i++) {
    const day = (now.getDay() + i) % 7;
    const hours = loc.hours[day];
    if (!hours || (i === 0 && mins >= hours[0])) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : DAYS[day];
    return {
      open: false,
      text: `Closed — opens ${when} at ${fmtTime(hours[0])}`,
    };
  }
  return { open: false, text: "Closed" };
}
