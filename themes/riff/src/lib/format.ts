const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/** "2026-10-24" as a local date (never shifted by time zone). */
export const toDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const dayName = (iso: string) =>
  toDate(iso).toLocaleDateString("en-US", { weekday: "short" });
export const monthDay = (iso: string) =>
  toDate(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
export const longDate = (iso: string) =>
  toDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

/** "21:15" → "9:15 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/** 252 → "4:12" */
export const mmss = (s: number) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export const totalLength = (tracks: { length: number }[]) => {
  const min = Math.round(tracks.reduce((n, t) => n + t.length, 0) / 60);
  return `${min} min`;
};

/** Deterministic pseudo-random numbers so waveforms and preview riffs stay the same every visit. */
export function seeded(text: string) {
  let h = 2166136261;
  for (const c of text) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

/** Bar heights 0.15–1 that rise and fall like a song's loud-quiet shape. */
export function waveform(seed: string, bars = 72) {
  const rnd = seeded(seed);
  const swell = 1 + Math.floor(rnd() * 3);
  return Array.from({ length: bars }, (_, i) => {
    const shape =
      0.45 + 0.4 * Math.sin((i / bars) * Math.PI * swell + rnd() * 0.4) ** 2;
    return Math.min(1, Math.max(0.15, shape * (0.7 + rnd() * 0.5)));
  });
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Returns {} when valid; otherwise focuses the first bad field.
 */
export function validate(
  form: HTMLFormElement,
  messages: Record<string, string>,
  extra: Errors = {},
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
  Object.assign(errors, extra);
  const first = Object.keys(errors)[0];
  if (first)
    (form.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
