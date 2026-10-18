import { useState } from "react";
import { companies, jobs } from "../content";
import { Link } from "../router";
import { CompanyMark } from "../components/Marks";

type Sort = "open" | "reply" | "name";
const industries = [...new Set(companies.map((c) => c.industry))].sort();
const openRoles = (slug: string) =>
  jobs.filter((j) => j.company === slug).length;

export function Companies() {
  const [industry, setIndustry] = useState("");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("open");

  const list = companies
    .filter(
      (c) =>
        (!industry || c.industry === industry) &&
        `${c.name} ${c.tagline}`.toLowerCase().includes(q.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : sort === "reply"
          ? a.replyDays - b.replyDays
          : openRoles(b.slug) - openRoles(a.slug),
    );

  return (
    <div className="wrap page">
      <div className="page-head">
        <h1>Companies hiring</h1>
        <p className="lede">
          Every employer here has signed up to the house rules: a salary on
          every listing and a reply to every applicant. Their reply time is
          checked, not just promised.
        </p>
      </div>

      <div className="toolbar">
        <div className="chips" role="group" aria-label="Industry">
          <button
            type="button"
            aria-pressed={!industry}
            onClick={() => setIndustry("")}
          >
            All industries
          </button>
          {industries.map((i) => (
            <button
              key={i}
              type="button"
              aria-pressed={industry === i}
              onClick={() => setIndustry(industry === i ? "" : i)}
            >
              {i}
            </button>
          ))}
        </div>
        <div className="toolbar-right">
          <label className="inline-field">
            <span>Search</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Company name"
            />
          </label>
          <label className="sort">
            <span>Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="open">Most open roles</option>
              <option value="reply">Fastest replies</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </div>

      <p className="results-count" aria-live="polite">
        {list.length} {list.length === 1 ? "company" : "companies"}
      </p>

      {list.length ? (
        <div className="company-grid">
          {list.map((c) => {
            const open = openRoles(c.slug);
            return (
              <article key={c.slug} className="company-tile">
                <img src={c.image} alt={c.imageAlt} loading="lazy" />
                <div className="company-tile-body">
                  <div className="company-tile-head">
                    <CompanyMark company={c} size={36} />
                    <h2>
                      <Link to={`/companies/${c.slug}`}>{c.name}</Link>
                    </h2>
                  </div>
                  <p>{c.tagline}</p>
                  <dl className="mini-facts">
                    <div>
                      <dt>Open roles</dt>
                      <dd className="num">{open}</dd>
                    </div>
                    <div>
                      <dt>Replies in</dt>
                      <dd className="num">{c.replyDays} days</dd>
                    </div>
                    <div>
                      <dt>Based in</dt>
                      <dd>{c.hq}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty">
          <p>
            No company by that name yet. Try a shorter search or another
            industry.
          </p>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setQ("");
              setIndustry("");
            }}
          >
            Show all companies
          </button>
        </div>
      )}
    </div>
  );
}
