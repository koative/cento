import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";
import { money } from "../lib/format";

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [seats, setSeats] = useState(12);

  return (
    <>
      <header className="page-head wrap">
        <h1>{pricing.h1}</h1>
        <p className="lede">{pricing.lede}</p>
      </header>

      <section className="wrap section-tight" aria-labelledby="h-plans">
        <h2 id="h-plans" className="sr-only">
          Plans
        </h2>
        <div className="pricing-controls">
          <fieldset className="segmented segmented-lg">
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
              <span>Yearly, save 20%</span>
            </label>
          </fieldset>
          <div className="seats">
            <label htmlFor="seats">
              Seats{" "}
              <output htmlFor="seats" className="num">
                {seats}
              </output>
            </label>
            <input
              id="seats"
              type="range"
              min={1}
              max={120}
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
            />
          </div>
        </div>

        <ul className="plans">
          {pricing.plans.map((p) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <li
                key={p.id}
                className="plan"
                data-featured={p.featured ? "" : undefined}
              >
                <h3>{p.name}</h3>
                <p className="plan-pitch">{p.pitch}</p>
                <p className="plan-price">
                  <span className="num">${price}</span> per seat / month
                </p>
                <p className="plan-total" aria-live="polite">
                  {seats} {seats === 1 ? "seat" : "seats"}:{" "}
                  <strong className="num">
                    {money(price * seats * (yearly ? 12 : 1))}
                  </strong>{" "}
                  {yearly ? "per year" : "per month"}
                </p>
                <ul className="ticks">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={18} aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to={p.id === "scale" ? "/demo" : "/signin"}
                  className={p.featured ? "btn btn-primary" : "btn btn-quiet"}
                >
                  {p.cta}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="h-compare">
        <h2 id="h-compare">Compare plans</h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="h-compare"
        >
          <table className="data compare">
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
                    <td key={i} className={v === "—" ? "muted" : undefined}>
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section faq" aria-labelledby="h-faq">
        <h2 id="h-faq">Questions buyers ask us</h2>
        <div className="faq-list">
          {pricing.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap close" aria-labelledby="h-close">
        <h2 id="h-close">More than 60 seats?</h2>
        <p>
          We'll price Scale against your actual seat mix and migration, and put
          it in writing within two working days.
        </p>
        <div className="cta-row">
          <Link to="/demo" className="btn btn-primary btn-lg">
            Talk to sales
          </Link>
          <a
            href="mailto:sales@pipeline.example"
            className="btn btn-quiet btn-lg"
          >
            sales@pipeline.example
          </a>
        </div>
      </section>
    </>
  );
}
