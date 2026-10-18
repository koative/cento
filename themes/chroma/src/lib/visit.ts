import { useSyncExternalStore } from "react";

/** What the client is putting together across pages: services, a stylist, products to set aside. */
export type Visit = { services: string[]; stylist: string; products: string[] };

const KEY = "chroma.visit.v1";
const empty: Visit = { services: [], stylist: "any", products: [] };
const listeners = new Set<() => void>();

let visit: Visit = (() => {
  try {
    const saved = JSON.parse(
      localStorage.getItem(KEY) ?? "null",
    ) as Partial<Visit> | null;
    return saved &&
      Array.isArray(saved.services) &&
      Array.isArray(saved.products)
      ? { ...empty, ...saved }
      : empty;
  } catch {
    return empty;
  }
})();

function commit(next: Visit) {
  visit = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or full storage: the plan still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useVisit() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => visit,
  );
}

const toggle = (list: string[], id: string) =>
  list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

export const toggleService = (id: string) =>
  commit({ ...visit, services: toggle(visit.services, id) });
export const toggleProduct = (id: string) =>
  commit({ ...visit, products: toggle(visit.products, id) });
export const setStylist = (stylist: string) => commit({ ...visit, stylist });
/** "Book this look" / "Book with …": replace the plan in one go. */
export const startVisit = (services: string[], stylist = visit.stylist) =>
  commit({ ...visit, services, stylist });
export const clearVisit = () => commit(empty);
