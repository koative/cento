import { useSyncExternalStore } from "react";
import { episodes, type Episode } from "../content";

/*
 * The network player. There is no audio in the demo: while "playing", the
 * playhead advances on a one-second timer at the chosen speed. The loaded
 * episode, the listening list and per-episode progress persist in localStorage.
 */
type State = {
  id: string | null;
  playing: boolean;
  rate: number;
  queue: string[];
  progress: Record<string, number>;
};

const KEY = "chapter.player.v1";
export const rates = [1, 1.25, 1.5, 2];

export const episodeById = (id: string | null) =>
  episodes.find((e) => e.id === id);

function load(): State {
  const empty: State = {
    id: null,
    playing: false,
    rate: 1,
    queue: [],
    progress: {},
  };
  try {
    const saved = JSON.parse(
      localStorage.getItem(KEY) ?? "null",
    ) as Partial<State> | null;
    if (!saved) return empty;
    return {
      ...empty,
      id: episodeById(saved.id ?? null) ? saved.id! : null,
      rate: rates.includes(saved.rate ?? 1) ? saved.rate! : 1,
      queue: (saved.queue ?? []).filter((id) => episodeById(id)),
      progress: saved.progress ?? {},
    };
  } catch {
    return empty;
  }
}

let state = load();
const listeners = new Set<() => void>();
let timer: number | undefined;

function set(patch: Partial<State>) {
  state = { ...state, ...patch };
  try {
    const { playing: _, ...persisted } = state;
    localStorage.setItem(KEY, JSON.stringify(persisted));
  } catch {
    /* storage unavailable: the player still works for this visit */
  }
  if (state.playing && timer === undefined)
    timer = window.setInterval(tick, 1000);
  if (!state.playing && timer !== undefined) {
    clearInterval(timer);
    timer = undefined;
  }
  listeners.forEach((l) => l());
}

function tick() {
  const ep = episodeById(state.id);
  if (!ep) return set({ playing: false });
  const next = Math.min(ep.duration, positionOf(ep.id) + state.rate);
  if (next < ep.duration)
    return set({ progress: { ...state.progress, [ep.id]: next } });
  const [up, ...rest] = state.queue.filter((id) => id !== ep.id);
  const progress = { ...state.progress, [ep.id]: ep.duration };
  if (up)
    set({
      progress: { ...progress, [up]: 0 },
      id: up,
      queue: rest,
      playing: true,
    });
  else set({ progress, playing: false });
}

export function usePlayer() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => state,
  );
}

export function positionOf(id: string) {
  return state.progress[id] ?? 0;
}

export const isFinished = (ep: Episode, progress: Record<string, number>) =>
  (progress[ep.id] ?? 0) >= ep.duration;

export const chapterAt = (ep: Episode, t: number) =>
  ep.chapters.reduce((found, c, i) => (c.start <= t ? i : found), 0);

export const player = {
  /** Load an episode and play it, from `at` seconds or from where the listener left off. */
  play(id: string, at?: number) {
    const ep = episodeById(id);
    if (!ep) return;
    const saved = positionOf(id);
    const from = at ?? (saved >= ep.duration ? 0 : saved);
    set({ id, playing: true, progress: { ...state.progress, [id]: from } });
  },
  toggle(id: string) {
    if (state.id !== id) return player.play(id);
    if (state.playing) return set({ playing: false });
    player.play(id);
  },
  pause() {
    set({ playing: false });
  },
  seek(id: string, t: number) {
    const ep = episodeById(id);
    if (!ep) return;
    set({
      progress: {
        ...state.progress,
        [id]: Math.max(0, Math.min(ep.duration, Math.round(t))),
      },
    });
  },
  skip(id: string, by: number) {
    player.seek(id, positionOf(id) + by);
  },
  cycleRate() {
    set({ rate: rates[(rates.indexOf(state.rate) + 1) % rates.length] });
  },
  close() {
    set({ id: null, playing: false });
  },
  toggleQueued(id: string) {
    set({
      queue: state.queue.includes(id)
        ? state.queue.filter((q) => q !== id)
        : [...state.queue, id],
    });
  },
  queueAll(ids: string[]) {
    set({
      queue: [...state.queue, ...ids.filter((id) => !state.queue.includes(id))],
    });
  },
  move(id: string, by: -1 | 1) {
    const q = [...state.queue];
    const i = q.indexOf(id);
    const j = i + by;
    if (i < 0 || j < 0 || j >= q.length) return;
    [q[i], q[j]] = [q[j], q[i]];
    set({ queue: q });
  },
  /** Play the first item of the listening list and take it off the list. */
  playQueue() {
    const [first, ...rest] = state.queue;
    if (!first) return;
    set({ queue: rest });
    player.play(first);
  },
  clearQueue() {
    set({ queue: [] });
  },
};
