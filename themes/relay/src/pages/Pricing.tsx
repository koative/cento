import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";
import { Faq } from "../components/Faq";
import { eur } from "../lib/format";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{pricing.h1}</h1>
          <p className="lede">{pricing.lead}</p>
          <fieldset className="billing">
            <legend className="sr-only">Billing period</legend>
            <div className="segmented">
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
                <span>Yearly</span>
              </label>
            </div>
            <p className="muted small">{pricing.yearlyNote}</p>
          </fieldset>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap plans">
          {pricing.plans.map((p) => {
            const perMonth =
              p.monthly === null
                ? null
                : yearly
                  ? Math.round((p.monthly * 10) / 12)
                  : p.monthly;
            return (
              <article
                key={p.name}
                className={`plan ${p.featured ? "is-featured" : ""}`}
              >
                <h2>{p.name}</h2>
                <p className="plan-blurb">{p.blurb}</p>
                <p className="plan-price">
                  {perMonth === null ? (
                    <span className="num">Custom</span>
                  ) : (
                    <>
                      <span className="num">{eur(perMonth)}</span>
                      <small>
                        per month
                        {yearly && perMonth > 0
                          ? `, ${eur(perMonth * 12)} billed yearly`
                          : ""}
                      </small>
                    </>
                  )}
                </p>
                <p className="plan-users num">{p.users}</p>
                <ul className="ticks">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  to={p.to}
                  className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}
                >
                  {p.cta}
                </Link>
              </article>
            );
          })}
        </div>
        <p className="wrap muted small plans-note">
          Prices exclude VAT. Freight is charged per shipment at the quoted rate
          on every plan.
        </p>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Compare plans</h2>
          <div className="table-scroll">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {pricing.plans.map((p) => (
                    <th key={p.name} scope="col">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricing.compare.map(([label, ...cells]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    {cells.map((c, i) => (
                      <td key={i}>
                        {c === "Yes" ? (
                          <>
                            <Check size={16} aria-hidden />{" "}
                            <span className="sr-only">Included</span>
                          </>
                        ) : c === "—" ? (
                          <span className="muted" aria-label="Not included">
                            —
                          </span>
                        ) : (
                          c
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section section-sunk">
        <div className="wrap split">
          <h2>Billing questions</h2>
          <Faq items={pricing.faqs} />
        </div>
      </section>
    </>
  );
}
