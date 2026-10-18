import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { useCases, useCasesPage } from "../content";
import { Markup } from "../components/TrackedChanges";

const docTypes = [...new Set(useCases.flatMap((u) => u.docTypes))];

export default function UseCases() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useCases.filter(
    (u) =>
      (!type || u.docTypes.includes(type)) &&
      (!q ||
        [u.team, u.heading, u.summary, ...u.docTypes].some((s) =>
          s.toLowerCase().includes(q),
        )),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{useCasesPage.heading}</h1>
        <p className="lede">{useCasesPage.lede}</p>
      </header>

      <div className="wrap filter-bar">
        <div className="search-field">
          <label htmlFor="uc-search">{useCasesPage.searchLabel}</label>
          <div className="input-icon">
            <Search size={17} aria-hidden />
            <input
              id="uc-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Team or document"
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="uc-type">Document type</label>
          <select
            id="uc-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">All documents</option>
            {docTypes.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>
        <p className="filter-count num" aria-live="polite">
          {shown.length} of {useCases.length} use cases
        </p>
      </div>

      <div
        className="wrap uc-grid"
        data-all={shown.length === useCases.length ? "" : undefined}
      >
        {shown.length === 0 && <p className="empty">{useCasesPage.empty}</p>}
        {shown.map((u) => (
          <article key={u.slug} className="uc-card">
            <h2>
              <Link to={`/use-cases/${u.slug}`}>{u.team}</Link>
            </h2>
            <p className="uc-heading">{u.heading}</p>
            <p>{u.summary}</p>
            <p className="uc-sample">
              <Markup
                before={u.before.split(". ")[0]}
                after={u.after.split(". ")[0]}
              />
            </p>
            <p className="uc-meta">
              {u.docTypes.join(" · ")}
              <ArrowRight size={16} aria-hidden />
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
