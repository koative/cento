import { tours } from "../content";

/** "13:45" → minutes after midnight */
export const toMinutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** "13:45" → "1:45 pm" */
export const ampm = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
};

export type Slot = { id: string; date: Date; time: string; full: boolean };

/** Tour slots for the next `count` tour days. Some are marked full so the demo shows both states. */
export function tourSlots(
  count: number,
  from = new Date(),
): { date: Date; slots: Slot[] }[] {
  const out: { date: Date; slots: Slot[] }[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (out.length < count) {
    if (tours.weekdays.includes(d.getDay())) {
      const date = new Date(d);
      const key = date.toISOString().slice(0, 10);
      out.push({
        date,
        slots: tours.times.map((time, i) => ({
          id: `${key} ${time}`,
          date,
          time,
          full: (date.getDate() + i * 2) % 5 === 0,
        })),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export const dayLabel = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
export const longDay = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

/** Whole months between a yyyy-mm-dd birthday and a date. */
export function ageInMonths(birthday: string, at = new Date()) {
  const b = new Date(birthday + "T00:00:00");
  if (Number.isNaN(b.getTime())) return null;
  let m =
    (at.getFullYear() - b.getFullYear()) * 12 + (at.getMonth() - b.getMonth());
  if (at.getDate() < b.getDate()) m--;
  return m;
}
