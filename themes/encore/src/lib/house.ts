import {
  layouts,
  type AccessKind,
  type Production,
  type Stage,
  type Zone,
} from "../content";
import { day } from "./util";

/* ------------------------------------------------------------ performances */

export type Performance = {
  id: string; // "2026-10-24-1400"
  date: string;
  time: string;
  preview: boolean;
  access?: AccessKind;
  soldPct: number;
};

/** Stable pseudo-random 0–99 from a string, so availability is the same on every visit. */
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++)
    h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return (h >>> 0) % 100;
}

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/**
 * The house pattern: dark Mondays, 7:30 pm Tuesday–Saturday, 2:00 pm matinees Saturday and Sunday.
 * Past performances are dropped, so a closed production returns an empty list.
 */
export function performancesOf(p: Production, now = new Date()): Performance[] {
  const out: Performance[] = [];
  const today = iso(now);
  let n = 0;
  for (let d = day(p.opens); iso(d) <= p.closes; d.setDate(d.getDate() + 1)) {
    const wd = d.getDay();
    const times = [
      ...(wd === 0 || wd === 6 ? ["14:00"] : []),
      ...(wd >= 2 ? ["19:30"] : []),
    ];
    for (const time of times) {
      const date = iso(d);
      const id = `${date}-${time.replace(":", "")}`;
      const access = p.access.find(
        (a) => a.date === date && a.time === time,
      )?.kind;
      // Earlier dates have sold more; weekends sell fastest.
      const soldPct = Math.min(
        96,
        25 + hash(id) / 2 + (wd === 5 || wd === 6 ? 18 : 0),
      );
      if (date >= today)
        out.push({ id, date, time, preview: n < 3, access, soldPct });
      n++;
    }
  }
  return out;
}

export function availability(soldPct: number) {
  if (soldPct >= 90) return { label: "Last few seats", level: "low" as const };
  if (soldPct >= 70) return { label: "Selling fast", level: "mid" as const };
  return { label: "Good availability", level: "high" as const };
}

/* ------------------------------------------------------------ seats */

export type Seat = {
  id: string; // "C7"
  row: string;
  number: number;
  section: string;
  zone: Zone;
  /** Rows counted back from the stage across the whole house. */
  depth: number;
  /** −1 (far left, house right) … 1 (far right). */
  across: number;
  elevated: boolean;
};

export type SeatRow = { label: string; section: string; blocks: Seat[][] };

/** Every row split into left, centre and right blocks around two aisles. */
export function houseOf(stage: Stage): SeatRow[] {
  let depth = 0;
  return layouts[stage].flatMap((section, s) =>
    section.rows.map((row) => {
      const seats = Array.from({ length: row.seats }, (_, i): Seat => {
        const id = `${row.label}${i + 1}`;
        const edge =
          section.partialEnds &&
          (i < section.partialEnds || i >= row.seats - section.partialEnds);
        const zone: Zone = section.wheelchair?.includes(id)
          ? "wheelchair"
          : edge && row.zone === "value"
            ? "partial"
            : row.zone;
        return {
          id,
          row: row.label,
          number: i + 1,
          section: section.name,
          zone,
          depth,
          across: (i - (row.seats - 1) / 2) / ((row.seats - 1) / 2),
          elevated: s > 0,
        };
      });
      depth++;
      const side = Math.round(row.seats / 4);
      return {
        label: row.label,
        section: section.name,
        blocks: [
          seats.slice(0, side),
          seats.slice(side, row.seats - side),
          seats.slice(row.seats - side),
        ],
      };
    }),
  );
}

export const isSold = (perf: Performance, seat: Seat) =>
  hash(perf.id + seat.id) < perf.soldPct;

export function seatPrice(p: Production, zone: Zone, type: string) {
  const base = p.prices[zone] ?? p.prices.standard ?? 0;
  if (type === "under30") return Math.min(30, base);
  if (type === "member") return Math.round(base * 0.85);
  return base;
}

export const priceFrom = (p: Production) =>
  Math.min(...Object.values(p.prices));
