import { useSyncExternalStore } from "react";
import { materials, type Material } from "../content";

/* The sample board: an ordered list of material ids, persisted in localStorage when available.
   Order is meaning — first is the field, second the secondary, the rest accents (the 60/30/10 rule). */

export const BOARD_MAX = 8;
const KEY = "mosaic-board";

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw)
      ? raw
          .filter((id) => materials.some((m) => m.id === id))
          .slice(0, BOARD_MAX)
      : [];
  } catch {
    return [];
  }
}

let board = load();
const listeners = new Set<() => void>();

function set(next: string[]) {
  board = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(board));
  } catch {
    /* storage unavailable: the board still works for this visit */
  }
  listeners.forEach((l) => l());
}

export function useBoard() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => board,
  );
}

export const boardMaterials = (ids: string[]) =>
  ids
    .map((id) => materials.find((m) => m.id === id))
    .filter((m): m is Material => !!m);

export function toggle(id: string) {
  if (board.includes(id)) set(board.filter((x) => x !== id));
  else if (board.length < BOARD_MAX) set([...board, id]);
}

export function move(id: string, by: -1 | 1) {
  const i = board.indexOf(id);
  const j = i + by;
  if (i < 0 || j < 0 || j >= board.length) return;
  const next = [...board];
  [next[i], next[j]] = [next[j], next[i]];
  set(next);
}

/** Replace the whole board, e.g. with a project's palette; an empty list clears it. */
export function replace(ids: string[]) {
  set(ids.slice(0, BOARD_MAX));
}

export function role(index: number) {
  return index === 0 ? "Field" : index === 1 ? "Secondary" : "Accent";
}
