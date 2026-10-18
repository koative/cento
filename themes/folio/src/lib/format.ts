import { hours, type Work } from "../content";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});
export const money = (n: number) => usd.format(n);

export const price = (w: Work) =>
  w.status === "sold"
    ? "Sold"
    : w.price === null
      ? "Price on request"
      : money(w.price);

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
/** "11 Sep" from "2026-09-11", without locale surprises like "Sept". */
const dayMonth = (iso: string) =>
  `${Number(iso.slice(8, 10))} ${MONTHS[Number(iso.slice(5, 7)) - 1]}`;

/** "11 Sep – 7 Nov 2026"; ranges across a new year carry both years. */
export function dateRange(opens: string, closes: string) {
  const sameYear = opens.slice(0, 4) === closes.slice(0, 4);
  return `${dayMonth(opens)}${sameYear ? "" : " " + opens.slice(0, 4)} – ${dayMonth(closes)} ${closes.slice(0, 4)}`;
}

/** "Thu 22 Oct" */
export const eventDate = (iso: string) =>
  `${DAYS[new Date(iso + "T12:00:00").getDay()].slice(0, 3)} ${dayMonth(iso)}`;

export const dims = (w: { w: number; h: number }, unit: "cm" | "in" = "cm") =>
  unit === "cm"
    ? `${w.h} × ${w.w} cm`
    : `${(w.h / 2.54).toFixed(1)} × ${(w.w / 2.54).toFixed(1)} in`;

const minutes = (hhmm: string) =>
  Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));
export const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/** Live opening state from the weekly hours table, e.g. "Open now, until 18:00". */
export function openState(now: Date) {
  const today = hours[now.getDay()];
  const mins = now.getHours() * 60 + now.getMinutes();
  if (today && mins >= minutes(today.open) && mins < minutes(today.close)) {
    return { open: true, text: `Open now, until ${today.close}` };
  }
  for (let i = 0; i < 7; i++) {
    const d = (now.getDay() + i) % 7;
    const h = hours[d];
    if (!h || (i === 0 && mins >= minutes(h.open))) continue;
    return {
      open: false,
      text: `Closed now, opens ${i === 0 ? "today" : i === 1 ? "tomorrow" : DAYS[d]} at ${h.open}`,
    };
  }
  return { open: false, text: "Closed" };
}
