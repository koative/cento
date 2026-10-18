import { useSyncExternalStore } from "react";
import { products, type Product } from "../content";

export type CartLine = {
  key: string;
  id: string;
  colour: string;
  size: string;
  qty: number;
};
export type PricedLine = CartLine & { product: Product };

const STORAGE_KEY = "muse-bag";
export const MAX_QTY = 5;
const listeners = new Set<() => void>();

function load(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return saved.filter((l) => products.some((p) => p.id === l.id));
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

export function addLine(id: string, colour: string, size: string, qty = 1) {
  const key = [id, colour, size].join("|");
  const found = lines.find((l) => l.key === key);
  set(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l,
        )
      : [...lines, { key, id, colour, size, qty: Math.min(qty, MAX_QTY) }],
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

export const priced = (cart: CartLine[]): PricedLine[] =>
  cart.flatMap((l) => {
    const product = products.find((p) => p.id === l.id);
    return product ? [{ ...l, product }] : [];
  });

export const count = (cart: CartLine[]) => cart.reduce((s, l) => s + l.qty, 0);
export const subtotal = (cart: CartLine[]) =>
  priced(cart).reduce((s, l) => s + l.qty * l.product.price, 0);
export const money = (n: number) => "€" + n.toLocaleString("en-IE");
