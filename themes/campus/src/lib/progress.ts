import { useSyncExternalStore } from "react";

/* Workspace demo state: completed lessons, notes and check answers, kept in localStorage when available. */

export type Note = { text: string; saved: string };
export type Progress = {
  done: string[];
  notes: Record<string, Note>;
  answers: Record<string, number>;
  last: string | null;
};

const KEY = "campus-progress-v1";
const empty: Progress = { done: [], notes: {}, answers: {}, last: null };

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

let state = load();
const listeners = new Set<() => void>();

function update(next: Partial<Progress>) {
  state = { ...state, ...next };
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable (private mode, quota): progress lives for this session only.
  }
  listeners.forEach((l) => l());
}

export function useProgress() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

export const progress = {
  toggleDone(id: string) {
    update({
      done: state.done.includes(id)
        ? state.done.filter((d) => d !== id)
        : [...state.done, id],
    });
  },
  saveNote(id: string, text: string) {
    const notes = { ...state.notes };
    if (text.trim())
      notes[id] = { text: text.trim(), saved: new Date().toISOString() };
    else delete notes[id];
    update({ notes });
  },
  answer(id: string, choice: number) {
    update({ answers: { ...state.answers, [id]: choice } });
  },
  visit(id: string) {
    if (state.last !== id) update({ last: id });
  },
  reset() {
    update(empty);
  },
};
