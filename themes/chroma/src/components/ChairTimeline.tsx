import { Coffee } from "lucide-react";
import type { Level } from "../content";
import { clock, duration, money, plan } from "../lib/plan";

type Props = {
  ids: string[];
  level: Level;
  /** Appointment start in minutes after midnight; steps show clock times when set. */
  start?: number | null;
  /** "from" when the stylist isn't chosen yet. */
  pricePrefix?: string;
};

/** The appointment laid out minute by minute: chair time solid, development time open. */
export function ChairTimeline({
  ids,
  level,
  start = null,
  pricePrefix = "",
}: Props) {
  const p = plan(ids, level);
  if (!p.steps.length) {
    return (
      <p className="timeline-empty">
        Choose a service and your chair time appears here, step by step.
      </p>
    );
  }
  const when = (offset: number) =>
    start === null
      ? `+${duration(offset).replace(" min", "m").replace(" h", "h")}`
      : clock(start + offset);
  const ticks = Array.from(
    { length: Math.floor(p.minutes / 60) + 1 },
    (_, i) => i * 60,
  ).filter((t) => p.minutes - t > p.minutes * 0.14); // keep clear of the end label

  return (
    <div className="timeline">
      <dl className="timeline-totals">
        <div>
          <dt>Total</dt>
          <dd>{duration(p.minutes)}</dd>
        </div>
        <div>
          <dt>In the chair</dt>
          <dd>{duration(p.chairMinutes)}</dd>
        </div>
        <div>
          <dt>Price</dt>
          <dd>
            {pricePrefix}
            {money(p.price)}
          </dd>
        </div>
      </dl>

      <div className="timeline-bar" aria-hidden="true">
        {p.steps.map((s) => (
          <span
            key={`${s.service}-${s.label}`}
            className="seg"
            data-kind={s.kind}
            style={{ flexGrow: s.min }}
          />
        ))}
      </div>
      <div className="timeline-ticks" aria-hidden="true">
        {ticks.map((t) => (
          <span key={t} style={{ left: `${(t / p.minutes) * 100}%` }}>
            {start === null
              ? `${t / 60}h`
              : clock(start + t).replace(":00", "")}
          </span>
        ))}
        <span className="end">
          {start === null ? duration(p.minutes) : clock(start + p.minutes)}
        </span>
      </div>

      <ol className="timeline-steps">
        {p.steps.map((s) => (
          <li key={`${s.service}-${s.label}`} data-kind={s.kind}>
            <span className="t num">{when(s.start)}</span>
            <span className="what">
              <strong>{s.label}</strong>
              <span>{s.service}</span>
            </span>
            <span className="mins num">
              {s.kind === "wait" && (
                <>
                  <Coffee aria-hidden="true" size={16} />
                  <span className="sr-only">Free to step out, </span>
                </>
              )}
              {s.min} min
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
