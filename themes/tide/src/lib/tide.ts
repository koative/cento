/*
 * A single-constituent (M2) tide: good enough to show when a beach is workable,
 * not for navigation. Heights are metres above chart datum.
 */
export const PERIOD = 12.42;

export type TideSite = { range: number; foreshore: number };
export type TideDay = { site: TideSite; highWater: string };

export const toHours = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h + m / 60;
};

export const clock = (hours: number) => {
  const mins = Math.round((((hours % 24) + 24) % 24) * 60);
  return `${String(Math.floor(mins / 60) % 24).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;
};

/** Mean level sits half a range plus 0.3 m above datum so low water never goes negative. */
export const mean = (site: TideSite) => site.range / 2 + 0.3;
export const highMark = (site: TideSite) => mean(site) + site.range / 2;

export function heightAt(day: TideDay, hours: number) {
  const hw = toHours(day.highWater);
  return (
    mean(day.site) +
    (day.site.range / 2) * Math.cos((2 * Math.PI * (hours - hw)) / PERIOD)
  );
}

/** Every high (kind "high") or low water between 00:00 and 24:00. */
export function turns(day: TideDay) {
  const hw = toHours(day.highWater);
  const out: { kind: "high" | "low"; at: number }[] = [];
  for (let k = -2; k <= 4; k++) {
    const high = hw + k * PERIOD;
    const low = high + PERIOD / 2;
    if (high >= 0 && high <= 24) out.push({ kind: "high", at: high });
    if (low >= 0 && low <= 24) out.push({ kind: "low", at: low });
  }
  return out.sort((a, b) => a.at - b.at);
}

/** The daylight low water we work around: 90 minutes before it, an hour after. */
export function workWindow(day: TideDay) {
  const lows = turns(day).filter((t) => t.kind === "low");
  const low = lows.find((t) => t.at >= 8 && t.at <= 16) ?? lows[0];
  return { low: low.at, start: low.at - 1.5, end: low.at + 1 };
}

/** Metres of beach uncovered below the high-water mark at a given height. */
export const exposed = (site: TideSite, height: number) =>
  Math.max(
    0,
    Math.min(
      site.foreshore,
      (site.foreshore * (highMark(site) - height)) / site.range,
    ),
  );

export const rising = (day: TideDay, hours: number) =>
  heightAt(day, hours + 0.05) > heightAt(day, hours);
