import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { crafts, talent } from "../content";
import { hashParams, money } from "../lib/util";
import { TalentRow } from "../components/Talent";

const sorts = {
  recommended: "Recommended",
  "rate-asc": "Day rate, low to high",
  "rate-desc": "Day rate, high to low",
  rating: "Highest rated",
  since: "Longest on the register",
} as const;
type Sort = keyof typeof sorts;

const maxRate = Math.ceil(Math.max(...talent.map((t) => t.rate)) / 50) * 50;
const minRate = Math.floor(Math.min(...talent.map((t) => t.rate)) / 50) * 50;

export function TalentList() {
  const params = hashParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [craft, setCraft] = useState(params.get("craft") ?? "all");
  const [onlyNow, setOnlyNow] = useState(false);
  const [cap, setCap] = useState(maxRate);
  const [sort, setSort] = useState<Sort>("recommended");

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const list = talent.filter((t) => {
      const craftName = crafts.find((c) => c.slug === t.craft)?.name ?? "";
      const haystack = [t.name, t.title, t.location, craftName, ...t.skills]
        .join(" ")
        .toLowerCase();
      return (
        (craft === "all" || t.craft === craft) &&
        (!onlyNow || t.availability === "now") &&
        t.rate <= cap &&
        words.every((w) => haystack.includes(w))
      );
    });
    const by: Record<
      Sort,
      (a: (typeof talent)[number], b: (typeof talent)[number]) => number
    > = {
      recommended: (a, b) =>
        Number(a.availability === "booked") -
          Number(b.availability === "booked") || b.reviews - a.reviews,
      "rate-asc": (a, b) => a.rate - b.rate,
      "rate-desc": (a, b) => b.rate - a.rate,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
      since: (a, b) => a.since - b.since || a.register - b.register,
    };
    return [...list].sort(by[sort]);
  }, [q, craft, onlyNow, cap, sort]);

  const reset = () => {
    setQ("");
    setCraft("all");
    setOnlyNow(false);
    setCap(maxRate);
  };

  return (
    <>
      <section className="page-head wrap">
        <h1>Browse the register</h1>
        <p className="lede">
          {talent.length} members shown in this demo, each vouched for by two
          others. Day rates are published and the same for every client.
        </p>
      </section>

      <div className="wrap browse">
        <aside className="filters" aria-label="Filter members">
          <div className="field">
            <label htmlFor="tq">Search</label>
            <div className="input-icon">
              <Search aria-hidden="true" />
              <input
                id="tq"
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Skill, name or city"
              />
            </div>
          </div>

          <fieldset className="field">
            <legend>Craft</legend>
            <div className="chips">
              {[{ slug: "all", name: "All crafts" }, ...crafts].map((c) => (
                <label key={c.slug} className="chip">
                  <input
                    type="radio"
                    name="craft"
                    value={c.slug}
                    checked={craft === c.slug}
                    onChange={() => setCraft(c.slug)}
                  />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="field">
            <label htmlFor="cap">
              Day rate up to <strong className="num">{money(cap)}</strong>
            </label>
            <input
              id="cap"
              type="range"
              min={minRate}
              max={maxRate}
              step={50}
              value={cap}
              onChange={(e) => setCap(Number(e.target.value))}
            />
          </div>

          <label className="check">
            <input
              type="checkbox"
              checked={onlyNow}
              onChange={(e) => setOnlyNow(e.target.checked)}
            />
            Available now only
          </label>
        </aside>

        <section className="results" aria-labelledby="results-h">
          <div className="results-bar">
            <h2 id="results-h" aria-live="polite">
              {results.length} {results.length === 1 ? "member" : "members"}
            </h2>
            <div className="sort">
              <label htmlFor="sort">Sort</label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {Object.entries(sorts).map(([k, label]) => (
                  <option key={k} value={k}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {results.length ? (
            <div className="t-rows">
              {results.map((t) => (
                <TalentRow key={t.id} t={t} />
              ))}
            </div>
          ) : (
            <div className="empty">
              <p>
                Nobody on the register matches all of that. Widen the day rate,
                pick another craft, or search a single skill such as “Figma”.
              </p>
              <button type="button" className="btn btn-line" onClick={reset}>
                Clear filters
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
