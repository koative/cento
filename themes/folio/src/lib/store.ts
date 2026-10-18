import { useSyncExternalStore } from "react";
import { shipping, shop, type ShopItem } from "../content";

/** A tiny localStorage-backed store; falls back to memory when storage is unavailable. */
function persisted<T>(key: string, initial: T) {
  let value = initial;
  try {
    const raw = localStorage.getItem(key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    /* storage blocked or corrupt: start empty */
  }
  const listeners = new Set<() => void>();
  return {
    get: () => value,
    set(next: T) {
      value = next;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable: state still lives for this visit */
      }
      listeners.forEach((l) => l());
    },
    use: () =>
      useSyncExternalStore(
        (l) => (listeners.add(l), () => listeners.delete(l)),
        () => value,
      ),
  };
}

/* Shortlist of artworks (ids) for the viewing room and enquiries. */
export const shortlist = persisted<string[]>("folio-shortlist", []);

export function toggleShortlist(id: string) {
  const list = shortlist.get();
  shortlist.set(
    list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
  );
}

/* Shop bag. */
export type BagLine = {
  key: string;
  id: string;
  option: string;
  unit: number;
  qty: number;
};

export const bag = persisted<BagLine[]>("folio-bag", []);

export function addToBag(item: ShopItem, option: string, qty: number) {
  const add = item.options.find((o) => o.label === option)?.add ?? 0;
  const key = item.id + "|" + option;
  const lines = bag.get();
  const found = lines.find((l) => l.key === key);
  bag.set(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + qty, 10) } : l,
        )
      : [...lines, { key, id: item.id, option, unit: item.price + add, qty }],
  );
}

export function setQty(key: string, qty: number) {
  const lines = bag.get();
  bag.set(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, 10) } : l,
        ),
  );
}

export const bagCount = (lines: BagLine[]) =>
  lines.reduce((s, l) => s + l.qty, 0);

export function totals(lines: BagLine[], pickup: boolean) {
  const subtotal = lines.reduce((s, l) => s + l.qty * l.unit, 0);
  const delivery =
    pickup || subtotal === 0 || subtotal >= shipping.freeOver
      ? 0
      : shipping.flat;
  return { subtotal, delivery, total: subtotal + delivery };
}

export const itemFor = (line: BagLine) => shop.find((s) => s.id === line.id);
