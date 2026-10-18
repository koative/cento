import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react";
import { Link } from "../router";
import { reports, type Report } from "../content";
import { Composition } from "../components/Charts";
import { count, longDate, money } from "../lib/format";

type SortKey = "item" | "count" | "change";

export function ReportPage({ report: r }: { report: Report }) {
  const prev = reports.find((o) => o.year === r.year - 1);
  const next = reports.find((o) => o.year === r.year + 1);
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({
    key: "count",
    desc: true,
  });

  const change = (now: number, before?: number) =>
    before ? Math.round(((now - before) / before) * 100) : null;
  const measures = [
    {
      label: "Debris removed",
      value: `${count(r.kg)} kg`,
      delta: change(r.kg, prev?.kg),
    },
    {
      label: "Volunteers",
      value: count(r.volunteers),
      delta: change(r.volunteers, prev?.volunteers),
    },
    {
      label: "Volunteer hours",
      value: count(r.hours),
      delta: change(r.hours, prev?.hours),
    },
    {
      label: "Events",
      value: count(r.events),
      delta: change(r.events, prev?.events),
    },
    {
      label: "Seagrass planted",
      value: `${count(r.seagrass)} m²`,
      delta: change(r.seagrass, prev?.seagrass),
    },
    {
      label: "Oysters seeded",
      value: count(r.oysters),
      delta: change(r.oysters, prev?.oysters),
    },
    {
      label: "Shore School pupils",
      value: count(r.pupils),
      delta: change(r.pupils, prev?.pupils),
    },
  ];

  const items = r.topItems
    .map((t) => ({
      ...t,
      change: change(
        t.count,
        prev?.topItems.find((p) => p.item === t.item)?.count,
      ),
    }))
    .sort((a, b) => {
      const dir = sort.desc ? -1 : 1;
      if (sort.key === "item") return a.item.localeCompare(b.item) * dir;
      if (sort.key === "change")
        return ((a.change ?? -Infinity) - (b.change ?? -Infinity)) * dir;
      return (a.count - b.count) * dir;
    });
  const most = Math.max(...r.topItems.map((t) => t.count));
  const spent = r.money.spend.reduce((s, x) => s + x.amount, 0);

  const header = (key: SortKey, label: string, numeric = false) => (
    <th
      scope="col"
      aria-sort={
        sort.key === key ? (sort.desc ? "descending" : "ascending") : undefined
      }
      className={numeric ? "num" : undefined}
    >
      <button
        type="button"
        className="sort"
        onClick={() =>
          setSort({ key, desc: sort.key === key ? !sort.desc : key !== "item" })
        }
      >
        {label}
        {sort.key === key &&
          (sort.desc ? (
            <ArrowDown aria-hidden="true" />
          ) : (
            <ArrowUp aria-hidden="true" />
          ))}
      </button>
    </th>
  );

  return (
    <>
      <header className="wrap detail-head">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/impact">Impact reports</Link>
          <span aria-hidden="true">/</span>
          <span className="num">{r.year}</span>
        </nav>
        <h1>
          <span className="num">{r.year}:</span> {r.title}
        </h1>
        <p className="lede">{r.summary}</p>
        <p className="quiet">
          Published {longDate(r.published)} · sample data for a fictional
          charity
        </p>
      </header>

      <section className="wrap section-tight">
        <h2 className="sr-only">The year in numbers</h2>
        <dl className="measures">
          {measures.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd className="num">{m.value}</dd>
              {m.delta !== null && (
                <dd
                  className="delta num"
                  data-down={m.delta < 0 ? "" : undefined}
                >
                  {m.delta > 0 ? "+" : ""}
                  {m.delta}% on {r.year - 1}
                </dd>
              )}
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section prose-grid">
        <div className="prose">
          <h2>From the director</h2>
          {r.letter.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p className="signature">{r.signedBy}</p>
        </div>
        <div>
          <h2>Highlights</h2>
          <ul className="highlights">
            {r.highlights.map((h) => (
              <li key={h.title}>
                <strong>{h.title}</strong>
                <p>{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band-paper2">
        <div className="wrap report-split">
          <div>
            <h2>What the bags held</h2>
            <p>Share of debris by weight across all adopted beaches.</p>
            <Composition report={r} />
          </div>
          <div>
            <h2 id="top-h">Ten most-counted items</h2>
            <p>From the Strandline Survey. Select a column heading to sort.</p>
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-labelledby="top-h"
            >
              <table className="data-table top-items">
                <thead>
                  <tr>
                    {header("item", "Item")}
                    {header("count", "Count", true)}
                    {prev && header("change", `vs ${prev.year}`, true)}
                  </tr>
                </thead>
                <tbody>
                  {items.map((t) => (
                    <tr key={t.item}>
                      <th scope="row">{t.item}</th>
                      <td className="num">
                        <span
                          className="cell-bar"
                          style={{ width: `${(t.count / most) * 100}%` }}
                          aria-hidden="true"
                        />
                        {count(t.count)}
                      </td>
                      {prev && (
                        <td className="num">
                          {t.change === null
                            ? "new"
                            : `${t.change > 0 ? "+" : ""}${t.change}%`}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2>The money</h2>
          <p>
            Income {money(r.money.income)}, spending {money(spent)}.
          </p>
        </div>
        <ul className="money-rows">
          {r.money.spend.map((s) => (
            <li key={s.label}>
              <span>{s.label}</span>
              <span className="money-track" aria-hidden="true">
                <span style={{ width: `${(s.amount / spent) * 100}%` }} />
              </span>
              <strong className="num">{money(s.amount)}</strong>
              <span className="num">
                {Math.round((s.amount / spent) * 100)}%
              </span>
            </li>
          ))}
        </ul>
      </section>

      <nav className="wrap pager" aria-label="Other reports">
        {prev ? (
          <Link to={`/impact/${prev.year}`}>
            <ArrowLeft aria-hidden="true" /> {prev.year}: {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={`/impact/${next.year}`} className="pager-next">
            {next.year}: {next.title} <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <Link to="/donate" className="pager-next">
            Fund next year's report <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </nav>
    </>
  );
}
