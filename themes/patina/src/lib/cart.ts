import { useSyncExternalStore } from "react";
import { pieceById, type FinishOption, type Piece } from "../content";

/** Stored lines carry ids only; names and prices are always read from content.ts. */
type Stored = { id: string; option: string; qty: number };
export type Line = Stored & {
  key: string;
  piece: Piece;
  finish: FinishOption;
  unit: number;
};

const STORAGE_KEY = "patina-cart";
const listeners = new Set<() => void>();

function hydrate(stored: Stored[]): Line[] {
  return stored.flatMap((s) => {
    const piece = pieceById(s.id);
    const finish = piece?.options.find((o) => o.id === s.option);
    if (!piece || !finish || piece.sold) return [];
    const qty = Math.min(Math.max(1, s.qty), piece.available);
    return [
      {
        ...s,
        qty,
        key: s.id + "|" + s.option,
        piece,
        finish,
        unit: piece.price + finish.delta,
      },
    ];
  });
}

function load(): Line[] {
  try {
    return hydrate(
      JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]") as Stored[],
    );
  } catch {
    return [];
  }
}

let lines = load();

function save(next: Stored[]) {
  lines = hydrate(next);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the cart still works for this visit */
  }
  listeners.forEach((l) => l());
}

const stored = (): Stored[] =>
  lines.map(({ id, option, qty }) => ({ id, option, qty }));

export function useCart() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => lines,
  );
}

/** Adds or tops up a line; quantity is capped at how many are on the floor. */
export function addToCart(id: string, option: string, qty: number) {
  const key = id + "|" + option;
  const current = stored();
  const found = current.find((s) => s.id + "|" + s.option === key);
  save(
    found
      ? current.map((s) => (s === found ? { ...s, qty: s.qty + qty } : s))
      : [...current, { id, option, qty }],
  );
}

export function setQty(key: string, qty: number) {
  save(
    stored().flatMap((s) =>
      s.id + "|" + s.option !== key ? [s] : qty < 1 ? [] : [{ ...s, qty }],
    ),
  );
}

export function clearCart() {
  save([]);
}

export const count = (cart: Line[]) => cart.reduce((s, l) => s + l.qty, 0);
export const subtotal = (cart: Line[]) =>
  cart.reduce((s, l) => s + l.qty * l.unit, 0);
export const money = (n: number) => "$" + n.toLocaleString("en-US");
