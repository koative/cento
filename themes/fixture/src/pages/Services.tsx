import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { Link } from "../router";
import { rates, services, trades, type Trade } from "../content";
import { fromPrice } from "../lib/estimate";
import { hashParam, money } from "../lib/format";
import { TradeTag } from "../components/TradeTag";

const sorts = {
  trade: { label: "By trade", fn: () => 0 },
  low: { label: "Price, low to high", fn: (a: number, b: number) => a - b },
  high: { label: "Price, high to low", fn: (a: number, b: number) => b - a },
};

export function Services() {
  const [trade, setTrade] = useState<Trade | "all">(() => {
    const t = hashParam("trade");
    return t === "plumbing" || t === "electrical" ? t : "all";
  });
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<keyof typeof sorts>("trade");

  const q = query.trim().toLowerCase();
  const list = services
    .filter((s) => trade === "all" || s.trade === trade)
    .filter(
      (s) =>
        !q ||
        `${s.name} ${s.short} ${s.signs.join(" ")}`.toLowerCase().includes(q),
    )
    .map((s) => ({ s, from: fromPrice(s) }))
    .sort((a, b) => sorts[sort].fn(a.from, b.from));

  return (
    <>
      <section className="page-head wrap">
        <h1>Services</h1>
        <p className="lede">
          Ten jobs we do every week, priced from the same rate card. Not sure
          which one you need? Book a diagnosis visit — the{" "}
          {money(rates.callOut)} call-out is waived when we do the work.
        </p>
      </section>

      <section className="wrap catalogue" aria-label="Service list">
        <div className="toolbar">
          <div className="segmented" role="group" aria-label="Trade">
            {(["all", "plumbing", "electrical"] as const).map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={trade === t}
                onClick={() => setTrade(t)}
              >
                {t === "all" ? "All" : trades[t].label}
              </button>
            ))}
          </div>
          <div className="search">
            <Search aria-hidden="true" />
            <label htmlFor="svc-search" className="sr-only">
              Search services
            </label>
            <input
              id="svc-search"
              type="search"
              placeholder="Search: leak, breaker, no hot water…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="sort">
            <label htmlFor="svc-sort">Sort</label>
            <select
              id="svc-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            >
              {Object.entries(sorts).map(([id, s]) => (
                <option key={id} value={id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="count" aria-live="polite">
          {list.length} {list.length === 1 ? "service" : "services"}
          {q && ` matching “${query.trim()}”`}
        </p>

        {list.length ? (
          <ul className="service-list">
            {list.map(({ s, from }) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="service-row">
                  <img
                    src={s.image}
                    alt=""
                    width={240}
                    height={180}
                    loading="lazy"
                  />
                  <div className="service-row-body">
                    <TradeTag trade={s.trade} />
                    <h2>{s.name}</h2>
                    <p>{s.short}</p>
                  </div>
                  <dl className="service-row-facts">
                    <div>
                      <dt>From</dt>
                      <dd>{money(from)}</dd>
                    </div>
                    <div>
                      <dt>Typical time</dt>
                      <dd>{s.duration}</dd>
                    </div>
                  </dl>
                  <ArrowRight
                    aria-hidden="true"
                    className="service-row-arrow"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              Nothing on our list matches “{query.trim()}”. Describe it in a
              booking and we'll diagnose it on site.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn btn-ink"
                onClick={() => (setQuery(""), setTrade("all"))}
              >
                Clear search
              </button>
              <Link to="/book" className="btn btn-live">
                Book a diagnosis visit
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
