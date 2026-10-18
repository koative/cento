import { useSyncExternalStore } from "react";

/* Problems you've sent, kept in localStorage so the tick list survives a reload (and works without storage). */
const KEY = "summit-ticks";
const listeners = new Set<() => void>();

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw)
      ? raw.filter((x): x is string => typeof x === "string")
      : [];
  } catch {
    return [];
  }
}

let ticks = load();

export function toggleTick(id: string) {
  ticks = ticks.includes(id) ? ticks.filter((t) => t !== id) : [...ticks, id];
  try {
    localStorage.setItem(KEY, JSON.stringify(ticks));
  } catch {
    /* private mode: keep the list in memory for this visit */
  }
  listeners.forEach((l) => l());
}

export function useTicks() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => ticks,
  );
}
