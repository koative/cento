import { useSyncExternalStore } from "react";
import {
  brand,
  drops,
  modeLabel,
  nextDropId,
  products,
  type Drop,
  type Product,
} from "../content";

const WEEK = 7 * 864e5;

// ponytail: the demo calendar slides forward in whole weeks so the next drop always lies ahead of today
// (DST can nudge shifted times by an hour). A live shop sets `shift` to 0 and uses the dates as written.
const anchor = Date.parse(drops.find((d) => d.id === nextDropId)!.date);
const shift = Math.max(0, Math.ceil((Date.now() - anchor) / WEEK)) * WEEK;

/** A content date (ISO with offset) as epoch ms on the demo clock. */
export const at = (iso: string) => Date.parse(iso) + shift;

/* One shared one-second tick for every countdown on the page. */
let now = Date.now();
const subs = new Set<() => void>();
let timer: number | undefined;
function subscribe(l: () => void) {
  subs.add(l);
  timer ??= window.setInterval(() => {
    now = Date.now();
    subs.forEach((f) => f());
  }, 1000);
  return () => {
    subs.delete(l);
    if (!subs.size) {
      window.clearInterval(timer);
      timer = undefined;
    }
  };
}
export const useNow = () => useSyncExternalStore(subscribe, () => now);

export type DropStatus = "upcoming" | "raffle-open" | "raffle-drawn" | "live";

export function dropStatus(d: Drop, t: number): DropStatus {
  if (t >= at(d.date)) return "live";
  if (d.mode === "raffle")
    return d.raffleCloses && t < at(d.raffleCloses)
      ? "raffle-open"
      : "raffle-drawn";
  return "upcoming";
}

export const dropOf = (p: Product) => drops.find((d) => d.id === p.drop)!;
export const productsIn = (d: Drop) => products.filter((p) => p.drop === d.id);
/** Released, not raffle-only, and at least one size left. */
export const buyable = (p: Product, t: number) => {
  const d = dropOf(p);
  return d.mode !== "raffle" && dropStatus(d, t) === "live";
};
export const soldOut = (p: Product) => p.stock.every((n) => n === 0);
export const nextDrop = (t: number) =>
  drops.find((d) => at(d.date) > t) ?? drops[drops.length - 1];
export const openRaffles = (t: number) =>
  drops.filter((d) => dropStatus(d, t) === "raffle-open");

const fmt = (o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: brand.timezone, ...o });
const partsOf = (ms: number, o: Intl.DateTimeFormatOptions) =>
  Object.fromEntries(
    fmt(o)
      .formatToParts(ms)
      .map((p) => [p.type, p.value]),
  );

/** "Sat 24 Oct" */
export function dayLabel(ms: number) {
  const p = partsOf(ms, { weekday: "short", day: "numeric", month: "short" });
  return `${p.weekday} ${p.day} ${p.month}`;
}
/** "11:00" in store time. */
export const timeLabel = (ms: number) =>
  fmt({ hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(ms);
export const dateParts = (ms: number) =>
  partsOf(ms, { weekday: "short", day: "2-digit", month: "short" });

export function remaining(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}
export const pad = (n: number) => String(n).padStart(2, "0");

/** Short "5d 22h" style label for compact places. */
export function shortCountdown(ms: number) {
  const r = remaining(ms);
  return r.d
    ? `${r.d}d ${r.h}h`
    : r.h
      ? `${r.h}h ${pad(r.m)}m`
      : `${r.m}m ${pad(r.s)}s`;
}

/** Download an .ics so the drop lands in the visitor's own calendar. */
export function downloadIcs(d: Drop) {
  const stamp = (ms: number) =>
    new Date(ms)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const start = at(d.date);
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Drop//Drops calendar//EN",
    "BEGIN:VEVENT",
    `UID:${d.id}@drop.example`,
    `DTSTAMP:${stamp(Date.now())}`,
    `DTSTART:${stamp(start)}`,
    `DTEND:${stamp(start + 30 * 60e3)}`,
    `SUMMARY:${brand.name} ${String(d.number).padStart(3, "0")}: ${d.name}`,
    `DESCRIPTION:${modeLabel[d.mode]}`,
    `LOCATION:${brand.address.join(", ")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([body], { type: "text/calendar" }));
  a.download = `drop-${d.id}.ics`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/** Raffles are drawn at 18:00 the evening before the drop. */
export const drawAt = (d: Drop) => at(d.date) - 17 * 3600e3;

export const dropNo = (d: Drop) => String(d.number).padStart(3, "0");
