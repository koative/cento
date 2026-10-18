import {
  days,
  type Beer,
  type Hours,
  type KettleEvent,
  type Tour,
} from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export const money = (n: number) => usd.format(n);

/* ------------------------------------------------------------ storage */

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or full storage: state still works for this visit */
  }
}

/* ------------------------------------------------------------ beer colour */

/** The brewing industry's SRM reference colours, index = SRM value. */
const SRM = [
  "#FFE699",
  "#FFE699",
  "#FFD878",
  "#FFCA5A",
  "#FFBF42",
  "#FBB123",
  "#F8A600",
  "#F39C00",
  "#EA8F00",
  "#E58500",
  "#DE7C00",
  "#D77200",
  "#CF6900",
  "#CB6200",
  "#C35900",
  "#BB5100",
  "#B54C00",
  "#B04500",
  "#A63E00",
  "#A13700",
  "#9B3200",
  "#952D00",
  "#8E2900",
  "#882300",
  "#821E00",
  "#7B1A00",
  "#771900",
  "#701400",
  "#6A0E00",
  "#660D00",
  "#5E0B00",
  "#5A0A02",
  "#600903",
  "#520907",
  "#4C0505",
  "#470606",
  "#440607",
  "#3F0708",
  "#3B0607",
  "#3A070B",
  "#36080A",
];

export const srmHex = (srm: number) =>
  SRM[Math.max(1, Math.min(40, Math.round(srm)))];
export const beerColor = (b: Beer) => b.tint ?? srmHex(b.srm);

/** Lightest and gentlest first, roast and strength last — the order a bartender would set a paddle. */
export const pourOrder = (list: Beer[]) =>
  [...list].sort(
    (a, b) =>
      a.abv +
      a.srm * 0.08 +
      (a.family === "sour" ? 3 : 0) -
      (b.abv + b.srm * 0.08 + (b.family === "sour" ? 3 : 0)),
  );

/* ------------------------------------------------------------ time */

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function clock(t: string) {
  if (t === "23:59") return "midnight";
  const [h, m] = t.split(":").map(Number);
  const hour = h % 12 || 12;
  return `${hour}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** Open/closed right now plus the next change, from a Sunday-first week of hours. */
export function openStatus(hours: Hours[], now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hours[day];
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Open until ${clock(today[1])}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Opens ${clock(today[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const h = hours[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

/** "2026-10-24" → local Date at midnight (no UTC shift). */
export const parseDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isoDay = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const longDate = (iso: string) =>
  parseDay(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export const dateParts = (iso: string) => {
  const d = parseDay(iso);
  return {
    day: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "short" }),
  };
};

export const eventTime = (e: KettleEvent) =>
  `${clock(e.start)} – ${clock(e.end)}`;

/** Upcoming days (from tomorrow) on which a tour runs. */
export function tourDates(tour: Tour, count = 10, from = new Date()) {
  const out: string[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (tour.days.includes(d.getDay())) out.push(isoDay(d));
  }
  return out;
}

/** Demo availability: a stable pseudo-random number of places left per slot. */
export function spotsLeft(tour: Tour, iso: string, time: string) {
  let h = 7;
  for (const c of tour.id + iso + time) h = (h * 31 + c.charCodeAt(0)) % 9973;
  const left = h % (tour.capacity + 3);
  return left > tour.capacity ? tour.capacity : left;
}

/** A calendar file for "Add to calendar". */
export function icsFor(e: KettleEvent, where: string) {
  const stamp = (t: string) =>
    e.date.replaceAll("-", "") +
    "T" +
    (t === "23:59" ? "235900" : t.replace(":", "") + "00");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Kettle Brewing//Events//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}@kettle.example`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(e.end)}`,
    `SUMMARY:${e.title}`,
    `LOCATION:${where}`,
    `DESCRIPTION:${e.summary}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/* ------------------------------------------------------------ forms */

export type Errors = Record<string, string>;

/**
 * Native constraint validation, with our own wording per field name.
 * Returns an empty object when the form is valid and focuses the first bad field otherwise.
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
  const target = first ? form.elements.namedItem(first) : null;
  if (target instanceof RadioNodeList)
    (target[0] as HTMLElement | undefined)?.focus();
  else (target as HTMLElement | null)?.focus?.();
  return errors;
}

/** Fake network latency so loading states are visible. */
export const pause = (ms = 900) => new Promise((r) => setTimeout(r, ms));

export const reference = (prefix: string) =>
  `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
