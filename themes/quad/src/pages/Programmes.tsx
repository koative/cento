import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "../router";
import { faculties, programmes, type FacultyId } from "../content";
import { ProgrammeRow } from "../components/ProgrammeRow";

type Sort = "az" | "entry" | "length";

const sorters: Record<
  Sort,
  (a: (typeof programmes)[number], b: (typeof programmes)[number]) => number
> = {
  az: (a, b) => a.title.localeCompare(b.title),
  entry: (a, b) => a.entryRank - b.entryRank || a.title.localeCompare(b.title),
  length: (a, b) => a.years - b.years || a.title.localeCompare(b.title),
};

/** Home's search box hands over ?q= and ?level= in the hash. */
function initial() {
  const query = new URLSearchParams(window.location.hash.split("?")[1] ?? "");
  return { q: query.get("q") ?? "", level: query.get("level") ?? "all" };
}

export function Programmes() {
  const start = useMemo(initial, []);
  const [q, setQ] = useState(start.q);
  const [level, setLevel] = useState(start.level);
  const [faculty, setFaculty] = useState<FacultyId | "all">("all");
  const [partTime, setPartTime] = useState(false);
  const [sort, setSort] = useState<Sort>("az");

  const needle = q.trim().toLowerCase();
  const results = programmes
    .filter((p) => level === "all" || p.level === level)
    .filter((p) => faculty === "all" || p.faculty === faculty)
    .filter((p) => !partTime || p.modes.includes("Part-time"))
    .filter(
      (p) =>
        !needle ||
        [
          p.title,
          p.award,
          p.code,
          p.summary,
          ...p.plan.flatMap((y) => y.modules.map((m) => m.title)),
        ].some((t) => t.toLowerCase().includes(needle)),
    )
    .sort(sorters[sort]);

  const clear = () => {
    setQ("");
    setLevel("all");
    setFaculty("all");
    setPartTime(false);
  };

  return (
    <>
      <header className="page-head wrap">
        <h1>Programme finder</h1>
        <p className="lead">
          {programmes.length} degrees for September 2027, from three-year
          bachelor's programmes to one-year master's. Search titles and every
          module we teach.
        </p>
      </header>

      <div className="wrap finder">
        <form
          className="finder-controls"
          role="search"
          aria-label="Filter programmes"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="field finder-search">
            <label htmlFor="pf-q">Search</label>
            <div className="input-icon">
              <Search aria-hidden="true" />
              <input
                id="pf-q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Try ‘robotics’ or ‘medieval’"
              />
            </div>
          </div>

          <fieldset className="segmented">
            <legend>Level</legend>
            {["all", "Undergraduate", "Postgraduate"].map((l) => (
              <label key={l}>
                <input
                  type="radio"
                  name="level"
                  value={l}
                  checked={level === l}
                  onChange={() => setLevel(l)}
                />
                <span>{l === "all" ? "All" : l}</span>
              </label>
            ))}
          </fieldset>

          <div className="field">
            <label htmlFor="pf-faculty">Faculty</label>
            <select
              id="pf-faculty"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value as FacultyId | "all")}
            >
              <option value="all">All faculties</option>
              {faculties.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <label className="check">
            <input
              type="checkbox"
              checked={partTime}
              onChange={(e) => setPartTime(e.target.checked)}
            />
            <span>Part-time available</span>
          </label>

          <div className="field">
            <label htmlFor="pf-sort">Sort by</label>
            <select
              id="pf-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="az">Title, A–Z</option>
              <option value="entry">Highest entry grades first</option>
              <option value="length">Shortest first</option>
            </select>
          </div>
        </form>

        <section className="finder-results" aria-labelledby="results-h">
          <h2 id="results-h" className="results-count" aria-live="polite">
            {results.length === 1
              ? "1 programme"
              : `${results.length} programmes`}
            {needle && <span> matching “{q.trim()}”</span>}
          </h2>
          {results.length ? (
            <ul className="catalogue">
              {results.map((p) => (
                <ProgrammeRow key={p.id} p={p} />
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>
                No programme matches all of those filters. Widen the search, or
                talk to Admissions about joint honours.
              </p>
              <button type="button" className="btn btn-outline" onClick={clear}>
                Clear all filters
              </button>
            </div>
          )}
          <p className="finder-aside">
            Still deciding?{" "}
            <Link to="/events/autumn-open-day">
              Come to the open day on 7 November
            </Link>{" "}
            or read <Link to="/admissions">how admissions works</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
