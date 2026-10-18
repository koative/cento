import { seeded } from "../lib/format";

type Props = { seed: number; uptime: number; days?: number; today?: string };

/** Illustrative daily history: one bar per day, oldest left. Incident days scale with the stated uptime; stable per seed. */
export function UptimeBars({
  seed,
  uptime,
  days = 90,
  today = "operational",
}: Props) {
  const rnd = seeded(seed);
  const rate = (100 - uptime) * 0.6;
  const bars = Array.from({ length: days }, (_, i) => {
    const r = rnd();
    if (i === days - 1 && today !== "operational") return "minor";
    return r < rate / 6 ? "major" : r < rate ? "minor" : "ok";
  });
  const incidents = bars.filter((b) => b !== "ok").length;
  return (
    <svg
      className="uptime"
      viewBox={`0 0 ${days * 4} 28`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`${days} days: ${incidents} day${incidents === 1 ? "" : "s"} with incidents`}
    >
      {bars.map((b, i) => (
        <rect key={i} x={i * 4} y={0} width={3} height={28} rx={1} data-day={b}>
          <title>{`${days - i - 1 === 0 ? "Today" : `${days - i - 1} days ago`}: ${b === "ok" ? "no incidents" : b === "minor" ? "minor incident" : "major incident"}`}</title>
        </rect>
      ))}
    </svg>
  );
}
