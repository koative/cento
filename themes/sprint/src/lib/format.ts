import {
  people,
  pricing,
  priorities,
  statuses,
  type Priority,
  type Status,
} from "../content";

const day = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});
const stamp = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

/** "2026-10-13" → "Oct 13, 2026" (parsed as local date, not UTC). */
export const formatDay = (iso: string) =>
  day.format(new Date(`${iso.slice(0, 10)}T12:00`));

/** "2026-10-13" → "Oct 13" */
export const formatMonthDay = (iso: string) =>
  formatDay(iso).replace(/, \d{4}$/, "");

/** "2026-10-17T15:20" → "Oct 17, 3:20 PM" */
export const formatStamp = (iso: string) => stamp.format(new Date(iso));

/** Whole dollars stay whole ($13); fractional prices show cents ($7.50). */
export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: pricing.currency,
    minimumFractionDigits: n % 1 ? 2 : 0,
  }).format(n);

export const person = (id: string | null) => people.find((p) => p.id === id);
export const statusName = (id: Status) =>
  statuses.find((s) => s.id === id)!.name;
export const priorityName = (id: Priority) =>
  priorities.find((p) => p.id === id)!.name;
export const priorityRank = (id: Priority) =>
  priorities.findIndex((p) => p.id === id);

export const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
