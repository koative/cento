import { useState } from "react";
import { cases, industries, services, workPage } from "../content";
import { CaseCard } from "../components/CaseCard";
import { CloseBand } from "../components/CloseBand";

type Sort = "recent" | "lift" | "client";

export function Work() {
  const [service, setService] = useState("all");
  const [industry, setIndustry] = useState("all");
  const [sort, setSort] = useState<Sort>("recent");

  const shown = cases
    .filter(
      (c) =>
        (service === "all" || c.services.includes(service)) &&
        (industry === "all" || c.industry === industry),
    )
    .sort((a, b) =>
      sort === "lift"
        ? b.lift - a.lift
        : sort === "client"
          ? a.client.localeCompare(b.client)
          : b.year - a.year,
    );

  const reset = () => {
    setService("all");
    setIndustry("all");
  };

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <h1>{workPage.h1}</h1>
          <p className="lede">{workPage.lede}</p>
        </div>
      </header>

      <section className="section-tight" aria-label="Filter case studies">
        <div className="wrap filters">
          <div className="chips" role="group" aria-label="Service">
            <button
              type="button"
              aria-pressed={service === "all"}
              onClick={() => setService("all")}
            >
              All services
            </button>
            {services.map((s) => (
              <button
                key={s.slug}
                type="button"
                aria-pressed={service === s.slug}
                onClick={() => setService(s.slug)}
              >
                {s.name}
              </button>
            ))}
          </div>
          <div className="filter-selects">
            <label>
              <span>Industry</span>
              <select
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              >
                <option value="all">All industries</option>
                {industries.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                <option value="recent">Most recent</option>
                <option value="lift">Biggest headline lift</option>
                <option value="client">Client A–Z</option>
              </select>
            </label>
          </div>
          <p className="result-count" aria-live="polite">
            {shown.length} of {cases.length} case studies
          </p>
        </div>
      </section>

      <section className="section-tight flush-top" aria-label="Case studies">
        <div className="wrap">
          {shown.length ? (
            <div className="case-grid">
              {shown.map((c, i) => (
                <CaseCard key={c.slug} c={c} lazy={i > 2} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                No case study matches that pair yet. Most programs combine two
                or three services, so try a broader filter.
              </p>
              <button type="button" className="btn btn-line" onClick={reset}>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <CloseBand title="Want your numbers on this page next year?" />
    </>
  );
}
