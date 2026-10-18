import { days, hours } from "../content";
import { hoursLabel, openStatus } from "../lib/util";

export function OpenNow() {
  const status = openStatus(hours);
  return (
    <p className="open-now" data-open={status.open ? "" : undefined}>
      <span className="open-dot" aria-hidden="true" />
      {status.label}
    </p>
  );
}

/** Monday-first opening hours, today highlighted. */
export function HoursList({ compact = false }: { compact?: boolean }) {
  const today = new Date().getDay();
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <>
      {!compact && <OpenNow />}
      <dl className="hours" data-compact={compact ? "" : undefined}>
        {order.map((d) => (
          <div key={d} data-today={d === today ? "" : undefined}>
            <dt>{compact ? days[d].slice(0, 3) : days[d]}</dt>
            <dd>{hoursLabel(hours[d])}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
