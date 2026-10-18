import { useSyncExternalStore } from "react";

export type CartLine = {
  /** Same product + size + printed name = same key, so identical items stack. */
  key: string;
  id: string;
  name: string;
  size: string;
  nameplate?: string;
  unit: number;
  qty: number;
};

const KEY = "clutch.bag.v1";
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
    /* private mode or full storage: the bag still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useCart() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => lines,
  );
}

export function addLine(line: Omit<CartLine, "key" | "qty">, qty: number) {
  const key = [line.id, line.size, line.nameplate ?? ""].join("|");
  const found = lines.find((l) => l.key === key);
  commit(
    found
      ? lines.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l))
      : [...lines, { ...line, key, qty }],
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
