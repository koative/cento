import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { capabilities, materialsFilter, type Capability } from "../content";
import { Link } from "../router";

const sorts: Record<
  string,
  { label: string; fn: (a: Capability, b: Capability) => number }
> = {
  default: { label: "Shop order", fn: () => 0 },
  tolerance: {
    label: "Tightest tolerance first",
    fn: (a, b) => (a.tolMm ?? 9) - (b.tolMm ?? 9),
  },
  name: { label: "Name, A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export function Capabilities() {
  const [material, setMaterial] = useState<string | null>(null);
  const [sort, setSort] = useState("default");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();

  const list = capabilities
    .filter((c) => !material || c.materials.includes(material))
    .filter(
      (c) =>
        !q ||
        [
          c.name,
          c.short,
          c.intro,
          ...c.examples,
          ...c.materials,
          ...c.machines.map((m) => m.name),
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
    )
    .sort(sorts[sort].fn);

  return (
    <>
      <header className="page-head wrap">
        <h1>Capabilities</h1>
        <p className="lede">
          Seven processes, 41 machinists and every machine listed with what it
          can hold. Filter by the material you need, or search for a part you
          already make.
        </p>
      </header>

      <section className="wrap" aria-label="Process list">
        <div className="toolbar">
          <div className="search">
            <Search aria-hidden="true" />
            <label className="sr-only" htmlFor="cap-search">
              Search processes
            </label>
            <input
              id="cap-search"
              type="search"
              placeholder="Search: spline, titanium, manifold…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="chips" role="group" aria-label="Filter by material">
            <button
              type="button"
              className="chip"
              aria-pressed={material === null}
              onClick={() => setMaterial(null)}
            >
              All materials
            </button>
            {materialsFilter.map((m) => (
              <button
                key={m}
                type="button"
                className="chip"
                aria-pressed={material === m}
                onClick={() => setMaterial(material === m ? null : m)}
              >
                {m}
              </button>
            ))}
          </div>
          <div className="sort">
            <label htmlFor="cap-sort">Sort</label>
            <select
              id="cap-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {list.length} of {capabilities.length} processes
          {material ? ` handle ${material.toLowerCase()}` : ""}
          {q ? ` matching “${query.trim()}”` : ""}
        </p>

        {list.length ? (
          <ul className="cap-list">
            {list.map((c) => (
              <li key={c.slug} className="cap-row">
                <img
                  src={c.image.src}
                  alt=""
                  width={c.image.w}
                  height={c.image.h}
                  loading="lazy"
                />
                <div className="cap-row-body">
                  <h2>
                    <Link to={`/capabilities/${c.slug}`}>{c.name}</Link>
                  </h2>
                  <p>{c.short}</p>
                  <p className="tags">{c.materials.join(" · ")}</p>
                </div>
                <dl className="cap-row-specs">
                  <div>
                    <dt>Envelope</dt>
                    <dd>{c.envelopeLabel}</dd>
                  </div>
                  <div>
                    <dt>Holds</dt>
                    <dd>{c.tolerance}</dd>
                  </div>
                  <div>
                    <dt>Lead time</dt>
                    <dd>{c.lead}</dd>
                  </div>
                </dl>
                <ArrowRight aria-hidden="true" className="cap-row-arrow" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No process matches that combination. Clear the search, or send the
              drawing anyway: if we cannot make it, we will tell you who can.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setMaterial(null);
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="close wrap" aria-labelledby="cap-close">
        <h2 id="cap-close">Not sure which process fits?</h2>
        <p>
          Send the drawing without choosing. Our estimators route every part to
          the cheapest process that holds the print, and explain why in the
          quote.
        </p>
        <div className="actions">
          <Link to="/rfq" className="btn btn-primary">
            Request a quote <ArrowRight aria-hidden="true" />
          </Link>
          <Link to="/configurator" className="btn btn-ghost">
            Try the configurator
          </Link>
        </div>
      </section>
    </>
  );
}
