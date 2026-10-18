import { useSyncExternalStore } from "react";

/* Reader preferences (text size, paper or lamplight) survive reloads; storage failures fall back to memory. */

export type Tone = "paper" | "lamp";
export type ReaderSettings = { size: 0 | 1 | 2; tone: Tone };

const KEY = "monograph-reader";
const listeners = new Set<() => void>();
let settings: ReaderSettings = load();

function load(): ReaderSettings {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null");
    if (
      saved &&
      [0, 1, 2].includes(saved.size) &&
      ["paper", "lamp"].includes(saved.tone)
    )
      return saved;
  } catch {
    /* private mode or malformed value */
  }
  return { size: 1, tone: "paper" };
}

export function setReader(next: Partial<ReaderSettings>) {
  settings = { ...settings, ...next };
  try {
    localStorage.setItem(KEY, JSON.stringify(settings));
  } catch {
    /* keep the in-memory value */
  }
  listeners.forEach((l) => l());
}

export function useReader() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => settings,
  );
}
