import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, Clock, Search } from "lucide-react";
import { Link } from "../router";
import { docs } from "../content";
import { CodeBlock } from "../components/CodeBlock";

export default function Docs() {
  const [tab, setTab] = useState(0);
  const [query, setQuery] = useState("");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const sdk = docs.sdks[tab];
  const q = query.trim().toLowerCase();
  const guides = docs.guides.filter(
    (g) => !q || (g.title + g.text).toLowerCase().includes(q),
  );

  function onKey(e: KeyboardEvent) {
    const n = docs.sdks.length;
    const next =
      e.key === "ArrowRight"
        ? (tab + 1) % n
        : e.key === "ArrowLeft"
          ? (tab - 1 + n) % n
          : null;
    if (next === null) return;
    setTab(next);
    tabs.current[next]?.focus();
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>{docs.heading}</h1>
        <p className="lede">{docs.intro}</p>
      </header>

      <section
        className="wrap section-tight quickstart"
        aria-labelledby="qs-title"
      >
        <h2 id="qs-title" className="section-title">
          Quickstart
        </h2>
        <div
          className="tabs"
          role="tablist"
          aria-label="SDK language"
          onKeyDown={onKey}
        >
          {docs.sdks.map((s, i) => (
            <button
              key={s.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`tab-${s.id}`}
              role="tab"
              type="button"
              aria-selected={tab === i}
              aria-controls={`panel-${s.id}`}
              tabIndex={tab === i ? 0 : -1}
              onClick={() => setTab(i)}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div
          role="tabpanel"
          id={`panel-${sdk.id}`}
          aria-labelledby={`tab-${sdk.id}`}
          className="tab-panel"
        >
          <CodeBlock code={sdk.install} label="Install" />
          <CodeBlock code={sdk.code} label="Track your first event" />
        </div>
      </section>

      <section className="wrap section split">
        <div>
          <h2>{docs.guidesTitle}</h2>
          <p>{docs.guidesText}</p>
          <label className="search">
            <Search size={16} aria-hidden />
            <span className="visually-hidden">Filter guides</span>
            <input
              type="search"
              placeholder="Filter guides"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
        <div>
          <p className="result-count" aria-live="polite">
            {guides.length} of {docs.guides.length} guides
          </p>
          <ul className="guide-list">
            {guides.map((g) => (
              <li key={g.title}>
                <h3>{g.title}</h3>
                <p>{g.text}</p>
                <span className="guide-time">
                  <Clock size={14} aria-hidden /> {g.minutes} min read
                </span>
              </li>
            ))}
          </ul>
          {guides.length === 0 && (
            <p className="empty-state">
              No guide matches “{query}”. Try “funnel”, “identify” or
              “warehouse”.
            </p>
          )}
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">{docs.apiTitle}</h2>
        <div
          className="table-scroll"
          role="region"
          aria-label="API endpoints"
          tabIndex={0}
        >
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Method</th>
                <th scope="col">Endpoint</th>
                <th scope="col">What it does</th>
              </tr>
            </thead>
            <tbody>
              {docs.api.map((a) => (
                <tr key={a.path}>
                  <td>
                    <span className="method" data-method={a.method}>
                      {a.method}
                    </span>
                  </td>
                  <td>
                    <code>{a.path}</code>
                  </td>
                  <td>{a.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section price-teaser">
        <h2>{docs.closeTitle}</h2>
        <div className="actions">
          <Link to="/signin" className="btn btn-primary btn-lg">
            Sign in to read them
          </Link>
          <Link to="/changelog" className="text-link">
            Read the changelog <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
