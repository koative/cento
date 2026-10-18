import { useMemo, useState } from "react";
import { LayoutGrid, List, Search } from "lucide-react";
import { Link } from "../router";
import { cases, services, workPage, type ServiceId } from "../content";
import { Cover } from "../components/Art";
import { CaseCard, disciplineList } from "../components/CaseCard";

type Sort = "newest" | "oldest" | "az";

export function Work() {
  const [filter, setFilter] = useState<ServiceId | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("newest");
  const [view, setView] = useState<"grid" | "index">("grid");
  const [hover, setHover] = useState(cases[0].slug);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases
      .filter((c) => filter === "all" || c.disciplines.includes(filter))
      .filter(
        (c) =>
          !q ||
          [c.client, c.sector, c.summary, c.location]
            .join(" ")
            .toLowerCase()
            .includes(q),
      )
      .sort((a, b) =>
        sort === "az"
          ? a.client.localeCompare(b.client)
          : sort === "newest"
            ? b.year - a.year
            : a.year - b.year,
      );
  }, [filter, query, sort]);

  const preview = list.find((c) => c.slug === hover) ?? list[0];
  const reset = () => {
    setFilter("all");
    setQuery("");
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>{workPage.title}</h1>
        <p className="lede">{workPage.intro}</p>
      </section>

      <section
        className="wrap work-tools"
        aria-label="Filter and sort projects"
      >
        <div className="chips" role="group" aria-label="Discipline">
          <button
            type="button"
            className="chip"
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            Everything <span className="tabular">{cases.length}</span>
          </button>
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              className="chip"
              aria-pressed={filter === s.id}
              onClick={() => setFilter(s.id)}
            >
              {s.short}{" "}
              <span className="tabular">
                {cases.filter((c) => c.disciplines.includes(s.id)).length}
              </span>
            </button>
          ))}
        </div>
        <div className="work-row">
          <label className="search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by client, sector or city"
            />
          </label>
          <label className="select-inline">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="az">Client A–Z</option>
            </select>
          </label>
          <div className="view-toggle" role="group" aria-label="View">
            <button
              type="button"
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <LayoutGrid aria-hidden="true" /> Grid
            </button>
            <button
              type="button"
              aria-pressed={view === "index"}
              onClick={() => setView("index")}
            >
              <List aria-hidden="true" /> Index
            </button>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length === cases.length
            ? `All ${cases.length} projects`
            : `${list.length} of ${cases.length} projects`}
        </p>
      </section>

      <section className="wrap work-results" aria-label="Projects">
        {!list.length ? (
          <div className="empty">
            <h2>Nothing on the wall for that.</h2>
            <p>
              No project matches “{query}”
              {filter !== "all" && " in this discipline"}. Try a city or a
              sector, like “ferry” or “Chicago”.
            </p>
            <button type="button" className="btn btn-ink" onClick={reset}>
              Clear filters
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="work-grid">
            {list.map((c) => (
              <CaseCard key={c.slug} c={c} headingLevel={2} />
            ))}
          </div>
        ) : (
          <div className="work-index">
            <table>
              <thead>
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">Sector</th>
                  <th scope="col">Disciplines</th>
                  <th scope="col" className="num">
                    Year
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr
                    key={c.slug}
                    data-active={preview?.slug === c.slug ? "" : undefined}
                    onMouseEnter={() => setHover(c.slug)}
                  >
                    <th scope="row">
                      <Link
                        to={`/work/${c.slug}`}
                        onFocus={() => setHover(c.slug)}
                      >
                        {c.client}
                      </Link>
                    </th>
                    <td>{c.sector}</td>
                    <td>{disciplineList(c)}</td>
                    <td className="num tabular">{c.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {preview && (
              <div className="index-preview" aria-hidden="true">
                <Cover c={preview} key={preview.slug} />
                <p>{preview.summary}</p>
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
}
