import { useSyncExternalStore } from "react";

export type CartLine = {
  key: string;
  id: string;
  kind: "product" | "custom" | "subscription";
  name: string;
  detail: string;
  unit: number;
  qty: number;
  image?: string;
  to: string;
};

const STORAGE_KEY = "bloom-bag";
const MAX_QTY = 12;
const listeners = new Set<() => void>();

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartLine[]) : [];
  } catch {
    return [];
  }
}

let lines = load();

function set(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the bag still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useCart() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => lines,
  );
}

export function addLine(line: Omit<CartLine, "key">) {
  const key = [line.id, line.detail].join("|");
  const found = lines.find((l) => l.key === key);
  set(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + line.qty, MAX_QTY) } : l,
        )
      : [...lines, { ...line, key }],
  );
}

export function setQty(key: string, qty: number) {
  set(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, MAX_QTY) } : l,
        ),
  );
}

export function clearCart() {
  set([]);
}

export const count = (cart: CartLine[]) => cart.reduce((s, l) => s + l.qty, 0);
export const subtotal = (cart: CartLine[]) =>
  cart.reduce((s, l) => s + l.qty * l.unit, 0);
export const money = (n: number) =>
  "$" + (Number.isInteger(n) ? String(n) : n.toFixed(2));
export { MAX_QTY };
