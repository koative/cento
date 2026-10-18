import { useSyncExternalStore } from "react";
import type { Product, Variant } from "../content";
import { load, save } from "./util";

export type CartLine = {
  key: string;
  productId: string;
  name: string;
  variant: string;
  unit: number;
  qty: number;
};

const KEY = "kettle.cart.v1";
const listeners = new Set<() => void>();

let lines: CartLine[] = (() => {
  const parsed = load<unknown>(KEY, []);
  return Array.isArray(parsed) ? (parsed as CartLine[]) : [];
})();

function commit(next: CartLine[]) {
  lines = next;
  save(KEY, next);
  listeners.forEach((l) => l());
}

export function useCart() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => lines,
  );
}

export function addToCart(product: Product, variant: Variant, qty: number) {
  const key = `${product.id}|${variant.id}`;
  const found = lines.find((l) => l.key === key);
  commit(
    found
      ? lines.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l))
      : [
          ...lines,
          {
            key,
            productId: product.id,
            name: product.name,
            variant: variant.label,
            unit: variant.price,
            qty,
          },
        ],
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
