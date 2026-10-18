import { useSyncExternalStore } from "react";

/** A tiny persisted store: survives reloads when localStorage is available, works in memory when it is not. */
export function createStore<T>(
  key: string,
  fallback: T,
  clean: (raw: unknown) => T,
) {
  let state = fallback;
  try {
    const raw = localStorage.getItem(key);
    if (raw) state = clean(JSON.parse(raw));
  } catch {
    state = fallback;
  }
  const listeners = new Set<() => void>();
  const subscribe = (fn: () => void) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
  };

  return {
    get: () => state,
    set(next: T) {
      state = next;
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* storage full or blocked: keep the in-memory copy */
      }
      listeners.forEach((fn) => fn());
    },
    useValue: () => useSyncExternalStore(subscribe, () => state),
  };
}
