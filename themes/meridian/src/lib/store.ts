import { useSyncExternalStore } from "react";
import type { AreaSlug, HomeType, Mode } from "../content";

/** Tiny external store: one value, many subscribers. */
function createStore<T>(initial: T, onSet?: (v: T) => void) {
  let value = initial;
  const subs = new Set<() => void>();
  return {
    get: () => value,
    set(next: T) {
      value = next;
      onSet?.(next);
      subs.forEach((f) => f());
    },
    subscribe(f: () => void) {
      subs.add(f);
      return () => subs.delete(f);
    },
  };
}

/* ---------- Saved homes, persisted when storage is available ---------- */

const KEY = "meridian-saved";

function load(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

const saved = createStore<string[]>(load(), (ids) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* storage unavailable: keep the list for this visit only */
  }
});

export function useSaved() {
  return useSyncExternalStore(saved.subscribe, saved.get);
}

export function toggleSaved(id: string) {
  const ids = saved.get();
  saved.set(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
}

/* ---------- Search filters, kept for the visit so "back to results" returns to the same search ---------- */

export type Sort = "newest" | "price-asc" | "price-desc" | "size";

export type Filters = {
  mode: Mode;
  area: AreaSlug | "all";
  beds: number;
  maxPrice: number;
  type: HomeType | "all";
  sort: Sort;
  query: string;
};

export const defaultFilters: Filters = {
  mode: "buy",
  area: "all",
  beds: 0,
  maxPrice: 0,
  type: "all",
  sort: "newest",
  query: "",
};

const filters = createStore<Filters>(defaultFilters);

export function useFilters() {
  return useSyncExternalStore(filters.subscribe, filters.get);
}

export function setFilters(patch: Partial<Filters>) {
  filters.set({ ...filters.get(), ...patch });
}
