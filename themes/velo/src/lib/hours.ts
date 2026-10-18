import { hours } from "../content";

export const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const minutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "Open until 19:00" or "Closed · opens Tuesday 10:00", in the shop's local time. */
export function openStatus(now = new Date()) {
  const today = hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (today && mins >= minutes(today.open) && mins < minutes(today.close))
    return { open: true, label: `Open until ${today.close}` };
  for (let i = 0; i < 7; i++) {
    const day = (now.getDay() + i) % 7;
    const h = hours[day];
    if (!h || (i === 0 && mins >= minutes(h.open))) continue;
    return {
      open: false,
      label: `Closed · opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : dayNames[day]} ${h.open}`,
    };
  }
  return { open: false, label: "Closed" };
}
