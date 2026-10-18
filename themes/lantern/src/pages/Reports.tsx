import { useState, type KeyboardEvent } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Link } from "../router";
import { brand, causeLabel, pagesCopy, policies, reports } from "../content";
import { formatDate, money } from "../lib/format";
import { DollarSplit } from "../components/DollarSplit";

type SortKey = "date" | "amount";

export function Reports() {
  const copy = pagesCopy.reports;
  const [index, setIndex] = useState(0);
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({
    key: "date",
    desc: true,
  });
  const report = reports[index];
  const income = report.income.reduce((s, x) => s + x.amount, 0);
  const spend = report.spend.reduce((s, x) => s + x.amount, 0);
  const grantsTotal = report.byCause.reduce((s, x) => s + x.amount, 0);
  const largest = Math.max(...report.byCause.map((c) => c.amount));
  const grants = [...report.grants].sort((a, b) => {
    const d =
      sort.key === "date" ? a.date.localeCompare(b.date) : a.amount - b.amount;
    return sort.desc ? -d : d;
  });

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>) {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = (index + step + reports.length) % reports.length;
    setIndex(next);
    document.getElementById(`tab-${reports[next].year}`)?.focus();
  }

  // A render helper, not a component: a nested component would remount and drop focus on every sort.
  function sortHeader(k: SortKey, label: string, className?: string) {
    const active = sort.key === k;
    return (
      <th
        scope="col"
        className={className}
        aria-sort={active ? (sort.desc ? "descending" : "ascending") : "none"}
      >
        <button
          type="button"
          className="sort-button"
          onClick={() =>
            setSort((s) => ({ key: k, desc: s.key === k ? !s.desc : true }))
          }
        >
          {label}
          {active &&
            (sort.desc ? (
              <ArrowDown size={14} aria-hidden="true" />
            ) : (
              <ArrowUp size={14} aria-hidden="true" />
            ))}
        </button>
      </th>
    );
  }

  return (
    <>
      <header className="page-head wrap">
        <h1>{copy.title}</h1>
        <p>{copy.text}</p>
      </header>

      <section className="wrap" aria-label="Annual figures">
        <div className="tabs" role="tablist" aria-label="Report year">
          {reports.map((r, i) => (
            <button
              key={r.year}
              id={`tab-${r.year}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="year-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => setIndex(i)}
              onKeyDown={onTabKey}
            >
              {r.year}
            </button>
          ))}
        </div>

        <div
          id="year-panel"
          role="tabpanel"
          aria-labelledby={`tab-${report.year}`}
          className="year-panel"
        >
          <div className="year-summary">
            <h2>
              {report.year}: {money(income)} in, {money(spend)} out
            </h2>
            <ul className="highlights">
              {report.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="report-grid">
            <section>
              <h3>Each dollar spent</h3>
              <DollarSplit report={report} />
            </section>
            <section>
              <h3>Where the money came from</h3>
              <table className="mini-table">
                <tbody>
                  {report.income.map((x) => (
                    <tr key={x.label}>
                      <th scope="row">{x.label}</th>
                      <td className="num">{money(x.amount)}</td>
                      <td className="num quiet-cell">
                        {Math.round((x.amount / income) * 100)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          <section className="cause-chart">
            <h3>Grants by cause, {money(grantsTotal)}</h3>
            <ul>
              {report.byCause.map((c) => (
                <li key={c.cause}>
                  <span className="cause-name">{causeLabel(c.cause)}</span>
                  <span className="cause-track" aria-hidden="true">
                    <span style={{ width: `${(c.amount / largest) * 100}%` }} />
                  </span>
                  <span className="num">{money(c.amount)}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3>Largest grants</h3>
            <div className="table-scroll">
              <table className="ledger">
                <caption className="visually-hidden">
                  Largest grants in {report.year}, sortable by date or amount
                </caption>
                <thead>
                  <tr>
                    {sortHeader("date", "Date")}
                    <th scope="col">To</th>
                    <th scope="col">Cause</th>
                    {sortHeader("amount", "Amount", "num")}
                  </tr>
                </thead>
                <tbody>
                  {grants.map((g) => (
                    <tr key={g.date + g.to}>
                      <td className="nowrap">
                        {formatDate(g.date, {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td>{g.to}</td>
                      <td className="nowrap">{causeLabel(g.cause)}</td>
                      <td className="num">{money(g.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="quiet">{report.auditor}</p>
          </section>
        </div>
      </section>

      <section className="section wrap">
        <h2>{copy.policiesTitle}</h2>
        <dl className="policies">
          {policies.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap report-close">
        <h2>{copy.askTitle}</h2>
        <p>{copy.askText}</p>
        <div className="btn-row">
          <a
            className="btn"
            href={`mailto:${brand.email}?subject=Printed%20annual%20report`}
          >
            Ask for a printed copy
          </a>
          <Link to="/events/annual-meeting" className="btn btn-ghost">
            Come to the annual meeting
          </Link>
        </div>
      </section>
    </>
  );
}
