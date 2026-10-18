const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

/** Query string after the hash route, e.g. #/talent?q=rails → q=rails. */
export const hashParams = () =>
  new URLSearchParams(window.location.hash.split("?")[1] ?? "");

/** "UTC+1", "UTC−4", "UTC±0". */
export const utcLabel = (offset: number) =>
  offset === 0 ? "UTC±0" : `UTC${offset > 0 ? "+" : "−"}${Math.abs(offset)}`;

/** "9 am", "5 pm", "midnight". */
export function hourLabel(h: number) {
  const n = ((h % 24) + 24) % 24;
  if (n === 0) return "midnight";
  if (n === 12) return "noon";
  return `${n % 12} ${n < 12 ? "am" : "pm"}`;
}

/** Wall-clock time right now at a UTC offset, e.g. "4:12 pm". */
export function localTime(offset: number, now = new Date()) {
  const d = new Date(now.getTime() + offset * 3_600_000);
  const h = d.getUTCHours();
  return `${h % 12 || 12}:${String(d.getUTCMinutes()).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

/**
 * Which of the viewer's 24 local hours a working day covers.
 * A member at `tz` working [start, end) local time, seen from a viewer at `viewer` offset.
 */
export function hoursSeenFrom(
  start: number,
  end: number,
  tz: number,
  viewer: number,
) {
  const slots = Array<boolean>(24).fill(false);
  for (let h = start; h < end; h++)
    slots[(((h - tz + viewer) % 24) + 24) % 24] = true;
  return slots;
}

/** Contiguous true runs as [start, length] pairs, joining a run that wraps past midnight. */
export function runs(slots: boolean[]): [number, number][] {
  const out: [number, number][] = [];
  for (let h = 0; h < 24; h++) {
    if (!slots[h] || slots[(h + 23) % 24]) continue;
    let len = 0;
    while (len < 24 && slots[(h + len) % 24]) len++;
    out.push([h, len]);
  }
  return slots.every(Boolean) ? [[0, 24]] : out;
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name.
 * Returns an empty object when valid and focuses the first bad field otherwise.
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
  if (first) {
    const target = form.elements.namedItem(first);
    (target instanceof RadioNodeList
      ? (target[0] as HTMLElement)
      : (target as HTMLElement | null)
    )?.focus();
  }
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));
