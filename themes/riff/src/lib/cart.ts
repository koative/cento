import { useSyncExternalStore } from "react";

export type CartLine = {
  /** same item + same option = same key, so repeats stack */
  key: string;
  kind: "merch" | "ticket";
  /** product id or show id, for links back */
  ref: string;
  name: string;
  detail: string;
  unit: number;
  qty: number;
};

const KEY = "riff.cart.v1";
export const MAX_QTY = 8;
const listeners = new Set<() => void>();

let lines: CartLine[] = (() => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
  } catch {
    return [];
  }
})();

function commit(next: CartLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or full storage: the cart still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useCart() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => lines,
  );
}

export function addLine(line: Omit<CartLine, "qty">, qty: number) {
  const found = lines.find((l) => l.key === line.key);
  commit(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l,
        )
      : [...lines, { ...line, qty }],
  );
}

export function setQty(key: string, qty: number) {
  commit(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) => (l.key === key ? { ...l, qty } : l)),
  );
}

export const clearCart = () => commit([]);
export const countOf = (ls: CartLine[]) => ls.reduce((n, l) => n + l.qty, 0);
export const subtotalOf = (ls: CartLine[]) =>
  ls.reduce((n, l) => n + l.qty * l.unit, 0);
