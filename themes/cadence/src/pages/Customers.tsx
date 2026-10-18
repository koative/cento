import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { customersPage, industries, stories } from "../content";

export default function Customers() {
  const [industry, setIndustry] = useState("All");
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = stories.filter(
    (s) =>
      (industry === "All" || s.industry === industry) &&
      (!q ||
        `${s.company} ${s.summary} ${s.location}`.toLowerCase().includes(q)),
  );

  return (
    <>
      <section className="page-hero wrap">
        <h1>{customersPage.hero.title}</h1>
        <p className="lede">{customersPage.hero.lede}</p>
      </section>

      <section className="wrap section-tight" aria-label="Customer stories">
        <div className="toolbar">
          <div className="chips" role="group" aria-label="Filter by industry">
            {["All", ...industries].map((i) => (
              <button
                key={i}
                type="button"
                className="chip"
                aria-pressed={industry === i}
                onClick={() => setIndustry(i)}
              >
                {i}
              </button>
            ))}
          </div>
          <label className="search">
            <Search size={16} aria-hidden />
            <span className="sr-only">Search stories</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by company or city"
            />
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "story" : "stories"}
        </p>

        {shown.length ? (
          <ul className="story-grid">
            {shown.map((s) => (
              <li key={s.slug}>
                <Link to={`/customers/${s.slug}`} className="story-card">
                  <img
                    src={s.image}
                    alt=""
                    width={1400}
                    height={933}
                    loading="lazy"
                  />
                  <span className="story-meta">
                    {s.industry} · {s.size}
                  </span>
                  <strong>{s.headline}</strong>
                  <span className="text-link">
                    Read the story <ArrowRight size={16} aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No stories match “{query}” in{" "}
              {industry === "All" ? "any industry" : industry}.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setQuery("");
                setIndustry("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="close" aria-labelledby="h-close">
        <div className="wrap">
          <h2 id="h-close">{customersPage.close.title}</h2>
          <p>{customersPage.close.body}</p>
          <div className="actions">
            <Link to="/signin" className="btn btn-primary btn-lg">
              Start free
            </Link>
            <Link to="/demo" className="btn btn-light btn-lg">
              Book a walkthrough
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
