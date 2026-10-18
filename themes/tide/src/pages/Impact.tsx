import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { images, reports } from "../content";
import { YearBars } from "../components/Charts";
import { count, longDate } from "../lib/format";

const rows: { label: string; get: (r: (typeof reports)[number]) => string }[] =
  [
    { label: "Debris removed", get: (r) => `${count(r.kg)} kg` },
    { label: "Volunteers", get: (r) => count(r.volunteers) },
    { label: "Volunteer hours", get: (r) => count(r.hours) },
    { label: "Events", get: (r) => count(r.events) },
    { label: "Seagrass planted", get: (r) => `${count(r.seagrass)} m²` },
    { label: "Oysters seeded", get: (r) => count(r.oysters) },
    { label: "Pupils at Shore School", get: (r) => count(r.pupils) },
  ];

export function Impact() {
  const ordered = [...reports].sort((a, b) => a.year - b.year);
  return (
    <>
      <header className="page-head wrap page-head-split">
        <div>
          <h1>Impact reports</h1>
          <p className="lede">
            Every spring we publish what we did with the year: what came off the
            beaches, what went back into the sea, what it cost, and what did not
            work.
          </p>
        </div>
        <YearBars reports={reports} current={reports[0].year} />
      </header>

      <section className="wrap section-tight">
        <h2>Five years at a glance</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Five years at a glance, scrollable"
        >
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Measure</th>
                {ordered.map((r) => (
                  <th key={r.year} scope="col" className="num">
                    {r.year}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {ordered.map((r) => (
                    <td key={r.year} className="num">
                      {row.get(r)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="quiet">
          All figures on this site are sample data for a fictional charity.
        </p>
      </section>

      <section className="wrap section">
        <h2>The reports</h2>
        <ol className="report-list">
          {reports.map((r) => (
            <li key={r.year}>
              <Link to={`/impact/${r.year}`} className="report-row">
                <span className="report-year num">{r.year}</span>
                <span className="report-main">
                  <strong>{r.title}</strong>
                  <span>{r.summary}</span>
                </span>
                <span className="report-date">
                  Published {longDate(r.published)}
                </span>
                <ArrowRight aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section photo-split photo-split-flip">
        <img
          src={images.sorted.src}
          alt={images.sorted.alt}
          width={images.sorted.w}
          height={images.sorted.h}
          loading="lazy"
        />
        <div>
          <h2>How we count</h2>
          <p>
            Weights come from a hanging scale on the slipway, bag by bag. Item
            counts come from the Strandline Survey: the same 100-metre sections,
            four times a year, in 112 categories that match the national method.
          </p>
          <p>
            Restoration figures are what was planted or laid, not what survived.
            Survival is reported separately, from the spring surveys, because
            the two numbers tell different stories.
          </p>
        </div>
      </section>
    </>
  );
}
