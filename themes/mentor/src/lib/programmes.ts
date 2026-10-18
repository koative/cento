import type { Cohort, Programme } from "../content";
import { shortDate } from "./format";

const today = new Date().toISOString().slice(0, 10);

/** Cohorts that haven't started yet, soonest first. */
export const upcoming = (p: Programme): Cohort[] =>
  p.cohorts.filter((c) => c.start >= today);

/** "Starts 14 Jan" for cohort programmes, the availability line for everything else. */
export function nextStart(p: Programme) {
  const c = upcoming(p)[0];
  return c ? `Starts ${shortDate(c.start)}` : (p.availability ?? "Ask us");
}
