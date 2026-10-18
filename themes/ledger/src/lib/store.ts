import { useSyncExternalStore } from "react";
import {
  envelopes,
  settings,
  transactions,
  type Envelope,
  type Transaction,
} from "../content";

/* The /app demo's state. Lives in memory so edits survive moving between screens; a reload resets it. */

export type Prefs = {
  name: string;
  email: string;
  weekStart: "Sunday" | "Monday";
  hideOnOpen: boolean;
  alertAt80: boolean;
  largePurchase: string;
  weeklyDigest: boolean;
};

type State = {
  envelopes: Envelope[];
  transactions: Transaction[];
  hidden: boolean;
  frozen: boolean;
  prefs: Prefs;
  institutions: typeof settings.institutions;
};

let state: State = {
  envelopes,
  transactions,
  hidden: false,
  frozen: false,
  prefs: {
    name: "Jamie Davis",
    email: "jamie@ledger.example",
    weekStart: "Monday",
    hideOnOpen: false,
    alertAt80: true,
    largePurchase: "150",
    weeklyDigest: true,
  },
  institutions: settings.institutions,
};

const listeners = new Set<() => void>();

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function useLedger() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

export const MONTH = "2026-10";

/** Money spent from an envelope this month (positive number). */
export function spent(id: string, txs: Transaction[]) {
  return -txs
    .filter((t) => t.category === id && t.date.startsWith(MONTH))
    .reduce((s, t) => s + t.amount, 0);
}

export function income(txs: Transaction[]) {
  return txs
    .filter((t) => t.category === "income" && t.date.startsWith(MONTH))
    .reduce((s, t) => s + t.amount, 0);
}

const round = (n: number) => Math.round(n * 100) / 100;

export const actions = {
  assign(id: string, amount: number) {
    set({
      envelopes: state.envelopes.map((e) =>
        e.id === id ? { ...e, assigned: round(Math.max(0, amount)) } : e,
      ),
    });
  },
  move(from: string, to: string, amount: number) {
    set({
      envelopes: state.envelopes.map((e) =>
        e.id === from
          ? { ...e, assigned: round(e.assigned - amount) }
          : e.id === to
            ? { ...e, assigned: round(e.assigned + amount) }
            : e,
      ),
    });
  },
  recategorize(id: string, category: string) {
    set({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, category } : t,
      ),
    });
  },
  toggleHidden() {
    set({ hidden: !state.hidden });
  },
  toggleFrozen() {
    set({ frozen: !state.frozen });
  },
  savePrefs(prefs: Prefs) {
    set({ prefs });
  },
  disconnect(id: string) {
    set({ institutions: state.institutions.filter((i) => i.id !== id) });
  },
};
