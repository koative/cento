import { useSyncExternalStore } from "react";
import { checkout } from "../content";

export type LineKind = "wine" | "ticket" | "club";

export type CartLine = {
  key: string;
  kind: LineKind;
  /** Wine, event or club tier id. */
  id: string;
  name: string;
  /** Size, date or billing rhythm shown under the name. */
  detail: string;
  unit: number;
  qty: number;
};

const STORAGE_KEY = "pour-cart";
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

export function addLine(line: Omit<CartLine, "key">, max = 24) {
  const key = [line.kind, line.id, line.detail].join("|");
  const found = lines.find((l) => l.key === key);
  // A club membership is one per cart: picking another tier replaces it.
  const rest =
    line.kind === "club" ? lines.filter((l) => l.kind !== "club") : lines;
  set(
    found && line.kind !== "club"
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + line.qty, max) } : l,
        )
      : [...rest, { ...line, key }],
  );
}

export function setQty(key: string, qty: number) {
  set(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, 24) } : l,
        ),
  );
}

export function clearCart() {
  set([]);
}

export const count = (cart: CartLine[]) => cart.reduce((s, l) => s + l.qty, 0);
export const bottles = (cart: CartLine[]) =>
  cart.reduce((s, l) => s + (l.kind === "wine" ? l.qty : 0), 0);
export const subtotal = (cart: CartLine[]) =>
  cart.reduce((s, l) => s + l.qty * l.unit, 0);

/** Mix any six bottles and the wine in the cart is 10% off, rounded to the dollar. */
export function caseDiscount(cart: CartLine[]) {
  if (bottles(cart) < checkout.caseSize) return 0;
  const wine = cart.reduce(
    (s, l) => s + (l.kind === "wine" ? l.qty * l.unit : 0),
    0,
  );
  return Math.round(wine * checkout.caseDiscount);
}

export const money = (n: number) => "$" + n.toLocaleString("en-US");
