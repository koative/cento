import { hours } from "../content";

export const money = (n: number) =>
  n === 0 ? "Free" : `$${n.toLocaleString("en-US")}`;

export const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** "08:00" → "8 am", "13:30" → "1:30 pm" */
export function clock(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m
    ? `${h12}:${String(m).padStart(2, "0")} ${suffix}`
    : `${h12} ${suffix}`;
}

export const minutesOf = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const hhmmOf = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
export const cardDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

/** Open/closed right now, and when that changes. */
export function openStatus(now = new Date()) {
  const today = hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (today && mins >= minutesOf(today.open) && mins < minutesOf(today.close)) {
    return { open: true, label: `Open now · until ${clock(today.close)}` };
  }
  if (today && mins < minutesOf(today.open))
    return { open: false, label: `Closed · opens ${clock(today.open)} today` };
  for (let i = 1; i <= 7; i++) {
    const day = (now.getDay() + i) % 7;
    const h = hours[day];
    if (h)
      return {
        open: false,
        label: `Closed · opens ${i === 1 ? "tomorrow" : weekday[day]} ${clock(h.open)}`,
      };
  }
  return { open: false, label: "Closed" };
}
