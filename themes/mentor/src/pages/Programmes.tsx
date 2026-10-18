import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  formats,
  programmes,
  programmesPage,
  stages,
  type Format,
  type Programme,
  type Stage,
} from "../content";
import { money } from "../lib/format";
import { nextStart, upcoming } from "../lib/programmes";
import { Cover } from "../components/Cover";

const sorts: Record<
  string,
  { label: string; by: (a: Programme, b: Programme) => number }
> = {
  soonest: {
    label: "Soonest start",
    // Open-now programmes (no cohort date) first, then by cohort date.
    by: (a, b) =>
      (upcoming(a)[0]?.start ?? "").localeCompare(upcoming(b)[0]?.start ?? ""),
  },
  "price-asc": { label: "Price, low to high", by: (a, b) => a.price - b.price },
  "price-desc": {
    label: "Price, high to low",
    by: (a, b) => b.price - a.price,
  },
  shortest: { label: "Shortest first", by: (a, b) => a.weeks - b.weeks },
};

export function Programmes() {
  const [format, setFormat] = useState<Format | "all">("all");
  const [stage, setStage] = useState<Stage | "all">("all");
  const [sort, setSort] = useState("soonest");

  const list = programmes
    .filter(
      (p) =>
        (format === "all" || p.format === format) &&
        (stage === "all" || p.stages.includes(stage)),
    )
    .sort(sorts[sort].by);

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{programmesPage.title}</h1>
        <p className="lede">{programmesPage.intro}</p>
      </header>

      <div className="wrap filters" role="group" aria-label="Filter programmes">
        <div className="chips" role="group" aria-label="Format">
          {(["all", ...formats] as const).map((f) => (
            <button
              key={f}
              type="button"
              className="chip"
              aria-pressed={format === f}
              onClick={() => setFormat(f)}
            >
              {f === "all" ? "Every format" : f}
            </button>
          ))}
        </div>
        <div className="filter-selects">
          <label>
            <span>Where you are</span>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as Stage | "all")}
            >
              <option value="all">Any stage</option>
              {stages.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(sorts).map(([k, s]) => (
                <option key={k} value={k}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="wrap result-count" aria-live="polite">
        {list.length === 1 ? "1 programme" : `${list.length} programmes`}
      </p>

      {list.length ? (
        <ul className="wrap prog-list">
          {list.map((p) => (
            <li key={p.slug}>
              <Link to={`/programmes/${p.slug}`} className="prog-item">
                <Cover p={p} />
                <span className="prog-body">
                  <span className="prog-name">{p.name}</span>
                  <span className="prog-summary">{p.summary}</span>
                  <span className="prog-facts">
                    <span>{p.length}</span>
                    <span>{p.perWeek}</span>
                    <span>{p.stages.join(", ")}</span>
                  </span>
                </span>
                <span className="prog-side">
                  <span className="prog-price num">
                    {p.priceNote ? "from " : ""}
                    {money(p.price)}
                  </span>
                  {p.plan && (
                    <span className="prog-plan num">
                      or {p.plan.count} × {money(p.plan.amount)}
                    </span>
                  )}
                  <span className="prog-next">{nextStart(p)}</span>
                  <span className="link-arrow" aria-hidden="true">
                    Details <ArrowRight />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="wrap empty">
          <p>
            Nothing matches that combination yet. 1:1 coaching works at every
            stage.
          </p>
          <button
            type="button"
            className="btn btn-line"
            onClick={() => {
              setFormat("all");
              setStage("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}

      <aside className="wrap unsure">
        <h2>Not sure which?</h2>
        <p>
          Apply with “Not sure yet” and I'll recommend one after reading your
          answers. It's the most common choice on the form.
        </p>
        <Link to="/apply" className="btn btn-ink">
          Start an application <ArrowRight aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
