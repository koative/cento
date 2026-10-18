import {
  languages,
  teachers,
  type Course,
  type LangId,
  type Session,
} from "../content";

export const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const short = days.map((d) => d.slice(0, 3));

export const money = (n: number) => "$" + n.toLocaleString("en-US");

export function longDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function shortDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

export const minutes = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3);

/** "Tue & Thu · 18:30–20:00", or "Mon–Fri · 09:30–12:30" for a run of five days. */
export function schedule(sessions: Session[]) {
  const { start, end } = sessions[0];
  const ds = sessions.map((s) => s.day);
  const run =
    ds.length > 2 && ds.every((d, i) => i === 0 || d === ds[i - 1] + 1);
  const dayText = run
    ? `${short[ds[0]]}–${short[ds[ds.length - 1]]}`
    : ds.map((d) => short[d]).join(" & ");
  return `${dayText} · ${start}–${end}`;
}

export function totalHours(c: Course) {
  const perWeek = c.sessions.reduce(
    (sum, s) => sum + minutes(s.end) - minutes(s.start),
    0,
  );
  return Math.round((perWeek * c.weeks) / 60);
}

export const langOf = (id: LangId) => languages.find((l) => l.id === id)!;
export const teacherOf = (id: string) => teachers.find((t) => t.id === id)!;
export const levelText = (c: Course) => c.levels.join("–");
