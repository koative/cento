import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";
import { formatPrice } from "../lib/format";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [seats, setSeats] = useState(12);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{pricing.h1}</h1>
          <p className="lede">{pricing.lede}</p>
        </div>
      </section>

      <section className="section pricing">
        <div className="wrap">
          <div className="price-controls">
            <fieldset className="segmented">
              <legend className="sr-only">Billing period</legend>
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
            </fieldset>
            <p className="fine">{pricing.yearlyNote}</p>
            <label className="seats">
              <span>People on the team</span>
              <input
                type="number"
                min={1}
                max={999}
                inputMode="numeric"
                value={seats}
                onChange={(e) =>
                  setSeats(
                    Math.max(1, Math.min(999, Number(e.target.value) || 1)),
                  )
                }
              />
            </label>
          </div>

          <ul className="plans">
            {pricing.plans.map((p) => {
              const each = yearly ? p.yearly : p.monthly;
              const tooBig = p.id === "free" && seats > 10;
              return (
                <li
                  key={p.id}
                  className="plan"
                  data-featured={p.featured ? "" : undefined}
                >
                  <h2>{p.name}</h2>
                  <p className="plan-blurb">{p.blurb}</p>
                  <p className="plan-price">
                    <span className="num">{formatPrice(each)}</span>
                    <span>
                      {each
                        ? `per person / month${yearly ? ", billed yearly" : ""}`
                        : "forever"}
                    </span>
                  </p>
                  <p className="plan-total">
                    {tooBig
                      ? "Free covers up to 10 people."
                      : each
                        ? `${formatPrice(each * seats * (yearly ? 12 : 1))} ${yearly ? "a year" : "a month"} for ${seats} ${seats === 1 ? "person" : "people"}`
                        : `${formatPrice(0)} for ${seats} ${seats === 1 ? "person" : "people"}`}
                  </p>
                  <Link
                    to={p.cta.to}
                    className={p.featured ? "btn btn-primary" : "btn btn-line"}
                  >
                    {p.cta.label}
                  </Link>
                  <ul className="ticks">
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={18} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
          <p className="enterprise">
            More than 1,000 people, or need a signed DPA and invoicing in your
            currency?{" "}
            <Link to="/contact" className="text-link">
              Talk to sales about Enterprise
            </Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Compare plans</h2>
          <div
            className="table-scroll"
            tabIndex={0}
            role="region"
            aria-label="Plan comparison"
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
                    {r.values.map((v, n) => (
                      <td key={n} data-none={v === "—" ? "" : undefined}>
                        {v === "—" ? (
                          <span aria-label="Not included">—</span>
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
        </div>
      </section>

      <section className="section faq-section">
        <div className="wrap faq-grid">
          <h2>Questions people ask before paying</h2>
          <div className="faq">
            {pricing.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
