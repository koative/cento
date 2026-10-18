import { useSyncExternalStore } from "react";
import { grants, identities, type Grant } from "../content";

export type Verdict = "keep" | "revoke";
export type Decision = { verdict: Verdict; reason?: string; at: string };
type State = { decisions: Record<string, Decision>; signedAt: string | null };

/* Demo workspace state, shared by every /app screen. In memory only: a reload starts the campaign over. */
let state: State = { decisions: {}, signedAt: null };
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export const useReview = () => useSyncExternalStore(subscribe, () => state);

export function stamp() {
  return new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function decide(ids: string[], verdict: Verdict, reason?: string) {
  const at = stamp();
  const decisions = { ...state.decisions };
  for (const id of ids) decisions[id] = { verdict, reason, at };
  set({ decisions, signedAt: null });
}

export function undo(id: string) {
  const decisions = { ...state.decisions };
  delete decisions[id];
  set({ decisions, signedAt: null });
}

export const sign = () => set({ ...state, signedAt: stamp() });
export const restart = () => set({ decisions: {}, signedAt: null });

export const identityOf = (g: Grant) =>
  identities.find((i) => i.id === g.identity)!;
export const grantsOf = (id: string) => grants.filter((g) => g.identity === id);

export function lastUsed(days: number) {
  return days === 0 ? "Today" : days === 1 ? "Yesterday" : `${days} days ago`;
}
