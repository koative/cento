import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  connectors,
  connectorsPage,
  type Category,
  type Connector,
  type Plan,
} from "../content";
import { compact, date } from "../lib/format";
import { Mark } from "../components/bits";

const sorts: Record<
  string,
  { label: string; fn: (a: Connector, b: Connector) => number }
> = {
  popular: { label: "Most installed", fn: (a, b) => b.installs - a.installs },
  name: { label: "Name, A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
  fast: { label: "Fastest p50", fn: (a, b) => a.latency - b.latency },
  recent: {
    label: "Recently updated",
    fn: (a, b) => b.updated.localeCompare(a.updated),
  },
};
type Sort = keyof typeof sorts;
const plans: Plan[] = ["Sandbox", "Team", "Scale"];

export default function Connectors() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "All">("All");
  const [plan, setPlan] = useState<Plan | "Any">("Any");
  const [sort, setSort] = useState<Sort>("popular");

  const q = query.trim().toLowerCase();
  const list = connectors
    .filter((c) => category === "All" || c.category === category)
    .filter(
      (c) => plan === "Any" || plans.indexOf(c.plan) <= plans.indexOf(plan),
    )
    .filter(
      (c) =>
        !q || `${c.name} ${c.summary} ${c.category}`.toLowerCase().includes(q),
    )
    .sort(sorts[sort].fn);

  const reset = () => {
    setQuery("");
    setCategory("All");
    setPlan("Any");
  };

  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>{connectorsPage.heading}</h1>
        <p className="lede">{connectorsPage.lede}</p>
      </header>

      <div className="filters">
        <div className="field search-field">
          <label htmlFor="cx-search">Search connectors</label>
          <span className="input-icon">
            <Search size={17} aria-hidden />
            <input
              id="cx-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Payments, Shelfwise, SFTP…"
            />
          </span>
        </div>
        <div className="field">
          <label htmlFor="cx-plan">Available on</label>
          <select
            id="cx-plan"
            value={plan}
            onChange={(e) => setPlan(e.target.value as Plan | "Any")}
          >
            <option value="Any">Any plan</option>
            {plans.map((p) => (
              <option key={p} value={p}>
                {p} plan
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="cx-sort">Sort by</label>
          <select
            id="cx-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chips" role="group" aria-label="Category">
        {(["All", ...categories] as const).map((c) => (
          <button
            key={c}
            type="button"
            className="chip"
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="result-count" aria-live="polite">
        {list.length} of {connectors.length} connectors
      </p>

      {list.length === 0 ? (
        <div className="empty">
          <p>
            No connector matches “{query}” with these filters. Webhook Inbox can
            receive from any service in the meantime.
          </p>
          <button type="button" className="btn btn-quiet" onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : (
        <ul className="port-list port-list-full">
          {list.map((c) => (
            <li key={c.slug}>
              <Link to={`/connectors/${c.slug}`} className="port-row">
                <Mark connector={c} />
                <span className="port-name">
                  <strong>{c.name}</strong>
                  <span>{c.summary}</span>
                </span>
                <span className="port-meta">
                  {c.category}
                  <span className="muted"> · {c.plan}+</span>
                </span>
                <span className="port-meta tabular">
                  {compact(c.installs)} installs
                  <span className="muted"> · {date(c.updated)}</span>
                </span>
                <span className="port-meta tabular">p50 {c.latency} ms</span>
                <ArrowRight size={18} aria-hidden className="port-arrow" />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <aside className="callout">
        <h2>Need a provider that isn't here?</h2>
        <p>
          Point it at a Webhook Inbox today, or ask for a connector — Scale and
          Enterprise teams get custom connectors built with them.
        </p>
        <Link to="/connectors/webhook-inbox" className="link-arrow">
          Webhook Inbox <ArrowRight size={16} aria-hidden />
        </Link>
      </aside>
    </div>
  );
}
