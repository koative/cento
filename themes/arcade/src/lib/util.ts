import { useSyncExternalStore } from "react";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
export const money = (n: number) => usd.format(n);

const longDate = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
export const formatDate = (iso: string) =>
  longDate.format(new Date(iso + "T00:00:00Z"));

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Returns an empty object when the form is valid and focuses the first bad field otherwise.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
): Errors {
  const errors: Errors = {};
  for (const el of Array.from(form.elements)) {
    if (!(
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ))
      continue;
    if (el.name && !el.disabled && !el.checkValidity() && !errors[el.name])
      errors[el.name] = messages[el.name] ?? el.validationMessage;
  }
  const first = Object.keys(errors)[0];
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------ demo runs */

export type Run = { score: number; berries: number; at: string };

const KEY = "arcade.blobhop.runs";
let runs: Run[] = load();
const listeners = new Set<() => void>();

function load(): Run[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Keeps the ten best Blob Hop runs on this device. */
export function addRun(run: Run) {
  runs = [...runs, run].sort((a, b) => b.score - a.score).slice(0, 10);
  try {
    localStorage.setItem(KEY, JSON.stringify(runs));
  } catch {
    // Storage blocked: the runs still live for this visit.
  }
  listeners.forEach((l) => l());
}

export function useRuns() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => runs,
  );
}
