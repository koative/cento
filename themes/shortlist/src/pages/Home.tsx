import { useState, type FormEvent } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link, navigate } from "../router";
import {
  categories,
  cities,
  companies,
  home,
  jobs,
  plans,
  salaryRoles,
} from "../content";
import { band, k } from "../lib/format";
import { JobRow } from "../components/JobRow";
import { CompanyMark } from "../components/Marks";

const latest = [...jobs].sort((a, b) => a.posted - b.posted).slice(0, 6);
const teaserRoles = [
  "backend-engineer",
  "product-designer",
  "data-analyst",
  "operations-manager",
  "cabinetmaker",
  "chef",
  "baker",
];
const AXIS: [number, number] = [30000, 190000];
const pos = (v: number) =>
  `${(((v - AXIS[0]) / (AXIS[1] - AXIS[0])) * 100).toFixed(2)}%`;

export function Home() {
  const [q, setQ] = useState("");
  const [where, setWhere] = useState("");

  const search = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (where) params.set("where", where);
    const qs = params.toString();
    navigate(`/jobs${qs ? "?" + qs : ""}`);
  };

  return (
    <>
      <section className="wrap hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <form className="hero-search" role="search" onSubmit={search}>
            <div className="hero-field">
              <label htmlFor="hs-q">What</label>
              <input
                id="hs-q"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Job title, skill or company"
              />
            </div>
            <div className="hero-field">
              <label htmlFor="hs-where">Where</label>
              <select
                id="hs-where"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
              >
                <option value="">Anywhere</option>
                {cities.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-pen" type="submit">
              <Search aria-hidden="true" /> Search jobs
            </button>
          </form>
          <p className="hero-popular">
            Often searched:{" "}
            {categories.slice(0, 5).map((c, i) => (
              <span key={c.id}>
                {i > 0 && ", "}
                <Link to={`/jobs?category=${c.id}`}>
                  {c.label.toLowerCase()}
                </Link>
              </span>
            ))}
          </p>
          <ol className="hero-steps" aria-label="How Shortlist works">
            {home.steps.map((s, i) => (
              <li key={s.title}>
                <span className="hero-step-num num" aria-hidden="true">
                  {i + 1}
                </span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </li>
            ))}
          </ol>
        </div>

        <section className="column hero-column" aria-labelledby="today-h">
          <div className="column-head">
            <h2 id="today-h">Today’s column</h2>
            <Link to="/jobs" className="text-link">
              All {jobs.length} listings
            </Link>
          </div>
          <div className="listing-stack">
            {latest.map((j) => (
              <JobRow key={j.id} job={j} compact />
            ))}
          </div>
        </section>
      </section>

      <section className="wrap section trades" aria-labelledby="trades-h">
        <h2 id="trades-h" className="section-title">
          Browse by trade
        </h2>
        <ul className="trade-index">
          {categories.map((c) => {
            const n = jobs.filter((j) => j.category === c.id).length;
            return (
              <li key={c.id}>
                <Link to={`/jobs?category=${c.id}`}>
                  <span>{c.label}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="num">
                    {n} {n === 1 ? "listing" : "listings"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="rules-band" aria-labelledby="rules-h">
        <div className="wrap rules">
          <h2 id="rules-h" className="rules-title">
            Four house rules, no exceptions
          </h2>
          <dl className="rules-list">
            {home.rules.map((r) => (
              <div key={r.title}>
                <dt>{r.title}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section pay-teaser" aria-labelledby="pay-h">
        <div className="pay-teaser-copy">
          <h2 id="pay-h" className="section-title">
            What the work pays
          </h2>
          <p>
            Mid-level base pay across the US, from the salary guide. The thick
            bar is the middle half of the market; the tick is the median.
          </p>
          <Link to="/salaries" className="btn btn-ghost">
            Check an offer <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="pay-rows" role="list">
          {teaserRoles.map((id) => {
            const role = salaryRoles.find((r) => r.id === id)!;
            const b = band(id, "Remote (US)", "Mid");
            return (
              <div className="pay-row" role="listitem" key={id}>
                <span className="pay-role">{role.label}</span>
                <span className="pay-track" aria-hidden="true">
                  <span
                    className="pay-mid"
                    style={{
                      left: pos(b.p25),
                      width: `calc(${pos(b.p75)} - ${pos(b.p25)})`,
                    }}
                  />
                  <span className="pay-median" style={{ left: pos(b.p50) }} />
                </span>
                <span className="pay-value num">{k(b.p50)}</span>
              </div>
            );
          })}
          <div className="pay-axis" aria-hidden="true">
            {[40000, 80000, 120000, 160000].map((t) => (
              <span key={t} style={{ left: pos(t) }}>
                {k(t)}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap section employers" aria-labelledby="emp-h">
        <div className="section-head">
          <h2 id="emp-h" className="section-title">
            Who’s hiring this week
          </h2>
          <Link to="/companies" className="text-link">
            All {companies.length} companies
          </Link>
        </div>
        <div className="employer-grid">
          {companies.slice(0, 4).map((c, i) => {
            const open = jobs.filter((j) => j.company === c.slug).length;
            return (
              <article
                key={c.slug}
                className={`employer${i === 0 ? " employer-lead" : ""}`}
              >
                <img src={c.image} alt={c.imageAlt} loading="lazy" />
                <div className="employer-body">
                  <CompanyMark company={c} size={36} />
                  <h3>
                    <Link to={`/companies/${c.slug}`}>{c.name}</Link>
                  </h3>
                  <p>{c.tagline}</p>
                  <p className="employer-meta">
                    {open} open {open === 1 ? "role" : "roles"} · replies in
                    about {c.replyDays} working days
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wrap section filled" aria-labelledby="filled-h">
        <h2 id="filled-h" className="section-title">
          Filled and taken down this week
        </h2>
        <table className="filled-table">
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Employer</th>
              <th scope="col" className="num">
                Days to fill
              </th>
            </tr>
          </thead>
          <tbody>
            {home.filled.map((f) => (
              <tr key={f.role}>
                <td>{f.role}</td>
                <td>{f.company}</td>
                <td className="num">{f.days}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section
        className="wrap section quote"
        aria-label="From someone who was hired"
      >
        <figure>
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>
            <strong>{home.quote.by}</strong> · {home.quote.role}
          </figcaption>
        </figure>
      </section>

      <section
        className="wrap section employer-pitch"
        aria-labelledby="hiring-h"
      >
        <div>
          <h2 id="hiring-h" className="section-title">
            {home.employers.title}
          </h2>
          <p>{home.employers.text}</p>
        </div>
        <div className="pitch-price">
          <p>
            <span className="pitch-amount num">${plans[0].single}</span>
            <span>per listing, thirty days</span>
          </p>
          <Link to="/post" className="btn btn-pen">
            Post a job
          </Link>
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <div className="wrap close-inner">
          <h2 id="close-h">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="close-actions">
            <Link to="/jobs" className="btn btn-paper">
              Browse all jobs
            </Link>
            <Link to="/shortlist" className="btn btn-outline-paper">
              Open your shortlist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
