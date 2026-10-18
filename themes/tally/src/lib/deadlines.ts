import { useSyncExternalStore } from "react";
import {
  deadlineRules,
  type DeadlineRule,
  type SalesFreq,
  type Structure,
} from "../content";

export type Profile = {
  structure: Structure;
  payroll: boolean;
  contractors: boolean;
  salesTax: SalesFreq;
};
export type Deadline = {
  key: string;
  rule: DeadlineRule;
  date: Date;
  days: number;
};

const DAY = 86_400_000;

export const startOfDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Saturday and Sunday due dates move to Monday. ponytail: federal holidays ignored; add a holiday list if a date ever lands on one. */
function rollWeekend(d: Date) {
  const shift = d.getDay() === 6 ? 2 : d.getDay() === 0 ? 1 : 0;
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + shift);
}

export function applies(rule: DeadlineRule, p: Profile) {
  if (rule.structures && !rule.structures.includes(p.structure)) return false;
  if (rule.needs === "payroll" && !p.payroll) return false;
  if (rule.needs === "contractors" && !p.contractors) return false;
  if (rule.salesTax && rule.salesTax !== p.salesTax) return false;
  return true;
}

/** The rules a profile needs; with no profile, every federal (non-sales-tax) rule. */
export const rulesFor = (profile: Profile | null) => (r: DeadlineRule) =>
  profile ? applies(r, profile) : !r.salesTax;

/** Every matching deadline from today through the next 12 months, soonest first. */
export function upcoming(
  test: (r: DeadlineRule) => boolean,
  today = new Date(),
): Deadline[] {
  const from = startOfDay(today);
  const until = new Date(
    from.getFullYear() + 1,
    from.getMonth(),
    from.getDate(),
  );
  const out: Deadline[] = [];
  for (const rule of deadlineRules.filter(test)) {
    for (const year of [from.getFullYear(), from.getFullYear() + 1]) {
      for (const [m, d] of rule.dates) {
        const date = rollWeekend(new Date(year, m - 1, d));
        if (date < from || date >= until) continue;
        out.push({
          key: `${rule.id}-${date.toISOString().slice(0, 10)}`,
          rule,
          date,
          days: Math.round((date.getTime() - from.getTime()) / DAY),
        });
      }
    }
  }
  return out.sort(
    (a, b) =>
      a.date.getTime() - b.date.getTime() ||
      a.rule.title.localeCompare(b.rule.title),
  );
}

/** The twelve months starting with the current one, as first-of-month dates. */
export function monthsAhead(today = new Date()) {
  return Array.from(
    { length: 12 },
    (_, i) => new Date(today.getFullYear(), today.getMonth() + i, 1),
  );
}

export const monthKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}`;

/* ------------------------------------------------------------ saved profile */

export const defaultProfile: Profile = {
  structure: "scorp",
  payroll: true,
  contractors: true,
  salesTax: "none",
};
const KEY = "tally-calendar-profile";
const listeners = new Set<() => void>();

function load(): Profile | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? { ...defaultProfile, ...(JSON.parse(raw) as Partial<Profile>) }
      : null;
  } catch {
    return null;
  }
}

let saved = load();

export function saveProfile(p: Profile) {
  saved = p;
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* storage unavailable: keep it in memory for this visit */
  }
  listeners.forEach((l) => l());
}

/** The visitor's saved calendar profile, or null if they never built one. */
export function useSavedProfile() {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => saved,
  );
}

/* ------------------------------------------------------------ calendar file */

const icsDate = (d: Date) =>
  `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
const icsText = (s: string) => s.replace(/[\\;,]/g, (c) => "\\" + c);

export type IcsEvent = {
  uid: string;
  start: Date;
  end?: Date;
  title: string;
  description: string;
  allDay: boolean;
};

/** Builds an .ics file and hands it to the browser as a download. */
export function downloadIcs(filename: string, events: IcsEvent[]) {
  const stamp =
    new Date().toISOString().replace(/[-:]/g, "").slice(0, 15) + "Z";
  const stampTime = (d: Date) =>
    `${icsDate(d)}T${String(d.getHours()).padStart(2, "0")}${String(d.getMinutes()).padStart(2, "0")}00`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tally//Tax calendar//EN",
    "CALSCALE:GREGORIAN",
  ];
  for (const e of events) {
    const end =
      e.end ??
      new Date(
        e.start.getFullYear(),
        e.start.getMonth(),
        e.start.getDate() + 1,
      );
    lines.push(
      "BEGIN:VEVENT",
      `UID:${e.uid}@tally.example`,
      `DTSTAMP:${stamp}`,
      e.allDay
        ? `DTSTART;VALUE=DATE:${icsDate(e.start)}`
        : `DTSTART:${stampTime(e.start)}`,
      e.allDay ? `DTEND;VALUE=DATE:${icsDate(end)}` : `DTEND:${stampTime(end)}`,
      `SUMMARY:${icsText(e.title)}`,
      `DESCRIPTION:${icsText(e.description)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  const url = URL.createObjectURL(
    new Blob([lines.join("\r\n")], { type: "text/calendar" }),
  );
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: filename,
  });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
