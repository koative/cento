import { useState } from "react";
import { Link } from "../router";
import { casesPage, caseStudies, type CaseTag } from "../content";
import { money } from "../lib/energy";
import { PageHead, Photo } from "../components/Bits";

const tags: (CaseTag | "All")[] = [
  "All",
  "Battery",
  "EV charger",
  "Panels only",
];
const total = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

export default function CaseStudies() {
  const [tag, setTag] = useState<CaseTag | "All">("All");
  const [sort, setSort] = useState<"recent" | "saving">("recent");
  const list = caseStudies
    .filter((c) => tag === "All" || c.tags.includes(tag))
    .sort((a, b) =>
      sort === "saving"
        ? total(b.billsBefore) -
          total(b.billsAfter) -
          (total(a.billsBefore) - total(a.billsAfter))
        : Date.parse(`1 ${b.installed}`) - Date.parse(`1 ${a.installed}`),
    );

  return (
    <>
      <PageHead title={casesPage.title} lead={casesPage.intro} />
      <section className="wrap" aria-label="Case study list">
        <div className="filters">
          <div className="chips" role="group" aria-label="Filter by system">
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                className="chip"
                aria-pressed={tag === t}
                onClick={() => setTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="sort">
            <span>Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "recent" | "saving")}
            >
              <option value="recent">Most recent</option>
              <option value="saving">Biggest saving</option>
            </select>
          </label>
        </div>
        <p className="result-count" role="status">
          {list.length} {list.length === 1 ? "home" : "homes"}
        </p>
        <ul className="case-grid">
          {list.map((c) => (
            <li key={c.slug}>
              <Link to={`/case-studies/${c.slug}`} className="case-tile">
                <Photo img={c.image} />
                <strong>{c.title}</strong>
                <span className="case-place">
                  {c.place} · {c.home}
                </span>
                <span className="case-meta num">
                  {c.system.panels} panels · {c.system.kwp} kWp
                  {c.system.batteryKwh
                    ? ` · ${c.system.batteryKwh} kWh battery`
                    : ""}
                </span>
                <span className="case-saving num">
                  {money(total(c.billsBefore) - total(c.billsAfter))} saved in
                  the first year
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
