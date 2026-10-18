import {
  board,
  days,
  demoBookings,
  rooms,
  type Hours,
  type Room,
} from "./content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(Math.round(n));

/* ------------------------------------------------------------ dates */

/** "2026-11-12" → local Date at midnight. */
export function parseDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const longDate = (iso: string) =>
  parseDate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/* ------------------------------------------------------------ hours */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** 9.5 → "9:30", 14 → "14:00" (board time, 24h like the signage). */
export const hhmm = (h: number) => `${Math.floor(h)}:${h % 1 ? "30" : "00"}`;

export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** Front desk open right now, plus the next change. */
export function deskStatus(hours: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hours[day];
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Desk open until ${clock(today[1])}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Desk opens ${clock(today[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const h = hours[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Desk opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Desk closed" };
}

/* ------------------------------------------------------------ room board */

export type Booking = {
  roomId: string;
  date: string;
  start: number;
  end: number;
  ref: string;
};

/** Every half-hour start on the board, 8:00 → 19:30. */
export const slots = Array.from(
  { length: (board.close - board.open) * 2 },
  (_, i) => board.open + i / 2,
);

/** Demo bookings for one room on one day: rotated per room and date, light on weekends. */
export function bookedFor(room: Room, date: Date): [number, number][] {
  const pattern =
    demoBookings[(rooms.indexOf(room) + date.getDate()) % demoBookings.length];
  return date.getDay() === 0 || date.getDay() === 6
    ? pattern.slice(0, 1)
    : pattern;
}

/** Longest booking (hours, max 4) that fits from `start` before the next busy block or closing. */
export function maxLength(busy: [number, number][], start: number) {
  const next = Math.min(
    board.close,
    ...busy.filter(([s]) => s > start).map(([s]) => s),
  );
  return Math.min(next - start, 4);
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
  const el = first ? form.elements.namedItem(first) : null;
  (el instanceof RadioNodeList
    ? (el[0] as HTMLElement | undefined)
    : (el as HTMLElement | null)
  )?.focus();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

/** Short booking reference like "CM-4K7Q". */
export const reference = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
