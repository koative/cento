import { albums, days, type Album, type Hours, type Night } from "../content";

export const money = (n: number) =>
  n === 0 ? "Free" : `${n.toLocaleString("en-GB")} kr`;

/** "2026-10-21" → a local Date (no timezone shift). */
export const toDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isoOf = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const longDate = (iso: string) =>
  toDate(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const dateParts = (iso: string) => {
  const d = toDate(iso);
  return {
    weekday: d.toLocaleDateString("en-GB", { weekday: "short" }),
    day: d.getDate(),
    month: d.toLocaleDateString("en-GB", { month: "short" }),
  };
};

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** Minutes after midnight (may exceed 1440) → "00:40". */
export const hhmm = (mins: number) => {
  const m = ((Math.round(mins) % 1440) + 1440) % 1440;
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
};

export const hoursLabel = (h: Hours) => (h ? `${h[0]} – ${h[1]}` : "Closed");

/** [open, close] in minutes, close pushed past midnight when needed. */
const span = (h: Hours) =>
  h
    ? [
        toMin(h[0]),
        toMin(h[1]) <= toMin(h[0]) ? toMin(h[1]) + 1440 : toMin(h[1]),
      ]
    : null;

export function openStatus(week: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const yesterday = span(week[(day + 6) % 7]);
  if (yesterday && mins < yesterday[1] - 1440)
    return { open: true, label: `Open now, until ${week[(day + 6) % 7]![1]}` };
  const today = span(week[day]);
  if (today && mins >= today[0] && mins < today[1])
    return { open: true, label: `Open now, until ${week[day]![1]}` };
  if (today && mins < today[0])
    return { open: false, label: `Doors open at ${week[day]![0]} tonight` };
  for (let i = 1; i <= 7; i++) {
    const h = week[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Closed now. Opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} at ${h[0]}`,
      };
  }
  return { open: false, label: "Closed" };
}

/* ------------------------------------------------------------ the slip */

export type SlipEntry = {
  album: Album;
  side: "A" | "B";
  start: number;
  length: number;
};

/** Gap the selector takes between sides, in minutes. */
const GAP = 2;

/** Lay a night's plays out in time: each side starts when the previous one ends, plus the gap. */
export function slipOf(night: Night) {
  let t = toMin(night.start);
  const entries: SlipEntry[] = night.plays.map(([id, side]) => {
    const album = albums.find((a) => a.id === id)!;
    const length = album.sides[side === "A" ? 0 : 1];
    const entry = { album, side, start: t, length };
    t += length + GAP;
    return entry;
  });
  return { entries, start: toMin(night.start), end: t - GAP };
}

export const albumOf = (id: string) => albums.find((a) => a.id === id)!;
