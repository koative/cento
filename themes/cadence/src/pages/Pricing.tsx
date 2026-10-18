import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <>
      <section className="page-hero wrap">
        <h1>{pricing.hero.title}</h1>
        <p className="lede">{pricing.hero.lede}</p>
        <fieldset className="segmented billing">
          <legend className="sr-only">Billing period</legend>
          <div>
            <label>
              <input
                type="radio"
                name="billing"
                checked={!yearly}
                onChange={() => setYearly(false)}
              />
              <span>Monthly</span>
            </label>
            <label>
              <input
                type="radio"
                name="billing"
                checked={yearly}
                onChange={() => setYearly(true)}
              />
              <span>Yearly, save 20%</span>
            </label>
          </div>
        </fieldset>
      </section>

      <section className="wrap plans" aria-label="Plans">
        {pricing.plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <article
              key={p.id}
              className="plan"
              data-featured={p.id === pricing.featured ? "" : undefined}
            >
              <h2>{p.name}</h2>
              <p className="plan-roles">{p.roles}</p>
              <p className="plan-price">
                <span className="num">${price}</span>
                <span>
                  {price
                    ? yearly
                      ? "per month, billed yearly"
                      : "per month"
                    : "forever"}
                </span>
              </p>
              <p>{p.blurb}</p>
              <ul className="ticks">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link
                to={p.cta.to}
                className={
                  p.id === pricing.featured
                    ? "btn btn-primary"
                    : "btn btn-quiet"
                }
              >
                {p.cta.label}
              </Link>
            </article>
          );
        })}
      </section>
      <p className="wrap quiet-note plans-note" aria-live="polite">
        {yearly
          ? "Showing yearly prices: billed once a year, in US dollars, before tax."
          : "Showing monthly prices: billed each month, in US dollars, before tax."}
      </p>

      <section className="wrap section" aria-labelledby="h-compare">
        <h2 id="h-compare">Compare plans</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="h-compare"
        >
          <table className="compare">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {pricing.compare.columns.map((c) => (
                  <th key={c} scope="col">
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
                      {v === true ? (
                        <>
                          <Check size={18} aria-hidden />
                          <span className="sr-only">Included</span>
                        </>
                      ) : v === false ? (
                        <>
                          <Minus size={18} aria-hidden className="muted" />
                          <span className="sr-only">Not included</span>
                        </>
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section faq" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions about pricing</h2>
        <div>
          {pricing.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="close" aria-labelledby="h-close">
        <div className="wrap">
          <h2 id="h-close">{pricing.close.title}</h2>
          <p>{pricing.close.body}</p>
          <div className="actions">
            <Link to="/demo" className="btn btn-primary btn-lg">
              Book a walkthrough
            </Link>
            <a
              href={`mailto:${pricing.close.email}`}
              className="btn btn-light btn-lg"
            >
              {pricing.close.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
