import { useState } from "react";
import { Search } from "lucide-react";
import {
  episodes,
  genres,
  hosts,
  shows,
  type Genre,
  type Show,
} from "../content";
import { Link } from "../router";
import { date } from "../lib/format";
import { Cover } from "../components/Cover";

const latestOf = (slug: string) => episodes.find((e) => e.show === slug)!;

const sorts = {
  recent: {
    label: "Newest episode",
    fn: (a: Show, b: Show) =>
      latestOf(b.slug).date.localeCompare(latestOf(a.slug).date),
  },
  title: {
    label: "Title A–Z",
    fn: (a: Show, b: Show) => a.title.localeCompare(b.title),
  },
  archive: {
    label: "Largest archive",
    fn: (a: Show, b: Show) => b.archive - a.archive,
  },
};
type Sort = keyof typeof sorts;

export function Shows() {
  const [genre, setGenre] = useState<Genre | "All">("All");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("recent");

  const needle = q.trim().toLowerCase();
  const list = shows
    .filter((s) => genre === "All" || s.genre === genre)
    .filter((s) => {
      if (!needle) return true;
      const names = s.hosts
        .map((h) => hosts.find((x) => x.slug === h)!.name)
        .join(" ");
      return `${s.title} ${s.tagline} ${names} ${s.genre}`
        .toLowerCase()
        .includes(needle);
    })
    .sort(sorts[sort].fn);

  return (
    <>
      <section className="wrap page-head">
        <h1>The shows</h1>
        <p className="lede">
          Six series, each with its own host, editor and rhythm. Pick by
          subject, or search for a host you already like.
        </p>
      </section>

      <section className="wrap" aria-label="Filter shows">
        <div className="filters">
          <div className="chips" role="group" aria-label="Subject">
            {(["All", ...genres] as const).map((g) => (
              <button
                key={g}
                type="button"
                className="chip"
                aria-pressed={genre === g}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="filter-fields">
            <label className="search">
              <Search aria-hidden="true" />
              <span className="sr-only">Search shows</span>
              <input
                type="search"
                placeholder="Search shows or hosts"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </label>
            <label className="select">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length === shows.length
            ? `All ${shows.length} shows`
            : `${list.length} of ${shows.length} shows`}
        </p>

        {list.length ? (
          <ul className="show-grid">
            {list.map((s) => {
              const ep = latestOf(s.slug);
              return (
                <li key={s.slug} className="show-card">
                  <Link
                    to={`/shows/${s.slug}`}
                    className="show-card-cover"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    <Cover show={s} />
                  </Link>
                  <div className="show-card-body">
                    <p className="meta">
                      {s.genre} · {s.cadence}
                    </p>
                    <h2>
                      <Link to={`/shows/${s.slug}`}>{s.title}</Link>
                    </h2>
                    <p>{s.tagline}</p>
                    <p className="show-card-host">
                      Hosted by{" "}
                      {s.hosts
                        .map((h) => hosts.find((x) => x.slug === h)!.name)
                        .join(" & ")}
                    </p>
                    <p className="show-card-latest">
                      Latest: <Link to={`/episodes/${ep.id}`}>{ep.title}</Link>{" "}
                      <span>· {date(ep.date)}</span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No shows match “{q}”{genre !== "All" ? ` in ${genre}` : ""}.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setQ("");
                setGenre("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
