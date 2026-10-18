import { classes, rooms, sessions, teachers, type Session } from "../content";

export type Day = {
  index: number;
  date: Date;
  iso: string;
  label: string;
  short: string;
  long: string;
};

const fmtShort = new Intl.DateTimeFormat("en-US", { weekday: "short" });
const fmtLong = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

/** The next seven days starting today; `index` is the weekday with Monday = 0. */
export function upcomingDays(now = new Date()): Day[] {
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
    const short = fmtShort.format(date);
    return {
      index: (date.getDay() + 6) % 7,
      date,
      iso: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`,
      label: i === 0 ? "Today" : i === 1 ? "Tomorrow" : short,
      short,
      long: fmtLong.format(date),
    };
  });
}

export const classOf = (s: Session) => classes.find((c) => c.slug === s.cls)!;
export const teacherOf = (s: Session) =>
  teachers.find((t) => t.slug === s.teacher)!;
export const roomOf = (s: Session) => rooms[s.room];

export function endTime(s: Session) {
  const [h, m] = s.time.split(":").map(Number);
  const end = h * 60 + m + classOf(s).minutes;
  return `${String(Math.floor(end / 60)).padStart(2, "0")}:${String(end % 60).padStart(2, "0")}`;
}

/** Deterministic demo availability: the same session on the same date always shows the same number. */
export function spotsLeft(s: Session, iso: string) {
  let h = 0;
  for (const ch of s.id + iso) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const cap = roomOf(s).capacity;
  const left = (h % (cap + 4)) - 3;
  return Math.max(0, Math.min(cap, left));
}

export function startsAt(s: Session, day: Day) {
  const [h, m] = s.time.split(":").map(Number);
  return new Date(
    day.date.getFullYear(),
    day.date.getMonth(),
    day.date.getDate(),
    h,
    m,
  );
}

export type Slot = {
  session: Session;
  day: Day;
  started: boolean;
  left: number;
};

/** Sessions for one day, in time order, with whether they have already started. */
export function sessionsOn(day: Day, now = new Date()): Slot[] {
  return sessions
    .filter((s) => s.day === day.index)
    .map((s) => ({
      session: s,
      day,
      started: startsAt(s, day) <= now,
      left: spotsLeft(s, day.iso),
    }));
}

/** The next `n` bookable sessions from now across the coming week. */
export function nextSessions(n: number, now = new Date()) {
  return upcomingDays(now)
    .flatMap((d) => sessionsOn(d, now))
    .filter((x) => !x.started)
    .slice(0, n);
}

export const money = (n: number) => `$${n.toLocaleString("en-US")}`;
