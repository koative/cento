import { useSyncExternalStore } from "react";

export type Scheme = "light" | "dark";

const KEY = "tilde-scheme";
const listeners = new Set<() => void>();

function stored(): Scheme | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

let scheme: Scheme =
  stored() ??
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
document.documentElement.dataset.scheme = scheme;

export function toggleScheme() {
  scheme = scheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.scheme = scheme;
  try {
    localStorage.setItem(KEY, scheme);
  } catch {
    /* storage unavailable: the choice lasts for this visit */
  }
  listeners.forEach((l) => l());
}

export function useScheme() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => scheme,
  );
}
