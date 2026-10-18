import { useSyncExternalStore } from "react";

/* Volunteer sign-ups kept in this browser only: event id → number of places taken. */
type Signups = Record<string, number>;

const KEY = "tide.signups";
const listeners = new Set<() => void>();

function load(): Signups {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Signups;
  } catch {
    return {};
  }
}

let state = load();

export function signUp(id: string, places: number) {
  state = { ...state, [id]: places };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private mode): keep the sign-up for this visit only.
  }
  listeners.forEach((l) => l());
}

export function useSignups() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}
