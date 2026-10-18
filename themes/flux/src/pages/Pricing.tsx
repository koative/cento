import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [perDay, setPerDay] = useState(120);
  const monthlyRuns = perDay * 30;
  const fit =
    pricing.plans.find((p) => p.runs >= monthlyRuns) ??
    pricing.plans[pricing.plans.length - 1];
  const over = Math.max(0, monthlyRuns - fit.runs);

  return (
    <>
      <header className="page-head wrap">
        <h1>{pricing.heading}</h1>
        <p className="lede">{pricing.lede}</p>
        <div className="billing" role="group" aria-label="Billing period">
          <button
            type="button"
            aria-pressed={!yearly}
            onClick={() => setYearly(false)}
          >
            Monthly
          </button>
          <button
            type="button"
            aria-pressed={yearly}
            onClick={() => setYearly(true)}
          >
            Yearly <span>save about 17%</span>
          </button>
        </div>
      </header>

      <section className="wrap plans" aria-label="Plans">
        {pricing.plans.map((p) => (
          <article
            key={p.id}
            className="plan"
            data-highlight={p.id === "team" ? "" : undefined}
          >
            <h2>{p.name}</h2>
            <p className="plan-blurb">{p.blurb}</p>
            <p className="plan-price">
              <span className="num">${yearly ? p.yearly : p.monthly}</span>
              <small>
                {p.monthly
                  ? `per month, billed ${yearly ? "yearly" : "monthly"}`
                  : "free for good"}
              </small>
            </p>
            <Link
              to={p.id === "business" ? "/contact" : "/signin"}
              className={p.id === "team" ? "btn btn-plum" : "btn btn-line"}
            >
              {p.cta}
            </Link>
            <ul className="tick-list">
              {p.features.map((f) => (
                <li key={f}>
                  <Check size={16} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </article>
        ))}
        <p className="plans-note">
          {pricing.extraRuns} Need more than 50,000 runs, a custom contract or
          invoicing? <Link to="/contact">Talk to sales</Link>.
        </p>
      </section>

      <section className="band wrap estimator" aria-labelledby="est-h">
        <div>
          <h2 id="est-h">{pricing.estimatorTitle}</h2>
          <p>{pricing.estimatorText}</p>
        </div>
        <div className="estimator-panel">
          <label htmlFor="per-day">
            Trigger events per day
            <output htmlFor="per-day" className="num">
              {perDay.toLocaleString("en-US")}
            </output>
          </label>
          <input
            id="per-day"
            type="range"
            min={5}
            max={2500}
            step={5}
            value={perDay}
            onChange={(e) => setPerDay(Number(e.target.value))}
          />
          <p className="estimate" aria-live="polite">
            About{" "}
            <strong className="num">
              {monthlyRuns.toLocaleString("en-US")}
            </strong>{" "}
            runs a month fits <strong>{fit.name}</strong>
            {over > 0
              ? `, plus about $${Math.ceil(over / 5000) * 8} in extra runs.`
              : "."}
          </p>
        </div>
      </section>

      <section className="band wrap" aria-labelledby="compare-h">
        <h2 id="compare-h">Compare plans</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="compare-h"
        >
          <table className="data-table compare">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {pricing.plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={i} className="num">
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Pricing questions</h2>
        <div>
          {pricing.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
