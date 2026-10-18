import { useState } from "react";
import { Check } from "lucide-react";
import { pricing } from "../content";
import { money } from "../lib/format";
import { Link } from "../router";
import { Faq, PageHead } from "../components/Parts";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <div className="page">
      <PageHead title={pricing.hero.title} lede={pricing.hero.lede}>
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
            Yearly <small>up to 40% off</small>
          </button>
        </div>
      </PageHead>

      <section className="plans wrap" aria-label="Plans">
        {pricing.plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <article
              key={p.id}
              className="plan"
              data-featured={p.featured ? "" : undefined}
            >
              <h2>{p.name}</h2>
              <p className="plan-price" aria-live="polite">
                <strong>{money(price)}</strong>
                <span>
                  {price === 0 ? "forever" : yearly ? "per year" : "per month"}
                </span>
              </p>
              <p className="plan-note">
                {price === 0
                  ? "No card, no account."
                  : yearly
                    ? `That's ${money(p.yearly / 12)} a month, billed once a year.`
                    : "Billed monthly. Cancel any time in your store."}
              </p>
              <p className="plan-pitch">{p.pitch}</p>
              <ul className="ticks">
                {p.includes.map((i) => (
                  <li key={i}>
                    <Check size={18} aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link
                to="/download"
                className={p.featured ? "btn btn-primary" : "btn btn-ink"}
              >
                {p.cta}
              </Link>
            </article>
          );
        })}
      </section>

      <section className="compare wrap" aria-labelledby="compare-title">
        <h2 id="compare-title">{pricing.compare.title}</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="compare-title"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only">Feature</span>
                </th>
                {pricing.plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.rows.map(([label, ...cells]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {cells.map((c, i) => (
                    <td key={i}>
                      {c === "—" ? <span aria-label="Not included">—</span> : c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pricing-faq wrap" aria-labelledby="pfaq-title">
        <h2 id="pfaq-title">Questions about paying</h2>
        <Faq items={pricing.faq} />
        <p className="quiet-note">
          Something else? <Link to="/contact">Write to support</Link> and a
          person will answer.
        </p>
      </section>
    </div>
  );
}
