import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { audiences, services, type Audience } from "../content";

export function Services() {
  const [audience, setAudience] = useState<"All" | Audience>("All");
  const [q, setQ] = useState("");
  const term = q.trim().toLowerCase();
  const shown = services.filter(
    (s) =>
      (audience === "All" || s.audience === audience) &&
      (!term ||
        [s.name, s.short, ...s.includes].some((t) =>
          t.toLowerCase().includes(term),
        )),
  );

  return (
    <>
      <header className="page-head">
        <h1>Services</h1>
        <p className="lede">
          Everything a family practice should do, under one roof and one record.
          If you can’t see what you need, call us — the answer is usually yes.
        </p>
      </header>

      <div className="filters" role="search">
        <div className="seg" role="radiogroup" aria-label="Who is it for">
          {audiences.map((a) => (
            <label key={a} className="seg-item">
              <input
                type="radio"
                name="audience"
                checked={audience === a}
                onChange={() => setAudience(a)}
              />
              {a === "All" ? "All services" : a === "Everyone" ? "All ages" : a}
            </label>
          ))}
        </div>
        <div className="search">
          <Search size={18} aria-hidden="true" />
          <label htmlFor="service-search" className="visually-hidden">
            Search services
          </label>
          <input
            id="service-search"
            type="search"
            placeholder="Search — asthma, flu, pregnancy…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>
      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "service" : "services"}
      </p>

      {shown.length ? (
        <ul className="service-rows">
          {shown.map((s) => (
            <li key={s.slug}>
              <img
                src={s.image}
                alt=""
                loading="lazy"
                width={480}
                height={320}
              />
              <div className="sr-body">
                <h2>
                  <Link to={`/services/${s.slug}`}>{s.name}</Link>
                </h2>
                <p>{s.short}</p>
                <ul className="sr-tags">
                  {s.includes.slice(0, 3).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              <dl className="sr-facts">
                <div>
                  <dt>Length</dt>
                  <dd>{s.minutes} min</dd>
                </div>
                <div>
                  <dt>For</dt>
                  <dd>{s.ages}</dd>
                </div>
                <div>
                  <dt>Self-pay</dt>
                  <dd>${s.selfPay}</dd>
                </div>
              </dl>
              <ArrowRight className="sr-arrow" size={22} aria-hidden="true" />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>
            Nothing matches “{q}”. Try a broader word, or call us — we offer
            more than fits on one page.
          </p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => {
              setQ("");
              setAudience("All");
            }}
          >
            Clear search
          </button>
        </div>
      )}
    </>
  );
}
