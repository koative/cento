import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <header className="page-head wrap">
        <h1>{pricing.heading}</h1>
        <p className="lede">{pricing.lede}</p>
        <div
          className="billing-toggle"
          role="group"
          aria-label="Billing period"
        >
          <button aria-pressed={!yearly} onClick={() => setYearly(false)}>
            Monthly
          </button>
          <button aria-pressed={yearly} onClick={() => setYearly(true)}>
            Yearly <small>save up to 28%</small>
          </button>
        </div>
      </header>

      <section className="wrap plans" aria-label="Plans">
        {pricing.plans.map((p) => {
          const price = yearly ? p.yearly / 12 : p.monthly;
          return (
            <article
              key={p.id}
              className="plan"
              data-featured={p.featured ? "" : undefined}
              aria-labelledby={`plan-${p.id}`}
            >
              <h2 id={`plan-${p.id}`}>{p.name}</h2>
              <p className="plan-who">{p.who}</p>
              <p className="plan-price">
                <strong className="num">
                  ${price % 1 ? price.toFixed(2) : price}
                </strong>
                <span>/ month</span>
              </p>
              <p className="plan-bill num" aria-live="polite">
                {p.monthly === 0
                  ? "Free, no card needed"
                  : yearly
                    ? `$${p.yearly} billed once a year`
                    : `$${p.monthly} billed monthly`}
              </p>
              <ul className="plan-features">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={16} aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to={`/signup?plan=${p.id}`}
                className={p.featured ? "btn btn-primary" : "btn btn-quiet"}
              >
                {p.cta}
              </Link>
            </article>
          );
        })}
      </section>

      <section className="wrap compare" aria-labelledby="compare-h">
        <h2 id="compare-h">Plan by plan</h2>
        <div className="table-scroll">
          <table className="ledger-table">
            <thead>
              <tr>
                <th scope="col">Included</th>
                {pricing.compare.columns.map((c) => (
                  <th scope="col" key={c}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Billing questions</h2>
        {pricing.faq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
