import { divisions, players, type Game, type Match } from "../content";

export const money = (n: number) => `€${n.toFixed(n % 1 ? 2 : 0)}`;

const parse = (iso: string) =>
  new Date(iso.length === 10 ? iso + "T12:00" : iso);

/** "Sat 24 Oct" */
export const day = (iso: string) =>
  parse(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

/** "24 October 2026" */
export const longDate = (iso: string) =>
  parse(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/** "19:00 CET" — match times are published in Rotterdam time. */
export const time = (iso: string) => iso.slice(11, 16) + " CET";

export const divisionOf = (id: string) => divisions.find((d) => d.id === id)!;
export const playerById = (id: string) => players.find((p) => p.id === id);

export type Round = {
  n: number;
  ours: boolean;
  how: "E" | "P" | "D" | "T";
  us: number;
  them: number;
};

/** Expand a round tape into rounds with the running score after each one. */
export function rounds(tape: string): Round[] {
  let us = 0;
  let them = 0;
  return [...tape].map((c, i) => {
    const ours = c === c.toUpperCase();
    ours ? us++ : them++;
    return { n: i + 1, ours, how: c.toUpperCase() as Round["how"], us, them };
  });
}

export function gameScore(g: Game): [number, number] {
  if ("tape" in g) {
    const r = rounds(g.tape);
    const last = r[r.length - 1];
    return [last.us, last.them];
  }
  return [g.us, g.them];
}

/** Series score in games/maps, or null for a match that has not been played. */
export function seriesScore(m: Match): [number, number] | null {
  if (!m.games) return null;
  return m.games.reduce<[number, number]>(
    ([a, b], g) => {
      const [us, them] = gameScore(g);
      return us > them ? [a + 1, b] : [a, b + 1];
    },
    [0, 0],
  );
}

export const isWin = (m: Match) => {
  const s = seriesScore(m);
  return !!s && s[0] > s[1];
};

/** The scoreline fans quote: a single game shows its own score (24–13), a series its map count. */
export function scoreline(m: Match): [number, number] | null {
  if (!m.games) return null;
  return m.games.length === 1 ? gameScore(m.games[0]) : seriesScore(m);
}

export const howLabel: Record<Round["how"], string> = {
  E: "elimination",
  P: "spike detonated",
  D: "spike defused",
  T: "time ran out",
};

export const byDate = (a: { date: string }, b: { date: string }) =>
  a.date.localeCompare(b.date);
