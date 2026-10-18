import type { Hours, Station } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});
const usdWhole = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) =>
  (Number.isInteger(n) ? usdWhole : usd).format(n);

/** "2026-11-03" → Date at local midnight (never UTC). */
export const day = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fromToday = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return isoDate(d);
};

const dateFmt = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
});
export const shortDate = (iso: string) => (iso ? dateFmt.format(day(iso)) : "");

export const plural = (n: number, one: string, many = one + "s") =>
  `${n} ${n === 1 ? one : many}`;

/* ------------------------------------------------------------ hours */

export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export function clock(t: string) {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}${m ? ":" + String(m).padStart(2, "0") : ""} ${h < 12 ? "am" : "pm"}`;
}

export const hoursLabel = (h: Hours) =>
  h ? `${clock(h[0])} – ${clock(h[1])}` : "Closed";

/** Open or closed right now, plus when that changes. */
export function openStatus(station: Station, now = new Date()) {
  if (station.allDay) return { open: true, label: "Open 24 hours" };
  const today = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const h = station.hours[today];
  if (h && mins >= toMin(h[0]) && mins < toMin(h[1]))
    return { open: true, label: `Open until ${clock(h[1])}` };
  if (h && mins < toMin(h[0]))
    return { open: false, label: `Opens ${clock(h[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const next = station.hours[(today + i) % 7];
    if (next)
      return {
        open: false,
        label: `Opens ${i === 1 ? "tomorrow" : weekdays[(today + i) % 7]} ${clock(next[0])}`,
      };
  }
  return { open: false, label: "Closed" };
}
