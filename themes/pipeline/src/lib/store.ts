import { useSyncExternalStore } from "react";
import {
  contacts as seedContacts,
  deals as seedDeals,
  stages,
  type Activity,
  type Contact,
  type Deal,
  type Forecast,
  type StageId,
} from "../content";

/*
 * Demo workspace state, shared by the board, contacts and reports so a move on one
 * screen shows up on the others. In memory only: a reload restores the demo data.
 */
type State = { deals: Deal[]; contacts: Contact[] };

let state: State = { deals: seedDeals, contacts: seedContacts };
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => (
  listeners.add(l),
  () => listeners.delete(l)
);

export function useWorkspace() {
  return useSyncExternalStore(subscribe, () => state);
}

export function moveDeal(id: string, stage: StageId) {
  set({
    ...state,
    deals: state.deals.map((d) => (d.id === id ? { ...d, stage } : d)),
  });
}

export function setForecast(id: string, forecast: Forecast) {
  set({
    ...state,
    deals: state.deals.map((d) => (d.id === id ? { ...d, forecast } : d)),
  });
}

export function addDeal(deal: Omit<Deal, "id">) {
  set({
    ...state,
    deals: [{ ...deal, id: `d-${Date.now().toString(36)}` }, ...state.deals],
  });
}

export function logActivity(contactId: string, activity: Activity) {
  set({
    ...state,
    contacts: state.contacts.map((c) =>
      c.id === contactId ? { ...c, activity: [activity, ...c.activity] } : c,
    ),
  });
}

export const probability = (stage: StageId) =>
  stages.find((s) => s.id === stage)?.probability ?? 0;
export const isOpen = (d: Deal) => d.stage !== "won" && d.stage !== "lost";
