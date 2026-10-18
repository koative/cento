import { useSyncExternalStore } from "react";
import { products, type Product, type Variant } from "../content";

/** One basket line. `swap`: may the picker substitute the closest match if it is out of stock. */
export type Line = {
  key: string;
  id: string;
  variant: number;
  qty: number;
  swap: boolean;
};
export type Basket = { lines: Line[]; slot: string | null };

const STORAGE_KEY = "saffron-basket";
export const MAX_QTY = 24;
const listeners = new Set<() => void>();

function load(): Basket {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const saved = raw ? (JSON.parse(raw) as Basket) : null;
    if (saved && Array.isArray(saved.lines)) {
      // Drop lines for products that no longer exist in content.ts.
      return {
        lines: saved.lines.filter((l) => products.some((p) => p.id === l.id)),
        slot: saved.slot ?? null,
      };
    }
  } catch {
    /* unreadable storage: start empty */
  }
  return { lines: [], slot: null };
}

let basket = load();

function set(next: Basket) {
  basket = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the basket still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useBasket() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => basket,
  );
}

export function addItem(id: string, variant: number, qty = 1, swap = true) {
  const key = `${id}|${variant}`;
  const found = basket.lines.find((l) => l.key === key);
  const lines = found
    ? basket.lines.map((l) =>
        l === found ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY), swap } : l,
      )
    : [
        ...basket.lines,
        { key, id, variant, qty: Math.min(qty, MAX_QTY), swap },
      ];
  set({ ...basket, lines });
}

export function setQty(key: string, qty: number) {
  const lines =
    qty < 1
      ? basket.lines.filter((l) => l.key !== key)
      : basket.lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, MAX_QTY) } : l,
        );
  set({ ...basket, lines });
}

export function setSwap(key: string, swap: boolean) {
  set({
    ...basket,
    lines: basket.lines.map((l) => (l.key === key ? { ...l, swap } : l)),
  });
}

export function setSlot(slot: string | null) {
  set({ ...basket, slot });
}

export function clearBasket() {
  set({ lines: [], slot: null });
}

export type PricedLine = Line & {
  product: Product;
  option: Variant;
  total: number;
};

export function priced(lines: Line[]): PricedLine[] {
  return lines.flatMap((l) => {
    const product = products.find((p) => p.id === l.id);
    const option = product?.variants[l.variant];
    return product && option
      ? [{ ...l, product, option, total: option.price * l.qty }]
      : [];
  });
}

export const count = (lines: Line[]) => lines.reduce((s, l) => s + l.qty, 0);
export const subtotal = (lines: PricedLine[]) =>
  lines.reduce((s, l) => s + l.total, 0);
export const money = (n: number) => "$" + n.toFixed(2);
