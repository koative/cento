import { persisted } from "./persist";

export type Entry = {
  ticket: string;
  drop: string;
  product: string;
  size: string;
  name: string;
  email: string;
  created: number;
};

const store = persisted<Entry[]>("drop-raffle", []);
export const useEntries = store.useValue;

export function addEntry(entry: Omit<Entry, "ticket" | "created">): Entry {
  const ticket = String(Math.floor(100000 + Math.random() * 899999));
  const full = { ...entry, ticket, created: Date.now() };
  store.set([full, ...store.get().filter((e) => e.drop !== entry.drop)]);
  return full;
}

export const withdraw = (ticket: string) =>
  store.set(store.get().filter((e) => e.ticket !== ticket));
