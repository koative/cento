import {
  delivery,
  deliveryWindows,
  zones,
  type DeliveryWindow,
  type Zone,
} from "../content";

export type SlotStatus = "open" | "few" | "full" | "closed";
export type Slot = {
  id: string;
  date: Date;
  window: DeliveryWindow;
  status: SlotStatus;
  /** Rider places left in this window. */
  left: number;
  /** A rider is already booked nearby, so the fee is discounted. */
  green: boolean;
  fee: number;
  cutoff: Date;
};

const HOUR = 3_600_000;

const isoDay = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function slotAt(date: Date, window: DeliveryWindow, now: Date): Slot {
  const start = new Date(date);
  start.setHours(window.start, 0, 0, 0);
  const cutoff = new Date(start.getTime() - delivery.cutoffHours * HOUR);
  // Demo capacity: a stable pseudo-random spread per day and window, so the board looks lived-in but never flickers.
  const seed =
    (date.getDate() * 37 + date.getMonth() * 11 + window.start * 7) % 13;
  const left = seed < 2 ? 0 : seed - 1;
  const green = left > 0 && seed % 4 === 2;
  const status: SlotStatus =
    now > cutoff ? "closed" : left === 0 ? "full" : left <= 3 ? "few" : "open";
  return {
    id: `${isoDay(date)}|${window.id}`,
    date,
    window,
    status,
    left,
    green,
    fee: window.fee - (green ? delivery.greenDiscount : 0),
    cutoff,
  };
}

/** The next `days` delivery days, starting today, or tomorrow once today's last window has closed. */
export function week(now = new Date(), days = 7) {
  const all = Array.from({ length: days + 1 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    return { date, slots: deliveryWindows.map((w) => slotAt(date, w, now)) };
  });
  return all[0].slots.some((s) => s.status !== "closed")
    ? all.slice(0, days)
    : all.slice(1);
}

export const bookable = (s: Slot) => s.status === "open" || s.status === "few";

/** Resolve a stored slot id; null when it is malformed, closed or full. */
export function findSlot(id: string | null, now = new Date()): Slot | null {
  if (!id) return null;
  const [day, windowId] = id.split("|");
  const [y, m, d] = day.split("-").map(Number);
  const window = deliveryWindows.find((w) => w.id === windowId);
  if (!window || !y || !m || !d) return null;
  const slot = slotAt(new Date(y, m - 1, d), window, now);
  return bookable(slot) ? slot : null;
}

export const nextOpenSlot = (now = new Date()) =>
  week(now)
    .flatMap((d) => d.slots)
    .find(bookable) ?? null;

export const dayLabel = (d: Date, style: "short" | "long" = "short") =>
  d.toLocaleDateString("en-US", {
    weekday: style,
    month: style === "long" ? "long" : "short",
    day: "numeric",
  });

export const slotLabel = (s: Slot) =>
  `${dayLabel(s.date, "long")}, ${s.window.label}`;

export const cutoffLabel = (s: Slot) =>
  s.cutoff.toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
  });

export const zoneFor = (zip: string): Zone | undefined =>
  zones.find((z) => z.zips.includes(zip.trim()));

/** Delivery charge for a basket: free over the threshold, otherwise the window fee plus any zone surcharge. */
export function deliveryFee(slot: Slot | null, sub: number, zone?: Zone) {
  if (sub >= delivery.freeOver) return 0;
  return (slot?.fee ?? deliveryWindows[1].fee) + (zone?.surcharge ?? 0);
}
