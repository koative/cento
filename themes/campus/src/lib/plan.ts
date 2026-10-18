import type { Course } from "../content";

export type Session = {
  date: Date;
  minutes: number;
  lessons: { module: number; title: string }[];
};

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/** Monday-first weekday index (0 = Monday). */
const dayIndex = (d: Date) => (d.getDay() + 6) % 7;

/**
 * Spread a course's lessons over the learner's study days.
 * Each study day gets an equal share of the weekly hours; a lesson longer than the share gets a day to itself.
 */
export function planCourse(
  course: Course,
  hoursPerWeek: number,
  days: number[],
  start: Date,
) {
  const share = (hoursPerWeek * 60) / days.length;
  const queue = course.modules.flatMap((m, module) =>
    m.lessons.map((l) => ({ module, title: l.title, minutes: l.minutes })),
  );
  const sessions: Session[] = [];
  const date = new Date(start);
  date.setHours(12, 0, 0, 0);

  // ponytail: day-by-day walk, bounded at two years; fine for courses of a few dozen lessons.
  for (
    let guard = 0;
    queue.length && guard < 730;
    guard++, date.setDate(date.getDate() + 1)
  ) {
    if (!days.includes(dayIndex(date))) continue;
    const session: Session = { date: new Date(date), minutes: 0, lessons: [] };
    while (
      queue.length &&
      (session.minutes === 0 ||
        session.minutes + queue[0].minutes <= share * 1.15)
    ) {
      const next = queue.shift()!;
      session.minutes += next.minutes;
      session.lessons.push({ module: next.module, title: next.title });
    }
    sessions.push(session);
  }

  const first = sessions[0]?.date ?? start;
  const finish = sessions[sessions.length - 1]?.date ?? start;
  const weekOf = (d: Date) =>
    Math.floor(
      (d.getTime() - first.getTime() + dayIndex(first) * 864e5) / (7 * 864e5),
    );
  const modules = course.modules.map((m, i) => {
    const own = sessions.filter((s) => s.lessons.some((l) => l.module === i));
    return {
      title: m.title,
      from: weekOf(own[0].date),
      to: weekOf(own[own.length - 1].date),
    };
  });
  return { sessions, finish, weeks: weekOf(finish) + 1, modules };
}

/** The coming Monday (or today if it is Monday), as yyyy-mm-dd for a date input. */
export function nextMonday(today = new Date()) {
  const d = new Date(today);
  d.setDate(d.getDate() + ((7 - dayIndex(d)) % 7));
  return toInput(d);
}

export const toInput = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

export const fromInput = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d, 12);
};

export function duration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h ? (m ? `${h} h ${m} min` : `${h} h`) : `${m} min`;
}

export const longDate = (d: Date) =>
  d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
export const shortDate = (d: Date) =>
  d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
