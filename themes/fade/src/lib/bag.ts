import { useSyncExternalStore } from "react";
import type { Product } from "../content";

export type BagLine = {
  /** product|variant, so the same item in the same size stacks up. */
  key: string;
  id: string;
  name: string;
  variant: string;
  unit: number;
  qty: number;
};

const KEY = "fade.bag.v1";
const listeners = new Set<() => void>();

let lines: BagLine[] = (() => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as BagLine[]) : [];
  } catch {
    return [];
  }
})();

function commit(next: BagLine[]) {
  lines = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or full storage: the bag still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useBag() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => lines,
  );
}

export function addToBag(product: Product, variantId: string, qty: number) {
  const v =
    product.variants.find((x) => x.id === variantId) ?? product.variants[0];
  const key = `${product.id}|${v.id}`;
  const found = lines.find((l) => l.key === key);
  commit(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(20, l.qty + qty) } : l,
        )
      : [
          ...lines,
          {
            key,
            id: product.id,
            name: product.name,
            variant: v.label,
            unit: v.price,
            qty,
          },
        ],
  );
}

export function setQty(key: string, qty: number) {
  commit(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(20, qty) } : l,
        ),
  );
}

export const clearBag = () => commit([]);
export const countOf = (ls: BagLine[]) => ls.reduce((n, l) => n + l.qty, 0);
export const subtotalOf = (ls: BagLine[]) =>
  ls.reduce((n, l) => n + l.qty * l.unit, 0);
