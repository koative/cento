import { useEffect, useState } from "react";
import {
  clinicHours,
  waitByHour,
  type Condition,
  type VisitType,
} from "../content";

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export function clock(hour: number) {
  return `${hour % 12 || 12} ${hour < 12 ? "am" : "pm"}`;
}

/** Re-render every `ms` so live wait times stay current. */
export function useNow(ms = 30_000) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), ms);
    return () => clearInterval(id);
  }, [ms]);
  return now;
}

export type Queue = { open: boolean; minutes: number; label: string };

/** The video queue right now, from the sample wait-by-hour table. */
export function queueAt(now: Date): Queue {
  const h = now.getHours();
  if (h >= clinicHours.open && h < clinicHours.close) {
    const minutes = waitByHour[h] ?? 12;
    return { open: true, minutes, label: `About ${minutes} min` };
  }
  const when = h < clinicHours.open ? "today" : "tomorrow";
  return {
    open: false,
    minutes: 0,
    label: `Opens ${clock(clinicHours.open)} ${when}`,
  };
}

export type Route =
  | { kind: "emergency" }
  | { kind: "in-person" }
  | { kind: "visit"; type: VisitType };

/** Where a check-in should go: red flags stop it, high severity sends you in, otherwise the condition's first visit type. */
export function recommend(
  condition: Condition | undefined,
  severity: number,
  flags: string[],
): Route {
  if (flags.length) return { kind: "emergency" };
  if (condition && severity >= condition.inPersonAt)
    return { kind: "in-person" };
  return { kind: "visit", type: condition?.visitTypes[0] ?? "video" };
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
  if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus?.();
  return errors;
}

/** Fake latency so loading states are visible. Nothing is sent anywhere. */
export const pause = (ms = 1100) => new Promise((r) => setTimeout(r, ms));
