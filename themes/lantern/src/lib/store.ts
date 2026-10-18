import { useSyncExternalStore } from "react";

/** A tiny localStorage-backed store. Storage failures (private mode, quota) fall back to memory. */
export function persisted<T>(key: string, initial: T) {
  let value = initial;
  try {
    const raw = localStorage.getItem(key);
    if (raw) value = JSON.parse(raw) as T;
  } catch {
    /* storage unavailable: keep the in-memory default */
  }
  const listeners = new Set<() => void>();

  return {
    get: () => value,
    set(next: T) {
      value = next;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage unavailable: the value still lives for this visit */
      }
      listeners.forEach((l) => l());
    },
    use(): T {
      return useSyncExternalStore(
        (l) => {
          listeners.add(l);
          return () => listeners.delete(l);
        },
        () => value,
      );
    },
  };
}
