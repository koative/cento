import { useSyncExternalStore } from "react";

/** A tiny localStorage-backed store. Works without storage: the value just lives for this visit. */
export function persisted<T>(key: string, initial: T) {
  const listeners = new Set<() => void>();
  let value = initial;
  try {
    const raw = localStorage.getItem(key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    /* storage blocked or corrupt: start fresh */
  }
  const subscribe = (l: () => void) => (
    listeners.add(l),
    () => void listeners.delete(l)
  );
  return {
    get: () => value,
    set(next: T) {
      value = next;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable: keep it in memory */
      }
      listeners.forEach((l) => l());
    },
    useValue: () => useSyncExternalStore(subscribe, () => value),
  };
}
