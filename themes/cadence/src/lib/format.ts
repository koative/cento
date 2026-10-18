import { loopSteps, paces, stages, type Stage } from "../content";

const day = 86_400_000;

export const formatDate = (iso: string, withYear = false) =>
  new Date(iso.slice(0, 10) + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" } : {}),
  });

export const daysBetween = (from: string, to: string) =>
  Math.round(
    (Date.parse(to.slice(0, 10)) - Date.parse(from.slice(0, 10))) / day,
  );

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

export const stageLabel = (id: Stage) => stages.find((s) => s.id === id)!.label;
export const stageIndex = (id: Stage) => stages.findIndex((s) => s.id === id);

/** Lays an interview loop out on a day grid: one step per `gap` days, decision the day after the last interview. */
export function composeLoop(stepIds: string[], paceId: string) {
  const gap = paces.find((p) => p.id === paceId)?.gap ?? 2;
  const steps = loopSteps.filter((s) => stepIds.includes(s.id));
  let d = 0;
  const placed = steps.map((s, i) => {
    if (i > 0) d += s.id === "decision" ? 1 : gap;
    return { ...s, day: d };
  });
  const interviews = placed.filter((s) => s.id !== "decision");
  return {
    steps: placed,
    days: d,
    candidateMinutes: interviews.reduce((n, s) => n + s.minutes, 0),
    teamMinutes: placed.reduce((n, s) => n + s.minutes * s.interviewers, 0),
  };
}

/** Steps needed to cover a set of competencies; intro and decision always run. */
export function stepsFor(competencyIds: string[]) {
  return loopSteps
    .filter(
      (s) =>
        s.id === "intro" ||
        s.id === "decision" ||
        s.covers.some((c) => competencyIds.includes(c)),
    )
    .map((s) => s.id);
}

export const hours = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h} h${m ? ` ${m} min` : ""}` : `${m} min`;
};
