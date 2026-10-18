import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";
import { num } from "../lib/text";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [seats, setSeats] = useState(String(pricing.seats.initial));
  const team = pricing.plans.find((p) => p.id === "team");
  const seatPrice = (yearly ? team?.yearly : team?.monthly) ?? 0;
  const validSeats = Math.min(
    pricing.seats.max,
    Math.max(pricing.seats.min, Math.round(Number(seats)) || pricing.seats.min),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{pricing.heading}</h1>
        <p className="lede">{pricing.lede}</p>
        <div className="seg seg-large" role="group" aria-label="Billing period">
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
            Yearly, two months free
          </button>
        </div>
      </header>

      <div className="wrap plans">
        {pricing.plans.map((p) => {
          const price = yearly ? p.yearly : p.monthly;
          return (
            <section
              key={p.id}
              className="plan"
              data-featured={p.featured ? "" : undefined}
              aria-labelledby={`plan-${p.id}`}
            >
              <h2 id={`plan-${p.id}`}>{p.name}</h2>
              <p className="plan-summary">{p.summary}</p>
              <p className="plan-price">
                <span className="num">
                  {price === null ? "Custom" : `$${price}`}
                </span>
                <small>
                  {p.unit}
                  {price
                    ? yearly
                      ? ", billed yearly"
                      : ", billed monthly"
                    : ""}
                </small>
              </p>
              <Link
                to={p.cta.to}
                className={`btn ${p.featured ? "btn-primary" : "btn-quiet"}`}
              >
                {p.cta.label}
              </Link>
              <ul className="ticks">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="wrap seat-calc" aria-labelledby="seat-title">
        <h2 id="seat-title">What would the Team plan cost you?</h2>
        <div className="seat-row">
          <div className="field">
            <label htmlFor="seats">{pricing.seats.label}</label>
            <input
              id="seats"
              type="number"
              inputMode="numeric"
              min={pricing.seats.min}
              max={pricing.seats.max}
              value={seats}
              onChange={(e) => setSeats(e.target.value)}
              aria-describedby="seats-hint"
            />
            <p className="field-hint" id="seats-hint">
              Between {pricing.seats.min} and {pricing.seats.max}. Read-only
              reviewers are free.
            </p>
          </div>
          <p className="seat-total" aria-live="polite">
            <span className="num">
              ${num(validSeats * seatPrice * (yearly ? 12 : 1))}
            </span>
            <small>
              {yearly ? "a year" : "a month"} for {validSeats} seats at $
              {seatPrice} each per month
            </small>
          </p>
        </div>
      </section>

      <section className="wrap compare" aria-labelledby="compare-title">
        <h2 id="compare-title">{pricing.compare.heading}</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="compare-title"
        >
          <table className="data-table compare-table">
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
              {pricing.compare.rows.map(([feature, ...cells]) => (
                <tr key={feature}>
                  <th scope="row">{feature}</th>
                  {cells.map((c, i) => (
                    <td key={i}>
                      {c === true ? (
                        <>
                          <Check size={18} aria-hidden className="yes" />
                          <span className="sr-only">Included</span>
                        </>
                      ) : c === false ? (
                        <>
                          <Minus size={18} aria-hidden className="no" />
                          <span className="sr-only">Not included</span>
                        </>
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
      </section>

      <section className="wrap faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions we get every week</h2>
        <div className="faq-list">
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
