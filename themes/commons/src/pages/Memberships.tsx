import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { annualDiscount, comparison, dropIn, faqs, plans } from "../content";
import { money } from "../lib";

export function Memberships() {
  const [yearly, setYearly] = useState(false);
  const price = (monthly: number) =>
    yearly ? monthly * (1 - annualDiscount) : monthly;

  return (
    <>
      <header className="page-head wrap">
        <h1>Memberships</h1>
        <p className="lede">
          Month to month, or yearly with {annualDiscount * 100}% off. Every plan
          includes the kitchen, the booths, the events and a front desk that
          learns your name.
        </p>
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
            Yearly <span>save {annualDiscount * 100}%</span>
          </button>
        </div>
      </header>

      <section className="wrap" aria-label="Plans">
        <ul className="plan-grid">
          {plans.map((p) => (
            <li
              key={p.id}
              className="plan-card"
              data-featured={p.featured ? "" : undefined}
            >
              <h2>{p.name}</h2>
              {p.featured && (
                <p className="plan-flag">Most members choose this</p>
              )}
              <p className="plan-amount" aria-live="polite">
                <strong>
                  {p.from ? <small>from </small> : null}
                  {money(price(p.monthly))}
                </strong>
                <span>
                  {p.unit}
                  {yearly
                    ? `, billed ${money(price(p.monthly) * 12)} yearly`
                    : ""}
                </span>
              </p>
              <p>{p.summary}</p>
              <ul className="ticks">
                {p.includes.map((i) => (
                  <li key={i}>
                    <Check aria-hidden="true" />
                    {i}
                  </li>
                ))}
              </ul>
              <Link
                to="/tour"
                className={`btn ${p.featured ? "btn-accent" : "btn-quiet"}`}
              >
                Tour and try {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section" aria-labelledby="drop-title">
        <h2 id="drop-title">No plan, no problem</h2>
        <ul className="drop-rows">
          {dropIn.map((d) => (
            <li key={d.name}>
              <h3>{d.name}</h3>
              <p>{d.note}</p>
              <strong>
                {d.perHour ? `from ${money(d.price)}/h` : money(d.price)}
              </strong>
            </li>
          ))}
        </ul>
        <p>
          <Link to="/rooms" className="text-link">
            Book a meeting room without joining
          </Link>
        </p>
      </section>

      <section className="wrap section" aria-labelledby="compare-title">
        <h2 id="compare-title">Side by side</h2>
        <div className="table-scroll">
          <table className="compare">
            <thead>
              <tr>
                <td />
                {plans.map((p) => (
                  <th key={p.id} scope="col">
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  {row.values.map((v, i) => (
                    <td key={plans[i].id}>
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">
                  Price {yearly ? "(yearly, per month)" : "(monthly)"}
                </th>
                {plans.map((p) => (
                  <td key={p.id}>
                    {p.from ? "from " : ""}
                    {money(price(p.monthly))}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions we get at the front desk</h2>
        <div className="faq-list">
          {faqs.map((f) => (
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
