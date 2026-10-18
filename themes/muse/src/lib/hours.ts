import type { Store } from "../content";

export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const toMinutes = (hhmm: string) =>
  Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

/** The store's local weekday and time, so "open now" is true in Paris whatever the visitor's clock says. */
function localNow(timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    day: DAYS.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function storeStatus(store: Store, now = new Date()) {
  const { day, minutes } = localNow(store.timeZone, now);
  const today = store.hours[day];
  if (today && minutes >= toMinutes(today[0]) && minutes < toMinutes(today[1]))
    return { open: true, line: `Open now, until ${today[1]}` };
  if (today && minutes < toMinutes(today[0]))
    return { open: false, line: `Closed, opens today at ${today[0]}` };
  for (let i = 1; i <= 7; i++) {
    const next = store.hours[(day + i) % 7];
    if (next)
      return {
        open: false,
        line: `Closed, opens ${i === 1 ? "tomorrow" : DAYS[(day + i) % 7]} at ${next[0]}`,
      };
  }
  return { open: false, line: "Closed" };
}

export const todayIndex = (store: Store, now = new Date()) =>
  localNow(store.timeZone, now).day;
