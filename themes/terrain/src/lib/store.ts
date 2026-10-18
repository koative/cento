import { useEffect, useState } from "react";

/** useState mirrored to localStorage; silently falls back to memory when storage is unavailable. */
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* private mode or quota: keep the in-memory value */
    }
  }, [key, value]);
  return [value, setValue] as const;
}
