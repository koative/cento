import { useSyncExternalStore } from "react";
import {
  brand,
  days,
  roomById,
  sessions,
  speakerBySlug,
  type Session,
} from "../content";

/* The visitor's personal agenda: a list of session ids, kept in localStorage when it's available. */

const KEY = "prism-plan";
const listeners = new Set<() => void>();

function load(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw)
      ? raw.filter((id) => sessions.some((s) => s.id === id))
      : [];
  } catch {
    return [];
  }
}

let plan = load();
/** Last change in words, for the polite live region in the header. */
let message = "";

function save(next: string[], said: string) {
  plan = next;
  message = said;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* private mode or full storage: the plan still works for this visit */
  }
  listeners.forEach((l) => l());
}

const subscribe = (l: () => void) => (
  listeners.add(l),
  () => listeners.delete(l)
);

export const usePlan = () => useSyncExternalStore(subscribe, () => plan);
export const usePlanMessage = () =>
  useSyncExternalStore(subscribe, () => message);

export function togglePlan(id: string) {
  const title = sessions.find((s) => s.id === id)?.title ?? "Session";
  const on = plan.includes(id);
  const next = on ? plan.filter((x) => x !== id) : [...plan, id];
  save(
    next,
    `${on ? "Removed" : "Added"} “${title}”. ${next.length} ${next.length === 1 ? "session" : "sessions"} in your agenda.`,
  );
}

export const clearPlan = () => save([], "Your agenda is empty.");

/* ------------------------------------------------------------ time */

export const minutes = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

/** End time in minutes, treating "01:00" after a "20:00" start as past midnight. */
export const endMinutes = (s: Session) => {
  const end = minutes(s.end);
  return end <= minutes(s.start) ? end + 1440 : end;
};

export const byStart = (a: Session, b: Session) =>
  a.day - b.day || minutes(a.start) - minutes(b.start);

export const planned = (ids: string[]) =>
  sessions.filter((s) => ids.includes(s.id)).sort(byStart);

/** Pairs of planned sessions on the same day whose times overlap. */
export function conflicts(list: Session[]) {
  const pairs: [Session, Session][] = [];
  list.forEach((a, i) =>
    list.slice(i + 1).forEach((b) => {
      if (
        a.day === b.day &&
        minutes(a.start) < endMinutes(b) &&
        minutes(b.start) < endMinutes(a)
      )
        pairs.push([a, b]);
    }),
  );
  return pairs;
}

export const speakerNames = (s: Session) =>
  s.speakers
    .map((slug) => speakerBySlug[slug]?.name)
    .filter(Boolean)
    .join(" & ");

/* ------------------------------------------------------------ calendar export */

function stamp(day: number, t: string, plusDay = false) {
  const date = new Date(`${days[day].iso}T00:00:00`);
  if (plusDay) date.setDate(date.getDate() + 1);
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  return `${ymd}T${t.replace(":", "")}00`;
}

const escape = (text: string) =>
  text.replace(/[\\;,]/g, (c) => "\\" + c).replace(/\n/g, "\\n");

/** An .ics file of the plan, in Rotterdam local time, downloaded straight from the browser. */
export function downloadCalendar(list: Session[]) {
  const events = list.map((s) =>
    [
      "BEGIN:VEVENT",
      `UID:${s.id}@prism.example`,
      `DTSTAMP:20270101T000000Z`,
      `DTSTART;TZID=Europe/Amsterdam:${stamp(s.day, s.start)}`,
      `DTEND;TZID=Europe/Amsterdam:${stamp(s.day, s.end, endMinutes(s) > 1440)}`,
      `SUMMARY:${escape(s.title)}`,
      `LOCATION:${escape(`${roomById[s.room].name}, ${brand.address}`)}`,
      `DESCRIPTION:${escape([speakerNames(s), s.text].filter(Boolean).join(" — "))}`,
      "END:VEVENT",
    ].join("\r\n"),
  );
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    `PRODID:-//${brand.name}//Agenda//EN`,
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: "prism-2027-agenda.ics",
  });
  a.click();
  URL.revokeObjectURL(url);
}
