import type { Phase, Project, Role } from "../content";

export const totalWeeks = (p: Project) =>
  Math.max(...p.phases.map((ph) => ph.end));

/** 0 before the phase starts, 1 once it ends. */
export const phaseProgress = (ph: Phase, week: number) =>
  Math.min(1, Math.max(0, (week - ph.start) / (ph.end - ph.start)));

export type Progress = Record<Role, number>;

export function progressAt(p: Project, week: number): Progress {
  const out: Progress = {
    enable: 0,
    sub: 0,
    frame: 0,
    envelope: 0,
    fitout: 0,
    handover: 0,
  };
  for (const ph of p.phases) out[ph.role] = phaseProgress(ph, week);
  // Bridges have no fit-out phase; treat it as done alongside the deck finishes.
  if (!p.phases.some((ph) => ph.role === "fitout")) out.fitout = out.envelope;
  return out;
}

export const activePhases = (p: Project, week: number) =>
  p.phases.filter((ph) => week >= ph.start && week < ph.end);

/** One-line status for a week, used in the readout and as the slider's spoken value. */
export function milestone(p: Project, week: number) {
  const T = totalWeeks(p);
  const pr = progressAt(p, week);
  if (week >= T)
    return p.kind === "span" ? "Complete and open" : "Complete and handed over";
  if (week === 0) return "Contract signed, site mobilising";
  if (pr.handover > 0) return "Commissioning and handover";
  if (pr.frame > 0 && pr.frame < 1) {
    if (p.kind === "span")
      return `Main structure ${Math.round(pr.frame * 100)}% complete`;
    return `Frame at level ${Math.max(1, Math.floor(pr.frame * p.storeys))} of ${p.storeys}`;
  }
  if (pr.frame >= 1) {
    if (p.kind === "span")
      return `Deck finishes ${Math.round(pr.envelope * 100)}% complete`;
    return pr.envelope < 1
      ? `Topped out, envelope ${Math.round(pr.envelope * 100)}% closed`
      : `Weathertight, fit-out ${Math.round(pr.fitout * 100)}% complete`;
  }
  if (pr.sub > 0)
    return `Below ground, substructure ${Math.round(pr.sub * 100)}% complete`;
  return "Enabling works";
}
