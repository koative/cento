import { addOns, maxTickets, tickets } from "../content";
import { createStore } from "./store";

export type Order = {
  qty: Record<string, number>;
  addOns: string[];
  instalments: boolean;
};

const empty: Order = { qty: {}, addOns: [], instalments: false };

export const order = createStore<Order>("pulse-order", empty, (raw) => {
  if (!raw || typeof raw !== "object") return empty;
  const o = raw as Partial<Order>;
  const qty: Record<string, number> = {};
  for (const t of tickets) {
    const n = Number(o.qty?.[t.id]);
    if (Number.isInteger(n) && n > 0) qty[t.id] = Math.min(n, maxTickets);
  }
  return {
    qty,
    addOns: Array.isArray(o.addOns)
      ? o.addOns.filter((id) => addOns.some((a) => a.id === id))
      : [],
    instalments: o.instalments === true,
  };
});

export const useOrder = order.useValue;

const eur = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export const money = (n: number) => eur.format(n);

export const ticketCount = (o: Order) =>
  Object.values(o.qty).reduce((s, n) => s + n, 0);

export function lines(o: Order) {
  return tickets
    .filter((t) => o.qty[t.id])
    .map((t) => ({
      ticket: t,
      qty: o.qty[t.id],
      total: t.price * o.qty[t.id],
    }));
}

export const chosenAddOns = (o: Order) =>
  addOns.filter((a) => o.addOns.includes(a.id));

export const total = (o: Order) =>
  lines(o).reduce((s, l) => s + l.total, 0) +
  (ticketCount(o) ? chosenAddOns(o).reduce((s, a) => s + a.price, 0) : 0);

/** Change one tier's quantity, keeping the whole order within the per-order limit. */
export function setQty(id: string, next: number) {
  const o = order.get();
  const others = ticketCount(o) - (o.qty[id] ?? 0);
  const n = Math.max(0, Math.min(next, maxTickets - others));
  const qty = { ...o.qty, [id]: n };
  if (!n) delete qty[id];
  order.set({ ...o, qty });
}

export function toggleAddOn(id: string) {
  const o = order.get();
  order.set({
    ...o,
    addOns: o.addOns.includes(id)
      ? o.addOns.filter((a) => a !== id)
      : [...o.addOns, id],
  });
}

export const setInstalments = (instalments: boolean) =>
  order.set({ ...order.get(), instalments });

export const clearOrder = () => order.set(empty);
