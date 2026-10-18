import type { Store } from "../content";

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const hour = (h: number) =>
  h === 12 ? "12 pm" : h > 12 ? `${h - 12} pm` : `${h} am`;

export function hoursLabel(store: Store, day: number) {
  const h = store.hours[day];
  return h ? `${hour(h[0])} – ${hour(h[1])}` : "Closed";
}

/** "Open until 7 pm", "Opens 10 am tomorrow"… in the visitor's local time (demo stores share one clock). */
export function openStatus(store: Store, now = new Date()) {
  const today = store.hours[now.getDay()];
  const t = now.getHours() + now.getMinutes() / 60;
  if (today && t >= today[0] && t < today[1])
    return { open: true, label: `Open until ${hour(today[1])}` };
  if (today && t < today[0])
    return { open: false, label: `Opens ${hour(today[0])} today` };
  for (let i = 1; i <= 7; i++) {
    const d = (now.getDay() + i) % 7;
    const h = store.hours[d];
    if (h)
      return {
        open: false,
        label: `Opens ${hour(h[0])} ${i === 1 ? "tomorrow" : days[d]}`,
      };
  }
  return { open: false, label: "Closed" };
}

/** The next `n` days on which the store has an optometrist in clinic, starting tomorrow. */
export function clinicDates(store: Store, n = 10, from = new Date()) {
  const out: Date[] = [];
  for (let i = 1; out.length < n && i < 40; i++) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + i);
    if (store.clinicDays.includes(d.getDay()) && store.hours[d.getDay()])
      out.push(d);
  }
  return out;
}

/** Half-hour exam slots for a day; a stable pseudo-random third are already booked. */
export function slots(store: Store, date: Date) {
  const h = store.hours[date.getDay()];
  if (!h) return [];
  const out: { time: string; taken: boolean }[] = [];
  for (let t = h[0]; t < h[1] - 0.5; t += 0.5) {
    const seed = (date.getDate() * 31 + t * 7 + store.id.length * 13) % 3;
    const label = `${Math.floor(t) > 12 ? Math.floor(t) - 12 : Math.floor(t)}:${t % 1 ? "30" : "00"} ${t >= 12 ? "pm" : "am"}`;
    out.push({ time: label, taken: seed === 0 });
  }
  return out;
}

export const dateLabel = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
