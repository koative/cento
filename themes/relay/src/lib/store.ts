import { useSyncExternalStore } from "react";
import { shipments as seed, type Shipment } from "../content";

/* App demo state: lives in memory for the session, shared by every /app screen. */

export type Note = { at: string; author: string; text: string };
type State = {
  shipments: Shipment[];
  notes: Record<string, Note[]>;
  resolved: Record<string, string>;
};

let state: State = { shipments: seed, notes: {}, resolved: {} };
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

export function useApp() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => state,
  );
}

export function addNote(id: string, note: Note) {
  set({
    ...state,
    notes: { ...state.notes, [id]: [...(state.notes[id] ?? []), note] },
  });
}

/** Marks an exception as handled: the shipment goes back to In transit with the action recorded. */
export function resolveException(id: string, action: string) {
  set({
    ...state,
    resolved: { ...state.resolved, [id]: action },
    shipments: state.shipments.map((s) =>
      s.id === id ? { ...s, status: "In transit", exception: undefined } : s,
    ),
  });
}
