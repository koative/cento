import type { LangId, Level } from "../content";

export type Placement = { lang: LangId; level: Level; score: number };

const KEY = "sonnet-placement";

/** The last level-test result, so the enrolment form can suggest a group. Works without storage. */
export function loadPlacement(): Placement | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Placement) : null;
  } catch {
    return null;
  }
}

export function savePlacement(p: Placement) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // Private mode or storage disabled: the result still shows on screen.
  }
}

/** Correct answers out of eight, mapped onto the CEFR band they reach. */
export function levelFor(score: number): Level {
  return (["A1", "A1", "A2", "A2", "B1", "B1", "B2", "B2", "C1"] as const)[
    score
  ];
}
