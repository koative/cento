import { useState } from "react";
import { Link } from "../router";
import {
  addOns,
  annualMonthsCharged,
  comparison,
  packages,
  pricingFaq,
} from "../content";
import { dollars } from "../lib/format";
import { Faq, TickList } from "../components/Bits";

type Billing = "monthly" | "annual";

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const annual = billing === "annual";

  return (
    <>
      <header className="page-head wrap">
        <h1>Packages & pricing</h1>
        <p className="lede">
          One flat fee a month covers the work and every question you send. Pay
          yearly and the last two months are on us.
        </p>
        <fieldset className="segmented">
          <legend className="sr-only">Billing</legend>
          {(["monthly", "annual"] as Billing[]).map((b) => (
            <label key={b}>
              <input
                type="radio"
                name="billing"
                value={b}
                checked={billing === b}
                onChange={() => setBilling(b)}
              />
              <span>
                {b === "monthly"
                  ? "Pay monthly"
                  : `Pay yearly · ${12 - annualMonthsCharged} months free`}
              </span>
            </label>
          ))}
        </fieldset>
      </header>

      <section className="wrap packages" aria-label="Packages">
        {packages.map((p) => {
          const perMonth = annual
            ? Math.round((p.monthly * annualMonthsCharged) / 12)
            : p.monthly;
          return (
            <article
              key={p.id}
              className="package"
              data-featured={p.featured ? "" : undefined}
            >
              <h2>{p.name}</h2>
              {p.featured && <p className="pk-flag">Most clients start here</p>}
              <p className="pk-amount">
                <span className="pk-figure" key={billing}>
                  {dollars(perMonth)}
                </span>
                <span className="pk-per">per month</span>
              </p>
              <p className="pk-billed">
                {annual
                  ? `${dollars(p.monthly * annualMonthsCharged)} billed once a year`
                  : "Billed on the 1st, cancel with 30 days' notice"}
              </p>
              <p className="pk-pitch">{p.pitch}</p>
              <TickList items={p.includes} />
              <Link
                to="/book"
                className={`btn ${p.featured ? "btn-primary" : "btn-ghost"}`}
              >
                Book a call about {p.name}
              </Link>
            </article>
          );
        })}
      </section>
      <p className="wrap fine" aria-live="polite">
        {annual
          ? "Showing yearly prices as a monthly equivalent."
          : "Showing month-to-month prices."}{" "}
        All prices in USD, before any state sales tax on services.
      </p>

      <section className="wrap section" aria-labelledby="cmp-h">
        <h2 id="cmp-h" className="section-title">
          Line by line
        </h2>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="cmp-h"
        >
          <table className="pad-table">
            <thead>
              <tr>
                <th scope="col">What's included</th>
                {packages.map((p) => (
                  <th
                    key={p.id}
                    scope="col"
                    data-featured={p.featured ? "" : undefined}
                  >
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.row}>
                  <th scope="row">{c.row}</th>
                  {c.values.map((v, i) => (
                    <td
                      key={i}
                      data-featured={packages[i].featured ? "" : undefined}
                      data-none={v === "—" ? "" : undefined}
                    >
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="band band-paper" aria-labelledby="add-h">
        <div className="wrap section addons">
          <div className="section-head">
            <h2 id="add-h">Add-ons</h2>
            <p>
              Bolt these onto any package. Quoted up front, billed with your
              monthly fee.
            </p>
          </div>
          <table className="pad-table addon-table">
            <thead>
              <tr>
                <th scope="col">Service</th>
                <th scope="col">Price</th>
                <th scope="col">Unit</th>
              </tr>
            </thead>
            <tbody>
              {addOns.map((a) => (
                <tr key={a.name}>
                  <th scope="row">{a.name}</th>
                  <td className="num">{a.price}</td>
                  <td>{a.per}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap section faq-section" aria-labelledby="pf-h">
        <h2 id="pf-h">Pricing questions</h2>
        <Faq items={pricingFaq} />
      </section>
    </>
  );
}
