import { useSyncExternalStore } from "react";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  colour: string;
  shell: string;
  unit: number;
  qty: number;
};

const STORAGE_KEY = "hush-cart";
const MAX = 10;
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
    /* storage unavailable: the cart still works for this visit */
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
  const key = line.id + "|" + line.colour;
  const found = lines.find((l) => l.key === key);
  set(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + line.qty, MAX) } : l,
        )
      : [...lines, { ...line, key }],
  );
}

export function setQty(key: string, qty: number) {
  set(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, MAX) } : l,
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
  "$" + (Number.isInteger(n) ? n.toString() : n.toFixed(2));
