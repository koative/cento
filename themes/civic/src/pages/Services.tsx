import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { brand, categories, services, type Category } from "../content";
import { findServices } from "../lib/city";
import { PageHead } from "../components/PageHead";

export function Services() {
  const [q, setQ] = useState(
    () =>
      new URLSearchParams(window.location.hash.split("?")[1]).get("q") ?? "",
  );
  const [cat, setCat] = useState<Category | "All">("All");
  const [online, setOnline] = useState(false);

  const list = findServices(q)
    .filter(
      (s) => (cat === "All" || s.category === cat) && (!online || s.online),
    )
    .sort((a, b) => a.name.localeCompare(b.name));
  const letters = [...new Set(list.map((s) => s.name[0].toUpperCase()))];

  function clear() {
    setQ("");
    setCat("All");
    setOnline(false);
  }

  return (
    <>
      <PageHead
        title="Services A–Z"
        lede="Everything the city does for residents and businesses, with fees, timings and the department that handles it."
      />
      <div className="wrap services-layout">
        <div className="filters" role="search" aria-label="Filter services">
          <div className="field">
            <label htmlFor="svc-q">Search services</label>
            <div className="input-icon">
              <Search size={18} aria-hidden="true" />
              <input
                id="svc-q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="e.g. permit, pool, tax"
              />
            </div>
          </div>
          <fieldset className="chip-set">
            <legend>Category</legend>
            {(["All", ...categories] as const).map((c) => (
              <label key={c} className="chip">
                <input
                  type="radio"
                  name="cat"
                  checked={cat === c}
                  onChange={() => setCat(c)}
                />
                {c}
              </label>
            ))}
          </fieldset>
          <label className="check">
            <input
              type="checkbox"
              checked={online}
              onChange={(e) => setOnline(e.target.checked)}
            />
            Can be started online
          </label>
        </div>

        <div>
          <p className="result-count" aria-live="polite">
            {list.length} of {services.length} services
          </p>
          {list.length ? (
            letters.map((l) => (
              <section
                key={l}
                className="letter-group"
                aria-labelledby={`letter-${l}`}
              >
                <h2 id={`letter-${l}`} className="letter plate">
                  {l}
                </h2>
                <ul className="service-rows">
                  {list
                    .filter((s) => s.name[0].toUpperCase() === l)
                    .map((s) => (
                      <li key={s.slug}>
                        <Link
                          to={`/services/${s.slug}`}
                          className="service-row"
                        >
                          <span className="service-row-main">
                            <strong>{s.name}</strong>
                            <span>{s.summary}</span>
                          </span>
                          <span className="service-row-meta">
                            <span>{s.fee}</span>
                            <span>
                              {s.online ? "Online" : "In person or by phone"}
                            </span>
                          </span>
                          <ArrowRight
                            size={20}
                            aria-hidden="true"
                            className="row-go"
                          />
                        </Link>
                      </li>
                    ))}
                </ul>
              </section>
            ))
          ) : (
            <div className="empty">
              <h2>No service matches those filters</h2>
              <p>
                Try a shorter word, clear the filters, or call the service desk
                on <a href={brand.tel}>{brand.phone}</a>.
              </p>
              <button type="button" className="btn btn-ink" onClick={clear}>
                Clear search and filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
