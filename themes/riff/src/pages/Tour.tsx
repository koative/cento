import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { brand, principles, shows, type Region } from "../content";
import { toDate } from "../lib/format";
import { ShowRow } from "../components/Cards";

const regions: ("All" | Region)[] = ["All", "North America", "UK & Europe"];

export function Tour() {
  const [region, setRegion] = useState<(typeof regions)[number]>("All");
  const [query, setQuery] = useState("");
  const [played, setPlayed] = useState(false);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return shows.filter(
      (s) =>
        (played || !s.setlist) &&
        (region === "All" || s.region === region) &&
        (!q ||
          `${s.city} ${s.country} ${s.venue} ${s.support}`
            .toLowerCase()
            .includes(q)),
    );
  }, [region, query, played]);

  const months = useMemo(() => {
    const groups: { month: string; items: typeof list }[] = [];
    for (const s of list) {
      const month = toDate(s.date).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
      if (groups.at(-1)?.month !== month) groups.push({ month, items: [] });
      groups.at(-1)!.items.push(s);
    }
    return groups;
  }, [list]);

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display-xl">Tour dates</h1>
        <p className="lede">
          The Low Ceiling tour, October through December 2026. Tickets are sold
          here at face value; every order includes a dollar for the Small Rooms
          Fund.
        </p>
      </header>

      <section className="wrap" aria-label="Find a show">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Region">
            {regions.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={region === r}
                onClick={() => setRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <label className="search">
            <Search aria-hidden="true" />
            <span className="sr-only">Search city or venue</span>
            <input
              type="search"
              placeholder="City or venue"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={played}
              onChange={(e) => setPlayed(e.target.checked)}
            />
            Show played dates & setlists
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} {list.length === 1 ? "show" : "shows"}
        </p>

        {months.map((g) => (
          <div key={g.month} className="month">
            <h2 className="month-head">{g.month}</h2>
            <ul className="ledger">
              {g.items.map((s) => (
                <ShowRow key={s.id} show={s} />
              ))}
            </ul>
          </div>
        ))}
        {!list.length && (
          <div className="empty">
            <p>
              No dates match “{query}” yet. Join the mailing list at the bottom
              of the page and you'll hear first when we add more.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setQuery("");
                setRegion("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="section wrap principles" aria-labelledby="how">
        <h2 id="how" className="display-md">
          How we tour
        </h2>
        <dl>
          {principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
        <p className="quiet">
          Want us in your town? Promoters and venues can reach our agents at{" "}
          <a href="mailto:booking@riff.example">booking@riff.example</a>.
          Everything else: <a href={`mailto:${brand.email}`}>{brand.email}</a>.
        </p>
      </section>
    </>
  );
}
