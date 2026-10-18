import { useState, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import { capabilities, industries, industriesPage } from "../content";
import { capabilityBySlug, personById } from "../lib/format";
import { Link } from "../router";

const total = (work: Record<string, number>) =>
  Object.values(work).reduce((a, b) => a + b, 0);

export function Industries() {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const max = Math.max(...industries.flatMap((i) => Object.values(i.work)));
  const rows = sortBy
    ? [...industries].sort((a, b) => b.work[sortBy] - a.work[sortBy])
    : industries;

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{industriesPage.title}</h1>
        <p className="lede">{industriesPage.lede}</p>
      </header>

      <section
        className="wrap section-tight"
        aria-label="Engagements by industry"
      >
        <figure className="exhibit heat">
          <figcaption>
            <span className="exhibit-n">Exhibit 1</span>
            <span className="exhibit-title">{industriesPage.exhibitTitle}</span>
          </figcaption>
          <div
            className="heat-scroll"
            tabIndex={0}
            role="region"
            aria-label="Engagement grid, scrollable"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Industry</th>
                  {capabilities.map((c) => (
                    <th
                      key={c.slug}
                      scope="col"
                      aria-sort={sortBy === c.slug ? "descending" : undefined}
                    >
                      <button
                        type="button"
                        className="heat-sort"
                        aria-pressed={sortBy === c.slug}
                        onClick={() =>
                          setSortBy(sortBy === c.slug ? null : c.slug)
                        }
                      >
                        {c.name}
                        <ArrowDown aria-hidden="true" />
                      </button>
                    </th>
                  ))}
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((i) => (
                  <tr key={i.slug}>
                    <th scope="row">{i.name}</th>
                    {capabilities.map((c) => {
                      const n = i.work[c.slug] ?? 0;
                      return (
                        <td
                          key={c.slug}
                          className="num"
                          data-strong={n / max > 0.55 ? "" : undefined}
                          data-col={sortBy === c.slug ? "" : undefined}
                          style={
                            {
                              "--heat": `${Math.round((n / max) * 100)}%`,
                            } as CSSProperties
                          }
                        >
                          {n || "–"}
                        </td>
                      );
                    })}
                    <td className="num heat-total">{total(i.work)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="exhibit-source">
            Source: {industriesPage.exhibitSource} Select a capability to sort
            the industries by it.
          </p>
        </figure>
      </section>

      {industries.map((i) => {
        const partner = personById(i.partner);
        const top = Object.entries(i.work)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 2)
          .map(([slug]) => capabilityBySlug(slug))
          .filter((c) => c !== undefined);
        return (
          <section
            key={i.slug}
            className="wrap industry"
            aria-labelledby={`ind-${i.slug}`}
          >
            <div>
              <h2 className="h2" id={`ind-${i.slug}`}>
                {i.name}
              </h2>
              <p>{i.summary}</p>
              <p className="muted">{i.note}</p>
            </div>
            <div>
              <h3 className="h4">On the agenda this year</h3>
              <ul className="ruled-list">
                {i.agenda.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <dl className="spec">
              <div>
                <dt>Industry lead</dt>
                <dd>
                  {partner?.name}, {partner?.office}
                </dd>
              </div>
              <div>
                <dt>Most of our work</dt>
                <dd>
                  {top.map((c, n) => (
                    <span key={c.slug}>
                      {n > 0 && " and "}
                      <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt>Engagements, last three years</dt>
                <dd className="num">{total(i.work)}</dd>
              </div>
            </dl>
          </section>
        );
      })}

      <section className="wrap section">
        <div className="split">
          <h2 className="h2">Not on the list? Ask anyway.</h2>
          <div>
            <p>
              We take work outside these six industries when the problem is one
              we know well — pricing in software, say, or a network redesign for
              a food distributor. If we are not the right firm, we will tell you
              who is.
            </p>
            <Link to="/contact" className="btn btn-primary">
              Describe your problem
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
