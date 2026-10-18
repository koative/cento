import { hours } from "../content";

export const money = (n: number) =>
  "$" + (Number.isInteger(n) ? n.toString() : n.toFixed(2));

/** "2026-10-27" → Date at local midnight (avoids the UTC shift of new Date("2026-10-27")). */
export function day(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export const dateLong = (iso: string) =>
  day(iso).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

export const monthYear = (iso: string) =>
  new Date(
    Number(iso.slice(0, 4)),
    Number(iso.slice(5, 7)) - 1,
  ).toLocaleDateString("en-US", { month: "long", year: "numeric" });

const hourLabel = (h: number) =>
  h === 12 ? "noon" : h > 12 ? `${h - 12}pm` : `${h}am`;

export const hoursLabel = (open: number | null, close: number | null) =>
  open === null || close === null
    ? "Closed"
    : `${hourLabel(open)} – ${hourLabel(close)}`;

/** "Open now · until 7pm" or "Closed · opens Tuesday 9am", from the weekly hours in content.ts. */
export function shopStatus(now = new Date()) {
  // content.hours starts on Monday; getDay() starts on Sunday.
  const index = (now.getDay() + 6) % 7;
  const today = hours[index];
  const h = now.getHours() + now.getMinutes() / 60;
  if (today.open !== null && h >= today.open && h < today.close) {
    return { open: true, text: `Open now · until ${hourLabel(today.close)}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = hours[(index + i) % 7];
    if (d.open === null || (i === 0 && h >= d.open)) continue;
    return {
      open: false,
      text: `Closed · opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : d.day} ${hourLabel(d.open)}`,
    };
  }
  return { open: false, text: "Closed" };
}
