import type { Report } from "../content";
import { count } from "../lib/format";
import { Link } from "../router";

/** What the bags held: one bar split by share, with a legend that doubles as the data table. */
export function Composition({ report }: { report: Report }) {
  return (
    <figure className="composition">
      <div className="composition-bar" aria-hidden="true">
        {report.composition.map((c, i) => (
          <span
            key={c.category}
            style={{ flexGrow: c.share, background: `var(--cat-${i + 1})` }}
          />
        ))}
      </div>
      <figcaption className="sr-only">
        Share of debris by weight, {report.year}
      </figcaption>
      <ul className="composition-legend">
        {report.composition.map((c, i) => (
          <li key={c.category}>
            <span
              className="swatch"
              style={{ background: `var(--cat-${i + 1})` }}
              aria-hidden="true"
            />
            <span>{c.category}</span>
            <strong className="num">{c.share}%</strong>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** Kilograms removed per year, newest highlighted; each bar links to its report. */
export function YearBars({
  reports,
  current,
}: {
  reports: Report[];
  current?: number;
}) {
  const max = Math.max(...reports.map((r) => r.kg));
  const ordered = [...reports].sort((a, b) => a.year - b.year);
  return (
    <ol className="year-bars" aria-label="Kilograms of debris removed per year">
      {ordered.map((r) => (
        <li key={r.year} data-current={r.year === current ? "" : undefined}>
          <Link
            to={`/impact/${r.year}`}
            aria-label={`${r.year}: ${count(r.kg)} kilograms. Read the ${r.year} report`}
          >
            <span className="year-bar-value num">{count(r.kg)} kg</span>
            <span
              className="year-bar"
              style={{ height: `${(r.kg / max) * 100}%` }}
            />
            <span className="year-bar-year num">{r.year}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
