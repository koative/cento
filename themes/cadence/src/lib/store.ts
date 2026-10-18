import { useSyncExternalStore } from "react";
import {
  candidates as seed,
  today,
  type Candidate,
  type Scorecard,
  type Stage,
} from "../content";

export type Note = {
  candidateId: string;
  text: string;
  by: string;
  at: string;
};

type State = {
  candidates: Candidate[];
  notes: Note[];
  moves: { candidateId: string; to: Stage; at: string }[];
};

// ponytail: in-memory demo state, resets on reload by design (nothing leaves the browser).
let state: State = { candidates: seed, notes: [], moves: [] };
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  listeners.forEach((l) => l());
}

export function useDemo() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

const now = () => `${today}T${new Date().toTimeString().slice(0, 5)}`;

export function moveCandidate(id: string, to: Stage) {
  set({
    ...state,
    candidates: state.candidates.map((c) =>
      c.id === id ? { ...c, stage: to, since: today } : c,
    ),
    moves: [...state.moves, { candidateId: id, to, at: now() }],
  });
}

export function addNote(candidateId: string, text: string, by: string) {
  set({
    ...state,
    notes: [...state.notes, { candidateId, text, by, at: now() }],
  });
}

export function addScorecard(candidateId: string, card: Scorecard) {
  set({
    ...state,
    candidates: state.candidates.map((c) =>
      c.id === candidateId
        ? { ...c, scorecards: [...c.scorecards, card], next: undefined }
        : c,
    ),
  });
}
