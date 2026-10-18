import { useSyncExternalStore } from "react";
import {
  framings,
  prints,
  shipping,
  type FramingId,
  type SizeId,
} from "../content";

/** A tiny localStorage-backed store; keeps working for the visit when storage is unavailable. */
function persisted<T>(key: string, initial: T) {
  const listeners = new Set<() => void>();
  let value = initial;
  try {
    const raw = localStorage.getItem(key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    /* storage unavailable or corrupt: start empty */
  }
  const subscribe = (l: () => void) => (
    listeners.add(l),
    () => void listeners.delete(l)
  );
  return {
    get: () => value,
    set(next: T) {
      value = next;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable: state still lives for this visit */
      }
      listeners.forEach((l) => l());
    },
    use: () => useSyncExternalStore(subscribe, () => value),
  };
}

/* ---------- Grease-pencil marks on the contact sheets ---------- */

export const marks = persisted<string[]>("frame-marks", []);

export function toggleMark(id: string) {
  const now = marks.get();
  marks.set(now.includes(id) ? now.filter((m) => m !== id) : [...now, id]);
}

/* ---------- Print order ---------- */

export type OrderLine = {
  key: string;
  printId: string;
  size: SizeId;
  framing: FramingId;
  qty: number;
};

export const order = persisted<OrderLine[]>("frame-order", []);

export const remaining = (printId: string) => {
  const p = prints.find((x) => x.id === printId);
  return p ? p.edition - p.sold : 0;
};

/** Units of one print across every size and framing already in the order (they share one edition). */
const inOrder = (printId: string, lines = order.get()) =>
  lines.filter((l) => l.printId === printId).reduce((s, l) => s + l.qty, 0);

export function addLine(line: Omit<OrderLine, "key">) {
  const lines = order.get();
  const room = remaining(line.printId) - inOrder(line.printId, lines);
  const qty = Math.min(line.qty, room);
  if (qty < 1) return 0;
  const key = [line.printId, line.size, line.framing].join("|");
  const found = lines.find((l) => l.key === key);
  order.set(
    found
      ? lines.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l))
      : [...lines, { ...line, qty, key }],
  );
  return qty;
}

export function setQty(key: string, qty: number) {
  const lines = order.get();
  const line = lines.find((l) => l.key === key);
  if (!line) return;
  const max = remaining(line.printId) - inOrder(line.printId, lines) + line.qty;
  order.set(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, max) } : l,
        ),
  );
}

export const unitPrice = (printId: string, size: SizeId, framing: FramingId) =>
  (prints.find((p) => p.id === printId)?.prices[size] ?? 0) +
  (framings.find((f) => f.id === framing)?.add[size] ?? 0);

export const count = (lines: OrderLine[]) =>
  lines.reduce((s, l) => s + l.qty, 0);

export function totals(lines: OrderLine[]) {
  const subtotal = lines.reduce(
    (s, l) => s + l.qty * unitPrice(l.printId, l.size, l.framing),
    0,
  );
  const ship = !lines.length
    ? 0
    : lines.some((l) => l.framing !== "none")
      ? shipping.framed
      : shipping.rolled;
  return { subtotal, ship, total: subtotal + ship };
}

export const money = (n: number) => "$" + n.toLocaleString("en-US");
