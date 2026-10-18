import { useSyncExternalStore } from "react";

export const money = (n: number) =>
  "$" + (Number.isInteger(n) ? n.toString() : n.toFixed(2));

/** 1694 → "28:14"; 3725 → "1:02:05". */
export function clock(seconds: number) {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${ss}` : `${m}:${ss}`;
}

/** 241000 → "241K views". */
export function views(n: number) {
  const short =
    n >= 1e6
      ? (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
      : n >= 1e3
        ? Math.round(n / 1e3) + "K"
        : String(n);
  return short + " views";
}

export function date(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/*
 * Watch progress per video (seconds), kept in localStorage so every thumbnail
 * on the site can show how far you got.
 */
const KEY = "channel-progress";
const listeners = new Set<() => void>();

function loadProgress(): Record<string, number> {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as Record<
      string,
      number
    >;
  } catch {
    return {};
  }
}

let progress = loadProgress();

export function saveProgress(slug: string, seconds: number) {
  progress = { ...progress, [slug]: Math.round(seconds) };
  try {
    localStorage.setItem(KEY, JSON.stringify(progress));
  } catch {
    /* storage unavailable: progress lasts for this visit only */
  }
  listeners.forEach((l) => l());
}

export function useProgress() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => progress,
  );
}
