import { hours, pickupRules, products, type Bake } from "../content";
import type { CartLine } from "./cart";

/** 345 → "5:45" */
export const clock = (minutes: number) =>
  `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")}`;

export const minutesNow = (d = new Date()) =>
  d.getHours() * 60 + d.getMinutes();

export const dayLabel = (d: Date, style: "short" | "long" = "short") =>
  d.toLocaleDateString("en-US", {
    weekday: style,
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });

export const noticeLabel = (leadDays: number) =>
  leadDays === 0
    ? "Same day"
    : leadDays === 1
      ? "Next morning"
      : `${leadDays} days' notice`;

/** "2026-11-07" → local Date at midnight (avoids the UTC shift of new Date(iso)). */
export function fromIso(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isoDate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Is the shop counter open right now, and what to say about it. */
export function openState(now = new Date()) {
  const today = hours[now.getDay()];
  const t = minutesNow(now);
  if (
    today.open !== null &&
    today.close !== null &&
    t >= today.open &&
    t < today.close
  )
    return { open: true, text: `Open now · until ${clock(today.close)}` };
  for (let i = t < (today.open ?? 0) ? 0 : 1; i < 8; i++) {
    const next = hours[(now.getDay() + i) % 7];
    if (next.open === null) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : next.day;
    return {
      open: false,
      text: `Closed · opens ${when} at ${clock(next.open)}`,
    };
  }
  return { open: false, text: "Closed" };
}

export type BakeState = "later" | "oven" | "warm" | "rack" | "gone";

export const bakeStateLabel: Record<BakeState, string> = {
  later: "Not yet",
  oven: "In the oven",
  warm: "Warm",
  rack: "On the rack",
  gone: "Usually gone",
};

/** Oven loads take 25 minutes; anything out less than 45 minutes ago still counts as warm. */
export const OVEN_MIN = 25;
export const WARM_MIN = 45;

export function bakeState(b: Bake, t: number): BakeState {
  if (t < b.out - OVEN_MIN) return "later";
  if (t < b.out) return "oven";
  if (t < b.out + WARM_MIN) return "warm";
  if (b.gone === null || t < b.gone) return "rack";
  return "gone";
}

export type PickupDay = {
  iso: string;
  date: Date;
  ok: boolean;
  reason?: string;
};

/**
 * The next pickupRules.horizonDays days, each marked collectable or not for this bag:
 * closed days, notice (lead days, with the evening cut-off) and the weekdays each item is baked.
 */
export function pickupDays(cart: CartLine[], now = new Date()): PickupDay[] {
  const items = cart
    .map((l) => products.find((p) => p.id === l.id))
    .filter((p) => p !== undefined);
  const lead = Math.max(0, ...items.map((p) => p.leadDays));
  const late =
    lead === 0
      ? now.getHours() >= 13
      : now.getHours() >= pickupRules.cutoffHour;
  const earliest = lead + (late ? 1 : 0);
  const days: PickupDay[] = [];
  for (let i = 0; i <= pickupRules.horizonDays; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const day: PickupDay = { iso: isoDate(date), date, ok: false };
    const missing = items.find((p) => !p.bakeDays.includes(date.getDay()));
    if (hours[date.getDay()].open === null) day.reason = "Closed";
    else if (i < earliest)
      day.reason = lead >= 2 ? "Needs 2 days' notice" : "Too soon";
    else if (missing) day.reason = `No ${missing.name.toLowerCase()} that day`;
    else day.ok = true;
    days.push(day);
  }
  return days;
}
