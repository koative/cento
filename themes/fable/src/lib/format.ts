import { days, hours, type Hours } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => (n === 0 ? "Free" : usd.format(n));

export const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
export const fromMin = (n: number) =>
  `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;

/** "09:30" → "9:30 am" */
export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** Open/closed right now plus the next change. */
export function openStatus(now = new Date()) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = hours[day];
  if (today && mins >= toMin(today[0]) && mins < toMin(today[1]))
    return { open: true, label: `Open today until ${clock(today[1])}` };
  if (today && mins < toMin(today[0]))
    return { open: false, label: `Opens today at ${clock(today[0])}` };
  for (let i = 1; i <= 7; i++) {
    const h = hours[(day + i) % 7];
    if (h)
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : days[(day + i) % 7]} at ${clock(h[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}

export const isoLocal = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const todayIso = () => isoLocal(new Date());

/** Parse "2026-10-24" as a local date (not UTC midnight). */
export const parseIso = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const longDate = (iso: string) =>
  parseIso(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/** The next `count` days the museum is open, starting today. */
export function openDays(count: number, from = new Date()) {
  const out: string[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (out.length < count) {
    if (hours[d.getDay()]) out.push(isoLocal(d));
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** Deterministic "places left" per date + slot so the demo looks lived-in. */
export function placesLeft(iso: string, slot: string, capacity: number) {
  let h = 0;
  for (const c of iso + slot) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const r = h % 100;
  if (r < 8) return 0;
  if (r < 30) return 1 + (h % 9);
  return Math.round(capacity * (0.25 + (r % 60) / 100));
}
