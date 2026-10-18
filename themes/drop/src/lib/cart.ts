import { persisted } from "./persist";

export type CartLine = {
  key: string;
  id: string;
  name: string;
  color: string;
  size: string;
  unit: number;
  qty: number;
  limit: number;
};

const store = persisted<CartLine[]>("drop-cart", []);
export const useCart = store.useValue;

export function addLine(line: Omit<CartLine, "key">) {
  const lines = store.get();
  const key = [line.id, line.color, line.size].join("|");
  const found = lines.find((l) => l.key === key);
  store.set(
    found
      ? lines.map((l) =>
          l === found ? { ...l, qty: Math.min(l.qty + line.qty, l.limit) } : l,
        )
      : [...lines, { ...line, key, qty: Math.min(line.qty, line.limit) }],
  );
}

export function setQty(key: string, qty: number) {
  const lines = store.get();
  store.set(
    qty < 1
      ? lines.filter((l) => l.key !== key)
      : lines.map((l) =>
          l.key === key ? { ...l, qty: Math.min(qty, l.limit) } : l,
        ),
  );
}

export const clearCart = () => store.set([]);
export const count = (cart: CartLine[]) => cart.reduce((s, l) => s + l.qty, 0);
export const subtotal = (cart: CartLine[]) =>
  cart.reduce((s, l) => s + l.qty * l.unit, 0);
export const money = (n: number) =>
  "$" + (Number.isInteger(n) ? n : n.toFixed(2));
