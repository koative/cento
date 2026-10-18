import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { customers, stories, type Story } from "../content";

const sizes: (Story["size"] | "All")[] = [
  "All",
  "5–20 reps",
  "21–60 reps",
  "60+ reps",
];

export default function Customers() {
  const [size, setSize] = useState<(typeof sizes)[number]>("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = stories.filter(
    (s) =>
      (size === "All" || s.size === size) &&
      (!q ||
        [s.company, s.industry, s.headline, s.switchedFrom].some((t) =>
          t.toLowerCase().includes(q),
        )),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>{customers.h1}</h1>
        <p className="lede">{customers.lede}</p>
      </header>

      <section className="wrap section-tight" aria-labelledby="h-list">
        <h2 id="h-list" className="sr-only">
          Customer stories
        </h2>
        <div className="toolbar">
          <fieldset className="segmented">
            <legend className="sr-only">Team size</legend>
            {sizes.map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="size"
                  checked={size === s}
                  onChange={() => setSize(s)}
                />
                <span>{s === "All" ? "All sizes" : s}</span>
              </label>
            ))}
          </fieldset>
          <div className="search">
            <Search size={16} aria-hidden />
            <label htmlFor="story-q" className="sr-only">
              Search stories
            </label>
            <input
              id="story-q"
              type="search"
              placeholder="Industry, company or old tool"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <p className="result-count" role="status">
          {list.length} {list.length === 1 ? "story" : "stories"}
        </p>

        {list.length ? (
          <ul className="customer-grid">
            {list.map((s) => (
              <li key={s.slug}>
                <Link to={`/customers/${s.slug}`} className="customer-card">
                  <span className="wordmark">{s.company}</span>
                  <span className="customer-head">{s.headline}</span>
                  <span className="customer-quote">“{s.quote.text}”</span>
                  <span className="customer-meta">
                    {s.industry} · {s.reps} reps · from{" "}
                    {s.switchedFrom.toLowerCase()}
                  </span>
                  <span className="text-link">
                    Read the story <ArrowRight size={16} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>No stories match “{query}” at that team size.</p>
            <button
              className="btn btn-quiet"
              onClick={() => {
                setQuery("");
                setSize("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="wrap close" aria-labelledby="h-close">
        <h2 id="h-close">Want to hear it from a customer directly?</h2>
        <p>
          We'll introduce you to a reference in your industry and team size,
          usually within a week.
        </p>
        <div className="cta-row">
          <Link to="/demo" className="btn btn-primary btn-lg">
            Ask for a reference call
          </Link>
        </div>
      </section>
    </>
  );
}
