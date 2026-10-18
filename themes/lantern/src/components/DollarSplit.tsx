import type { YearReport } from "../content";
import { money } from "../lib/format";

/** One dollar, split the way the year's spending was split. */
export function DollarSplit({ report }: { report: YearReport }) {
  const total = report.spend.reduce((s, x) => s + x.amount, 0);
  return (
    <figure className="dollar">
      <div
        className="dollar-bar"
        role="img"
        aria-label={report.spend
          .map(
            (s) =>
              `${Math.round((s.amount / total) * 100)} cents ${s.label.toLowerCase()}`,
          )
          .join(", ")}
      >
        {report.spend.map((s, i) => (
          <span key={s.label} data-part={i} style={{ flexGrow: s.amount }} />
        ))}
      </div>
      <figcaption>
        <dl className="dollar-key">
          {report.spend.map((s, i) => (
            <div key={s.label} data-part={i}>
              <dt>{s.label}</dt>
              <dd>
                <strong>{Math.round((s.amount / total) * 100)}¢</strong>{" "}
                {money(s.amount)}
              </dd>
            </div>
          ))}
        </dl>
      </figcaption>
    </figure>
  );
}
