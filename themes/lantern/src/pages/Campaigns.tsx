import { useState } from "react";
import { Search } from "lucide-react";
import { campaigns, causes, pagesCopy, type CauseId } from "../content";
import { daysUntil } from "../lib/format";
import { gifts, progress, startGift } from "../lib/giving";
import { CampaignCard } from "../components/CampaignCard";

const sorts = {
  closing: "Closing soonest",
  closest: "Closest to goal",
  needed: "Most still needed",
  newest: "Newest first",
} as const;
type Sort = keyof typeof sorts;

export function Campaigns() {
  const [cause, setCause] = useState<CauseId | "all">("all");
  const [sort, setSort] = useState<Sort>("closing");
  const [query, setQuery] = useState("");
  const all = gifts.use();
  const copy = pagesCopy.campaigns;

  const q = query.trim().toLowerCase();
  const shown = campaigns
    .filter((c) => cause === "all" || c.cause === cause)
    .filter(
      (c) =>
        !q ||
        [c.title, c.short, c.neighbourhood, c.partner].some((t) =>
          t.toLowerCase().includes(q),
        ),
    )
    .map((c) => ({ c, p: progress(c, all) }))
    .sort((a, b) => {
      // Funded campaigns always sink to the end: they no longer need anyone.
      if (a.p.funded !== b.p.funded) return a.p.funded ? 1 : -1;
      if (sort === "closest") return b.p.share - a.p.share;
      if (sort === "needed")
        return b.c.goal - b.p.raised - (a.c.goal - a.p.raised);
      if (sort === "newest") return b.c.opened.localeCompare(a.c.opened);
      return daysUntil(a.c.closes) - daysUntil(b.c.closes);
    });

  return (
    <>
      <header className="page-head wrap">
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
      </header>

      <section className="wrap" aria-label="Campaign list">
        <div className="filters">
          <div className="chips" role="group" aria-label="Filter by cause">
            {[{ id: "all" as const, label: "All causes" }, ...causes].map(
              (c) => (
                <button
                  key={c.id}
                  type="button"
                  className="chip"
                  aria-pressed={cause === c.id}
                  onClick={() => setCause(c.id)}
                >
                  {c.label}
                </button>
              ),
            )}
          </div>
          <div className="filter-controls">
            <div className="search">
              <label htmlFor="campaign-search" className="visually-hidden">
                Search campaigns
              </label>
              <Search size={18} aria-hidden="true" />
              <input
                id="campaign-search"
                type="search"
                placeholder="Search by name or neighbourhood"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <label className="sort">
              <span>Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length === 1 ? "1 campaign" : `${shown.length} campaigns`}
        </p>
        {shown.length ? (
          <div className="card-grid">
            {shown.map(({ c }, i) => (
              <CampaignCard key={c.slug} campaign={c} eager={i < 3} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <p>
              Nothing on the board matches “{query}”. Try a neighbourhood, such
              as Riverside or The Flats.
            </p>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                setQuery("");
                setCause("all");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      <section className="section wrap general-fund">
        <h2>{copy.generalTitle}</h2>
        <p>{copy.generalText}</p>
        <button
          type="button"
          className="btn"
          onClick={() => {
            startGift({ campaign: null, amount: 35, monthly: false });
          }}
        >
          Give to the general fund
        </button>
      </section>
    </>
  );
}
