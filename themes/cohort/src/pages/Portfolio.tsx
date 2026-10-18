import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { companies, domains, type DomainId } from "../content";
import { Tombstone } from "../components/Tombstone";
import { Ledger } from "../components/Ledger";

type Sort = "class" | "name";
type View = "record" | "ledger";

export function Portfolio() {
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [status, setStatus] = useState<"all" | "Active" | "Acquired">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("class");
  const [view, setView] = useState<View>("record");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return companies
      .filter((c) => domain === "all" || c.domain === domain)
      .filter((c) => status === "all" || c.status === status)
      .filter(
        (c) =>
          !q ||
          `${c.name} ${c.line} ${c.hq} ${c.founders.join(" ")}`
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) =>
        sort === "name"
          ? a.name.localeCompare(b.name)
          : b.classOf - a.classOf || a.name.localeCompare(b.name),
      );
  }, [domain, status, query, sort]);

  const classes = [...new Set(shown.map((c) => c.classOf))];
  const reset = () => {
    setDomain("all");
    setStatus("all");
    setQuery("");
  };

  return (
    <div className="page wrap">
      <header className="page-head">
        <h1>Portfolio</h1>
        <p className="lede">
          Companies we have backed, by the year we wrote the first check. We
          call each year's group a class; this year's is still open.
        </p>
      </header>

      <div className="filters" role="search">
        <div className="search">
          <Search aria-hidden="true" />
          <label htmlFor="portfolio-q" className="sr-only">
            Search companies
          </label>
          <input
            id="portfolio-q"
            type="search"
            placeholder="Search by company, founder or city"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="chips" role="group" aria-label="Domain">
          <button
            type="button"
            aria-pressed={domain === "all"}
            onClick={() => setDomain("all")}
          >
            All domains
          </button>
          {domains.map((d) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={domain === d.id}
              onClick={() => setDomain(d.id)}
            >
              {d.name}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label>
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as typeof status)}
            >
              <option value="all">Active and acquired</option>
              <option value="Active">Active</option>
              <option value="Acquired">Acquired</option>
            </select>
          </label>
          <label>
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="class">Newest class first</option>
              <option value="name">A to Z</option>
            </select>
          </label>
          <div className="view-toggle" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed={view === "record"}
              onClick={() => setView("record")}
            >
              Tombstones
            </button>
            <button
              type="button"
              aria-pressed={view === "ledger"}
              onClick={() => setView("ledger")}
            >
              Ledger
            </button>
          </div>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "company" : "companies"}
      </p>

      {shown.length === 0 ? (
        <div className="empty">
          <p>
            No company matches that search. We may simply not have met them yet.
          </p>
          <button type="button" className="btn btn-line" onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : view === "ledger" ? (
        <Ledger
          companies={shown}
          caption="Portfolio companies matching the filters"
        />
      ) : sort === "class" ? (
        classes.map((year) => (
          <section key={year} className="class-group">
            <h2 className="class-title">Class of {year}</h2>
            <div className="tomb-grid">
              {shown
                .filter((c) => c.classOf === year)
                .map((c) => (
                  <Tombstone key={c.slug} company={c} />
                ))}
            </div>
          </section>
        ))
      ) : (
        <div className="tomb-grid">
          {shown.map((c) => (
            <Tombstone key={c.slug} company={c} headingLevel="h2" />
          ))}
        </div>
      )}
    </div>
  );
}
