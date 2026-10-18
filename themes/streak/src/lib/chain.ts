/** 0 = no tick, 1 = done, 2 = grace day. */
export type Mark = 0 | 1 | 2;

/** How a day reads on the calendar once the grace rule has been applied. */
export type DayState = "done" | "grace" | "spent" | "missed" | "open";

export const GRACE_WINDOW = 7;

/**
 * Walks the days in order (last entry = today) and applies the app's rules:
 * a tick adds to the chain, a grace day bridges one miss without adding,
 * a second grace day inside seven days counts as a miss, and an unticked
 * today is "open" rather than broken.
 */
export function analyse(marks: Mark[]) {
  const states: DayState[] = [];
  let run = 0;
  let longest = 0;
  let lastGrace = -Infinity;
  marks.forEach((m, i) => {
    const today = i === marks.length - 1;
    if (m === 1) {
      run += 1;
      states.push("done");
    } else if (m === 2 && i - lastGrace >= GRACE_WINDOW) {
      lastGrace = i;
      states.push("grace");
    } else if (m === 2) {
      run = 0;
      states.push("spent");
    } else if (today) {
      states.push("open");
    } else {
      run = 0;
      states.push("missed");
    }
    longest = Math.max(longest, run);
  });
  const graceFreeIn = Math.max(
    0,
    GRACE_WINDOW - (marks.length - 1 - lastGrace),
  );
  return {
    states,
    current: run,
    longest,
    graceFreeIn,
    todayOpen: states.at(-1) === "open",
  };
}

export const inChain = (s: DayState | undefined) =>
  s === "done" || s === "grace";
