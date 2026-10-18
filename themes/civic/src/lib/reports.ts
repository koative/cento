import { sampleReports, type Report } from "../content";

const KEY = "civic-reports";

/** Reports filed in this browser. Storage can be unavailable (private mode); the demo still works for the session. */
let mine: Report[] = (() => {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as Report[];
  } catch {
    return [];
  }
})();

export function allReports() {
  return [...mine, ...sampleReports];
}

export function fileReport(
  report: Omit<Report, "ref" | "stage" | "note" | "neighbours">,
): Report {
  const highest = Math.max(...allReports().map((r) => Number(r.ref.slice(3))));
  const saved: Report = {
    ...report,
    ref: `CW-${highest + 1}`,
    stage: 0,
    note: "Waiting for inspection.",
    neighbours: 0,
  };
  mine = [saved, ...mine];
  try {
    localStorage.setItem(KEY, JSON.stringify(mine));
  } catch {
    /* session-only */
  }
  return saved;
}

export function findReport(ref: string) {
  const want = ref.trim().toUpperCase().replace(/^CW-?/, "CW-");
  return allReports().find((r) => r.ref === want);
}
