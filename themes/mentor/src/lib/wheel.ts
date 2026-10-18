import { useSyncExternalStore } from "react";
import {
  episodes,
  programmes,
  resources,
  skills,
  type SkillId,
} from "../content";

export type Scores = Record<SkillId, number>;
type State = { scores: Scores; touched: boolean };

const KEY = "mentor-wheel";
const blank = Object.fromEntries(skills.map((s) => [s.id, 5])) as Scores;

function load(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw)
      return {
        scores: { ...blank, ...(JSON.parse(raw) as Partial<Scores>) },
        touched: true,
      };
  } catch {
    /* storage blocked or corrupt: start blank */
  }
  return { scores: blank, touched: false };
}

let state = load();
const listeners = new Set<() => void>();

function set(next: State) {
  state = next;
  try {
    if (next.touched) localStorage.setItem(KEY, JSON.stringify(next.scores));
    else localStorage.removeItem(KEY);
  } catch {
    /* works for this visit without storage */
  }
  listeners.forEach((l) => l());
}

export const setScore = (id: SkillId, value: number) =>
  set({
    scores: { ...state.scores, [id]: Math.min(10, Math.max(1, value)) },
    touched: true,
  });

export const resetWheel = () => set({ scores: blank, touched: false });

export function useWheel() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

/** Skills from weakest to strongest; ties keep the wheel's order. */
export const ranked = (scores: Scores) =>
  [...skills].sort((a, b) => scores[a.id] - scores[b.id]);

export const average = (scores: Scores) =>
  Object.values(scores).reduce((sum, n) => sum + n, 0) / skills.length;

/** The programme, resources and episode that fit the lowest spokes best. */
export function recommend(scores: Scores) {
  const low = ranked(scores)
    .slice(0, 3)
    .map((s) => s.id);
  const weight = (ids: SkillId[]) =>
    ids.reduce(
      (sum, id) => sum + (low.includes(id) ? 3 - low.indexOf(id) : 0),
      0,
    );
  const programme = [...programmes].sort(
    (a, b) => weight(b.skills) - weight(a.skills),
  )[0];
  return {
    low: low.slice(0, 2),
    programme,
    resources: low
      .slice(0, 2)
      .map((id) => resources.find((r) => r.skill === id)!),
    episode: episodes.find((e) => e.skill === low[0])!,
  };
}

/** "Delegation 3, Feedback 4, …" for an application summary. */
export const describeScores = (scores: Scores) =>
  skills.map((s) => `${s.label} ${scores[s.id]}`).join(", ");
