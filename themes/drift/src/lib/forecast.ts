import type { LevelId, Spot } from "../content";

/*
 * Sample forecast for the demo. Swell, wind and tide are generated from the calendar day,
 * so the numbers change daily but stay stable within a day. Swap `forecast()` for a real
 * marine-weather feed in production.
 */

export const HOURS = Array.from({ length: 14 }, (_, i) => i + 6); // 6:00 – 19:00

export type Rating = "good" | "fair" | "poor";

export type Hour = {
  hour: number;
  wave: number; // ft, face height
  period: number; // s
  wind: number; // mph
  windFrom: string;
  windDeg: number; // direction the wind blows from
  offshore: boolean;
  tide: number; // ft
  rising: boolean;
};

export type Day = { date: Date; hours: Hour[] };

const TIDE = 12.42; // hours, semi-diurnal
const round1 = (n: number) => Math.round(n * 10) / 10;

export function forecast(spot: Spot, from = new Date()): Day[] {
  const start = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const epoch = Math.floor(start.getTime() / 86_400_000);
  return Array.from({ length: 7 }, (_, i) => {
    const d = epoch + i;
    const swell = Math.max(
      0.9,
      2.5 + 1.4 * Math.sin(d * 0.9 + 0.6) + 0.6 * Math.sin(d * 2.1 + 1),
    );
    const period = Math.round(8 + 3 * Math.sin(d * 0.7 + 1));
    const breeze = 0.9 + 0.35 * Math.sin(d * 0.7);
    const calm = 3 + 2 * Math.sin(d * 1.3);
    const turn = 11 + Math.round(Math.sin(d * 1.7));
    const hours = HOURS.map((hour): Hour => {
      const phase = (((d * 24 + hour) % TIDE) / TIDE) * 2 * Math.PI;
      const [windFrom, windDeg] =
        hour < turn ? ["E", 90] : hour < turn + 2 ? ["S", 180] : ["WNW", 292];
      return {
        hour,
        wave: round1(swell * spot.size * (1 - 0.08 * Math.sin(phase))),
        period,
        wind: Math.round(calm + Math.max(0, hour - 7) * breeze),
        windFrom,
        windDeg,
        offshore: windDeg === 90,
        tide: round1(3.2 + 2.3 * Math.sin(phase)),
        rising: Math.cos(phase) > 0,
      };
    });
    return {
      date: new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + i,
      ),
      hours,
    };
  });
}

const rules: Record<
  LevelId,
  { min: number; max: number; wind: number; period?: number }
> = {
  "first-wave": { min: 1, max: 3.2, wind: 12 },
  "find-your-line": { min: 2, max: 4.5, wind: 11 },
  "go-deeper": { min: 3, max: 7, wind: 9, period: 9 },
};

export function rate(h: Hour, level: LevelId): Rating {
  const r = rules[level];
  const clean = h.offshore || h.wind <= r.wind;
  if (
    h.wave >= r.min &&
    h.wave <= r.max &&
    clean &&
    h.period >= (r.period ?? 0)
  )
    return "good";
  if (h.wave >= r.min * 0.7 && h.wave <= r.max * 1.25 && h.wind <= r.wind + 7)
    return "fair";
  return "poor";
}

export const ratingLabel: Record<Rating, string> = {
  good: "Good",
  fair: "Fair",
  poor: "Poor",
};

export function sizeWord(ft: number) {
  if (ft < 1.5) return "knee-high";
  if (ft < 2.5) return "thigh to waist";
  if (ft < 3.5) return "waist to chest";
  if (ft < 5) return "chest to head";
  if (ft < 6.5) return "head-high";
  return "overhead";
}

/** One sentence a coach would say about this hour for this level. */
export function verdict(h: Hour, level: LevelId, lessonName: string) {
  const r = rules[level];
  const size = sizeWord(h.wave);
  const wind = h.offshore
    ? "light offshore wind"
    : `${h.wind} mph ${h.windFrom} wind`;
  switch (rate(h, level)) {
    case "good":
      return `Clean, ${size} and ${wind}. A good hour for ${lessonName}.`;
    case "fair":
      return `${size[0].toUpperCase() + size.slice(1)} with ${wind}. Surfable for ${lessonName}, not ideal.`;
    default:
      if (h.wave < r.min * 0.7)
        return `Too small for ${lessonName} at ${h.wave} ft. Look at a lower level or another day.`;
      if (h.wave > r.max * 1.25)
        return `Too big for ${lessonName} at ${h.wave} ft. We would move you to a sheltered spot.`;
      return `Blown out by ${h.wind} mph ${h.windFrom} wind. Mornings are cleaner.`;
  }
}

/** The start of the longest run of good hours, else the best fair hour, else null. */
export function bestHour(day: Day, level: LevelId): Hour | null {
  let best: Hour | null = null;
  let bestLen = 0;
  let runStart: Hour | null = null;
  let len = 0;
  for (const h of day.hours) {
    if (rate(h, level) === "good") {
      if (!len) runStart = h;
      len++;
      if (len > bestLen) ((best = runStart), (bestLen = len));
    } else len = 0;
  }
  return best ?? day.hours.find((h) => rate(h, level) === "fair") ?? null;
}

export const hourLabel = (h: number) => `${String(h).padStart(2, "0")}:00`;
