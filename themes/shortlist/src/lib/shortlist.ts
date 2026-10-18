import { useSyncExternalStore } from "react";

/** The visitor's circled jobs (in their own ranking order) and the ones they applied to, kept in localStorage. */
type State = { ids: string[]; applied: Record<string, string> };

const KEY = "shortlist:v1";
const listeners = new Set<() => void>();

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const s = JSON.parse(raw) as Partial<State>;
      return {
        ids: Array.isArray(s.ids) ? s.ids : [],
        applied: s.applied ?? {},
      };
    }
  } catch {
    /* storage blocked or corrupt: start empty */
  }
  return { ids: [], applied: {} };
}

let state = load();

function set(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* works for this visit without storage */
  }
  listeners.forEach((l) => l());
}

export function useShortlist() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

export const toggle = (id: string) =>
  set({
    ...state,
    ids: state.ids.includes(id)
      ? state.ids.filter((x) => x !== id)
      : [...state.ids, id],
  });

export const remove = (id: string) =>
  set({ ...state, ids: state.ids.filter((x) => x !== id) });

export function move(id: string, by: -1 | 1) {
  const ids = [...state.ids];
  const i = ids.indexOf(id);
  const j = i + by;
  if (i < 0 || j < 0 || j >= ids.length) return;
  [ids[i], ids[j]] = [ids[j], ids[i]];
  set({ ...state, ids });
}

export const markApplied = (id: string) =>
  set({
    ids: state.ids.includes(id) ? state.ids : [...state.ids, id],
    applied: { ...state.applied, [id]: new Date().toISOString() },
  });
