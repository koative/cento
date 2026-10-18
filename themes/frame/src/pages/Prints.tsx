import { useState } from "react";
import { findFrame, printFacts, prints, series } from "../content";
import { PrintCard } from "../components/PrintCard";

const sorts = {
  featured: { label: "Studio order", fn: () => 0 },
  low: {
    label: "Price, low to high",
    fn: (a: (typeof prints)[number], b: (typeof prints)[number]) =>
      a.prices.s - b.prices.s,
  },
  high: {
    label: "Price, high to low",
    fn: (a: (typeof prints)[number], b: (typeof prints)[number]) =>
      b.prices.s - a.prices.s,
  },
  scarce: {
    label: "Fewest left",
    fn: (a: (typeof prints)[number], b: (typeof prints)[number]) =>
      a.edition - a.sold - (b.edition - b.sold),
  },
};
type SortId = keyof typeof sorts;

export function Prints() {
  const [from, setFrom] = useState("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [hideSold, setHideSold] = useState(false);
  const shown = prints
    .filter((p) => from === "all" || findFrame(p.frameId)!.series.slug === from)
    .filter((p) => !hideSold || p.sold < p.edition)
    .sort(sorts[sort].fn);

  return (
    <div className="page">
      <header className="page-head">
        <h1>Prints</h1>
        <p className="lede">
          Eight photographs from the series, each in one numbered edition shared
          across three sizes. Signed on the back, shipped flat or rolled from
          the studio.
        </p>
      </header>

      <div className="toolbar shop-toolbar">
        <div className="select-field">
          <label htmlFor="print-series">Series</label>
          <select
            id="print-series"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="all">All series</option>
            {series.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
        <div className="select-field">
          <label htmlFor="print-sort">Sort</label>
          <select
            id="print-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortId)}
          >
            {Object.entries(sorts).map(([id, s]) => (
              <option key={id} value={id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={hideSold}
            onChange={(e) => setHideSold(e.target.checked)}
          />
          Hide complete editions
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "print" : "prints"}
      </p>

      {shown.length ? (
        <div className="print-grid print-grid-wide">
          {shown.map((p) => (
            <PrintCard key={p.id} print={p} />
          ))}
        </div>
      ) : (
        <p className="empty">
          No prints from this series yet.{" "}
          <button
            type="button"
            className="text-button"
            onClick={() => (setFrom("all"), setHideSold(false))}
          >
            Show every print
          </button>
        </p>
      )}

      <section className="section" aria-labelledby="h-facts">
        <h2 id="h-facts">How the prints are made</h2>
        <dl className="fact-rows">
          {printFacts.map((f) => (
            <div key={f.term}>
              <dt>{f.term}</dt>
              <dd>{f.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
