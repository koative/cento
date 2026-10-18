import { pad, remaining, useNow } from "../lib/time";

/** Live split clock to a moment. The visible digits are aria-hidden; screen readers get one stable sentence. */
export function Countdown({
  to,
  label,
  size = "l",
}: {
  to: number;
  label: string;
  size?: "l" | "m";
}) {
  const now = useNow();
  const r = remaining(to - now);
  const units = [
    ["d", "days", r.d],
    ["h", "hrs", r.h],
    ["m", "min", r.m],
    ["s", "sec", r.s],
  ] as const;
  return (
    <div className={"countdown countdown-" + size}>
      <p className="visually-hidden">
        {label}: {r.d} days, {r.h} hours and {r.m} minutes to go.
      </p>
      <div className="countdown-cells" aria-hidden="true">
        {units.map(([k, unit, v]) => (
          <span key={k} className="countdown-cell">
            <b key={v}>{pad(v)}</b>
            <small>{unit}</small>
          </span>
        ))}
      </div>
    </div>
  );
}
