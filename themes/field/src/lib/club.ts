import {
  clubToday,
  fixtures,
  teams,
  type Day,
  type Fixture,
  type Session,
  type Team,
  type Who,
} from "../content";

const dateFmt = {
  short: new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }),
  long: new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
  full: new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }),
  day: new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
  month: new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }),
};

export const fmtDate = (iso: string, style: keyof typeof dateFmt = "short") =>
  dateFmt[style].format(new Date(iso + "T00:00:00Z"));

export const money = (n: number) =>
  `£${Number.isInteger(n) ? n : n.toFixed(2)}`;

export const teamOf = (slug: string) => teams.find((t) => t.slug === slug);

export const isPlayed = (f: Fixture) => f.date < clubToday;

export const upcoming = (team?: string) =>
  fixtures
    .filter((f) => !isPlayed(f) && (!team || f.team === team))
    .sort((a, b) => (a.date + a.ko).localeCompare(b.date + b.ko));

export const results = (team?: string) =>
  fixtures
    .filter((f) => isPlayed(f) && (!team || f.team === team))
    .sort((a, b) => b.date.localeCompare(a.date));

export type Outcome = "W" | "D" | "L";
export const outcome = (f: Fixture): Outcome | null =>
  f.score
    ? f.score[0] > f.score[1]
      ? "W"
      : f.score[0] < f.score[1]
        ? "L"
        : "D"
    : null;
export const outcomeLabel: Record<Outcome, string> = {
  W: "Won",
  D: "Drew",
  L: "Lost",
};

/** Home side first, as on a programme. */
export const sides = (f: Fixture) =>
  f.home ? ["Field United", f.opp] : [f.opp, "Field United"];
export const scoreline = (f: Fixture) =>
  f.score ? (f.home ? f.score : [f.score[1], f.score[0]]) : null;

export function form(team: string, count = 5) {
  return results(team)
    .map(outcome)
    .filter((o): o is Outcome => o !== null)
    .slice(0, count);
}

/** Groups fixtures under "October 2026" style headings, keeping order. */
export function byMonth(list: Fixture[]) {
  const groups: { month: string; items: Fixture[] }[] = [];
  for (const f of list) {
    const month = fmtDate(f.date, "month");
    const last = groups[groups.length - 1];
    if (last?.month === month) last.items.push(f);
    else groups.push({ month, items: [f] });
  }
  return groups;
}

/** Age on a cut-off date (FA age groups use 31 August). */
export function ageOn(dob: string, cutoff: string) {
  const [y, m, d] = dob.split("-").map(Number);
  const [cy, cm, cd] = cutoff.split("-").map(Number);
  return cy - y - (cm < m || (cm === m && cd < d) ? 1 : 0);
}

export type Preference = "any" | "women" | "men";
const fits: Record<Preference, Who[]> = {
  any: ["Men", "Women", "Boys", "Girls", "Mixed"],
  women: ["Women", "Girls", "Mixed"],
  men: ["Men", "Boys", "Mixed"],
};

export const teamsFor = (age: number, pref: Preference): Team[] =>
  teams.filter(
    (t) => age >= t.minAge && age <= t.maxAge && fits[pref].includes(t.who),
  );

/**
 * Pitch slots for a formation string such as "4-3-3": keeper first, then each line back to front,
 * left to right. x/y are percentages of a portrait pitch attacking upwards.
 */
export function slots(formation: string) {
  const lines = formation.split("-").map(Number);
  const out = [{ x: 50, y: 90, line: "Goalkeeper" }];
  const top = 17;
  const bottom = lines.length > 3 ? 70 : 68;
  lines.forEach((count, i) => {
    const y =
      lines.length === 1
        ? 45
        : bottom - (i * (bottom - top)) / (lines.length - 1);
    const line =
      i === 0 ? "Defence" : i === lines.length - 1 ? "Attack" : "Midfield";
    for (let j = 0; j < count; j++)
      out.push({ x: ((j + 1) * 100) / (count + 1), y, line });
  });
  return out;
}

export const posName = {
  GK: "Goalkeeper",
  DF: "Defender",
  MF: "Midfielder",
  FW: "Forward",
} as const;

export const days: { id: Day; label: string }[] = [
  { id: "Mon", label: "Monday" },
  { id: "Tue", label: "Tuesday" },
  { id: "Wed", label: "Wednesday" },
  { id: "Thu", label: "Thursday" },
  { id: "Fri", label: "Friday" },
  { id: "Sat", label: "Saturday" },
  { id: "Sun", label: "Sunday" },
];

/** Every team's training sessions, grouped by weekday and sorted by start time. */
export function trainingWeek() {
  return days.map((d) => ({
    ...d,
    sessions: teams
      .flatMap((team) =>
        team.training
          .filter((s) => s.day === d.id)
          .map((s): { team: Team; s: Session } => ({ team, s })),
      )
      .sort((a, b) => a.s.start.localeCompare(b.s.start)),
  }));
}
