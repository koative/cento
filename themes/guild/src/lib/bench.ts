import { useSyncExternalStore } from "react";
import { talent } from "../content";

/** The client's shortlist of member ids, persisted in localStorage when available. */
const KEY = "guild-bench";
export const BENCH_MAX = 6;

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw)
      ? raw.filter((id) => talent.some((t) => t.id === id)).slice(0, BENCH_MAX)
      : [];
  } catch {
    return [];
  }
}

let bench = load();
const listeners = new Set<() => void>();

function set(next: string[]) {
  bench = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable: the bench lives for this visit only */
  }
  listeners.forEach((l) => l());
}

export function useBench() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => bench,
  );
}

/** Adds or removes a member; returns false when the bench is already full. */
export function toggleBench(id: string) {
  if (bench.includes(id)) set(bench.filter((b) => b !== id));
  else if (bench.length >= BENCH_MAX) return false;
  else set([...bench, id]);
  return true;
}

export const clearBench = () => set([]);
