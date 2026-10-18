import { brand, week, type Window } from "../content";

const fmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: brand.currency,
  maximumFractionDigits: 0,
});
const fmtCents = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: brand.currency,
});
/** Menu prices are whole dollars; per-head splits need cents. */
export const money = (n: number) =>
  (Number.isInteger(n) ? fmt : fmtCents).format(n);

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "17:30" → "5:30 pm" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const span = (w: Window) => `${clock(w[0])} – ${clock(w[1])}`;

/** Parse "2026-10-29" as a local date (not UTC midnight). */
export const day = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const longDate = (iso: string) =>
  day(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

export const shortDate = (iso: string) => {
  const d = day(iso);
  return {
    dow: d.toLocaleDateString("en-US", { weekday: "short" }),
    date: d.getDate(),
    month: d.toLocaleDateString("en-US", { month: "short" }),
  };
};

const windows = (dow: number) =>
  [week[dow].brunch, week[dow].dinner].filter((w): w is Window => !!w);

/** Open now, or when the next service starts. */
export function openStatus(now = new Date()) {
  const dow = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  for (const w of windows(dow)) {
    if (mins >= toMin(w[0]) && mins < toMin(w[1])) {
      const what = w === week[dow].brunch ? "Brunch" : "Kitchen open";
      return { open: true, label: `${what} until ${clock(w[1])}` };
    }
    if (mins < toMin(w[0]))
      return { open: false, label: `Opens ${clock(w[0])} today` };
  }
  for (let i = 1; i <= 7; i++) {
    const next = windows((dow + i) % 7)[0];
    if (next)
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : week[(dow + i) % 7].day} ${clock(next[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

export type Slot = { time: string; service: "Brunch" | "Dinner"; left: number };

/**
 * Demo availability: a stable pseudo-random number of tables per date and time,
 * fewer for big parties and none for times already gone today.
 */
export function slotsFor(iso: string, party: number, now = new Date()): Slot[] {
  const d = day(iso);
  const today = isoDate(now) === iso;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const out: Slot[] = [];
  for (const [w, service, tail] of [
    [week[d.getDay()].brunch, "Brunch", 60],
    [week[d.getDay()].dinner, "Dinner", 90],
  ] as const) {
    if (!w) continue;
    for (let t = toMin(w[0]); t <= toMin(w[1]) - tail; t += 30) {
      const time = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
      let hash = 7;
      for (const c of iso + time) hash = (hash * 31 + c.charCodeAt(0)) % 9973;
      let left = hash % 5;
      if (party > 4) left = Math.floor(left / 2);
      if (today && t <= nowMin + 30) left = 0;
      out.push({ time, service, left });
    }
  }
  return out;
}
