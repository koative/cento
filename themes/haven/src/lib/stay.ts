import { useSyncExternalStore } from "react";
import {
  board,
  cityTax,
  extras,
  peakDates,
  rooms,
  seasons,
  type Room,
} from "../content";

/* ------------------------------------------------------------ dates (ISO yyyy-mm-dd, UTC) */

export const fromIso = (s: string) => new Date(s + "T00:00:00Z");
export const toIso = (d: Date) => d.toISOString().slice(0, 10);

export function addDays(s: string, n: number) {
  const d = fromIso(s);
  d.setUTCDate(d.getUTCDate() + n);
  return toIso(d);
}

export const nightsBetween = (a: string, b: string) =>
  Math.round((fromIso(b).getTime() - fromIso(a).getTime()) / 864e5);

export function today() {
  const n = new Date();
  return toIso(new Date(Date.UTC(n.getFullYear(), n.getMonth(), n.getDate())));
}

const fmt = (o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { ...o, timeZone: "UTC" });
const short = fmt({ weekday: "short", day: "numeric", month: "short" });
const long = fmt({
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});
const monthName = fmt({ month: "long", year: "numeric" });
const dayMonth = fmt({ day: "numeric", month: "long", year: "numeric" });

export const shortDate = (s: string) => short.format(fromIso(s));
export const longDate = (s: string) => long.format(fromIso(s));
export const monthLabel = (s: string) => monthName.format(fromIso(s));
export const postDate = (s: string) => dayMonth.format(fromIso(s));

/** [MM-DD from, MM-DD to) where the range may wrap the new year. */
function within(s: string, from: string, to: string) {
  const md = s.slice(5);
  return from <= to ? md >= from && md < to : md >= from || md < to;
}
const pad = ([m, d]: readonly [number, number]) =>
  `${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

/** The night starting on date s falls inside a season (the season's last date is the final check-out). */
export const isOpen = (s: string) =>
  seasons.some((x) => within(s, pad(x.from), pad(x.to)));
const isPeak = (s: string) => peakDates.some(([a, b]) => within(s, a, b));

/* ------------------------------------------------------------ availability and rates */

/** Stable pseudo-random 0–1 for a string, so availability is identical on every visit. */
function hash(str: string) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++)
    h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}

export function rate(room: Room, s: string) {
  const day = fromIso(s).getUTCDay();
  const factor = (isPeak(s) ? 1.25 : 1) * (day === 5 || day === 6 ? 1.1 : 1);
  return Math.round((room.price * factor) / 5) * 5;
}

export function nightFree(room: Room, s: string) {
  if (s < today() || !isOpen(s)) return false;
  return (
    hash(room.id + s) >
    (room.kind === "cabin" ? 0.3 : 0.2) + (isPeak(s) ? 0.25 : 0)
  );
}

export function nightsOf(checkIn: string, checkOut: string) {
  return Array.from({ length: nightsBetween(checkIn, checkOut) }, (_, i) =>
    addDays(checkIn, i),
  );
}

export const stayFree = (room: Room, a: string, b: string) =>
  nightsOf(a, b).every((n) => nightFree(room, n));
export const takenNights = (room: Room, a: string, b: string) =>
  nightsOf(a, b).filter((n) => !nightFree(room, n)).length;
export const stayRate = (room: Room, a: string, b: string) =>
  nightsOf(a, b).reduce((sum, n) => sum + rate(room, n), 0);

/** Lowest rate that night among rooms that fit the party (or just the chosen room). */
export function cheapest(s: string, guests: number, roomId: string | null) {
  const pool = rooms.filter(
    (r) => (roomId ? r.id === roomId : r.sleeps >= guests) && nightFree(r, s),
  );
  return pool.length ? Math.min(...pool.map((r) => rate(r, s))) : null;
}

/* ------------------------------------------------------------ money */

const chf = new Intl.NumberFormat("en-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const chfCents = new Intl.NumberFormat("en-CH", {
  style: "currency",
  currency: "CHF",
  minimumFractionDigits: 2,
});
export const money = (n: number) =>
  (Number.isInteger(n) ? chf : chfCents).format(n);

/* ------------------------------------------------------------ booking draft (in memory, shared across pages) */

export type Draft = {
  checkIn: string | null;
  checkOut: string | null;
  adults: number;
  children: number;
  roomId: string | null;
  board: (typeof board)[number]["id"];
  extras: string[];
};

let draft: Draft = {
  checkIn: null,
  checkOut: null,
  adults: 2,
  children: 0,
  roomId: null,
  board: "breakfast",
  extras: [],
};
const listeners = new Set<() => void>();

export function setDraft(patch: Partial<Draft>) {
  draft = { ...draft, ...patch };
  listeners.forEach((l) => l());
}

export function resetDraft() {
  setDraft({
    checkIn: null,
    checkOut: null,
    roomId: null,
    board: "breakfast",
    extras: [],
  });
}

export function useDraft() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => draft,
  );
}

export type Line = { label: string; amount: number };

export function quote(d: Draft) {
  const room = rooms.find((r) => r.id === d.roomId);
  if (!d.checkIn || !d.checkOut) return null;
  const nights = nightsBetween(d.checkIn, d.checkOut);
  const guests = d.adults + d.children;
  const lines: Line[] = [];
  if (room)
    lines.push({
      label: `${room.name}, ${nights} nights`,
      amount: stayRate(room, d.checkIn, d.checkOut),
    });
  const b = board.find((x) => x.id === d.board);
  if (b && b.price)
    lines.push({
      label: `${b.label}, ${guests} × ${nights}`,
      amount: b.price * guests * nights,
    });
  for (const e of extras.filter((x) => d.extras.includes(x.id))) {
    const times =
      e.per === "stay" ? 1 : e.per === "night" ? nights : guests * nights;
    lines.push({ label: e.label, amount: e.price * times });
  }
  lines.push({
    label: `Local tax, ${d.adults} adults × ${nights}`,
    amount: cityTax * d.adults * nights,
  });
  return {
    room,
    nights,
    guests,
    lines,
    total: lines.reduce((s, l) => s + l.amount, 0),
  };
}
