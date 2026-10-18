import { phoneHours } from "../content";

export type Errors = Record<string, string>;

/**
 * Native constraint validation with our own wording per field name, plus extra custom errors.
 * Focuses the first bad field and returns an empty object when the form is valid.
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
    const el = target instanceof RadioNodeList ? target[0] : target;
    if (el instanceof HTMLElement) el.focus();
  }
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------ troubleshooter → contact hand-off */

export type Handoff = {
  flow: string;
  topic: string;
  trail: { q: string; a: string }[];
};

// ponytail: in-memory only, a page reload drops the hand-off; persist to sessionStorage if that matters.
let pending: Handoff | null = null;
export const setHandoff = (h: Handoff | null) => void (pending = h);
export const getHandoff = () => pending;

/* ------------------------------------------------------------ phone line hours (Eastern) */

const parts = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  weekday: "short",
  hour: "numeric",
  minute: "numeric",
  hourCycle: "h23",
});
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3));
const clock = (t: string) => {
  const h = Number(t.slice(0, 2));
  return `${h % 12 || 12} ${h < 12 ? "am" : "pm"}`;
};

export function phoneStatus(now = new Date()) {
  const p = Object.fromEntries(
    parts.formatToParts(now).map((x) => [x.type, x.value]),
  );
  const today = weekdays.indexOf(p.weekday);
  const mins = Number(p.hour) * 60 + Number(p.minute);
  const h = phoneHours[today];
  if (h && mins >= toMin(h[0]) && mins < toMin(h[1]))
    return { open: true, label: `Phone line open until ${clock(h[1])} ET` };
  if (h && mins < toMin(h[0]))
    return { open: false, label: `Phone line opens ${clock(h[0])} ET today` };
  for (let i = 1; i <= 7; i++) {
    const next = phoneHours[(today + i) % 7];
    if (next)
      return {
        open: false,
        label: `Phone line opens ${i === 1 ? "tomorrow" : weekdays[(today + i) % 7]} ${clock(next[0])} ET`,
      };
  }
  return { open: false, label: "Phone line closed" };
}
