import { useState } from "react";
import { Link } from "../router";
import { faqs, pricing } from "../content";
import { money } from "../lib/util";
import { Faqs } from "../components/Faqs";

export function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [value, setValue] = useState(12000);
  const firstTier = pricing.memberFees.tiers[0].fee;

  return (
    <>
      <section className="page-head wrap">
        <h1>{pricing.title}</h1>
        <p className="lede">{pricing.lede}</p>
      </section>

      <section className="wrap" aria-labelledby="plans-h">
        <div className="plans-bar">
          <h2 id="plans-h">For clients</h2>
          <div
            className="segmented"
            role="radiogroup"
            aria-label="Billing period"
          >
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
              <span>Yearly, two months free</span>
            </label>
          </div>
        </div>

        <div className="plans">
          {pricing.clientPlans.map((p) => {
            const price = yearly ? p.yearly : p.monthly;
            return (
              <article
                key={p.id}
                className="plan"
                data-featured={p.id === "studio" ? "" : undefined}
              >
                <h3>{p.name}</h3>
                <p className="plan-text">{p.text}</p>
                <p className="plan-price">
                  <strong>{price ? money(price) : "Free"}</strong>
                  <span>
                    {price
                      ? yearly
                        ? "a month, billed yearly"
                        : "a month"
                      : "no subscription"}
                  </span>
                </p>
                <p className="plan-fee">
                  <strong>{p.fee}%</strong> on funded milestones
                </p>
                <ul className="checks">
                  {p.features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
                <Link
                  to={p.id === "open" ? "/post" : "/signup"}
                  className={`btn ${p.id === "studio" ? "btn-seal" : "btn-line"}`}
                >
                  {p.cta}
                </Link>
              </article>
            );
          })}
        </div>
        <p className="quiet" aria-live="polite">
          {yearly
            ? "Showing yearly prices per month. Cancel any time; unused months are refunded."
            : "Showing monthly prices. Switch to yearly for two months free."}
        </p>
      </section>

      <section className="section wrap member-fees" aria-labelledby="mf-h">
        <div>
          <h2 id="mf-h">{pricing.memberFees.title}</h2>
          <p>{pricing.memberFees.text}</p>
          <Link to="/signup" className="more">
            Apply to join
          </Link>
        </div>
        <table className="ruled">
          <caption className="sr-only">Member fees</caption>
          <thead>
            <tr>
              <th scope="col">Invoiced with one client</th>
              <th scope="col" className="num">
                Guild fee
              </th>
            </tr>
          </thead>
          <tbody>
            {pricing.memberFees.tiers.map((t) => (
              <tr key={t.label}>
                <td>{t.label}</td>
                <td className="num">{t.fee}%</td>
              </tr>
            ))}
            <tr>
              <td>Withdrawals, currency conversion, membership</td>
              <td className="num">0%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="section band-paper" aria-labelledby="calc-h">
        <div className="wrap calc">
          <div>
            <h2 id="calc-h">{pricing.calculator.title}</h2>
            <p>{pricing.calculator.text}</p>
            <div className="field">
              <label htmlFor="calc-v">
                Project value <strong className="num">{money(value)}</strong>
              </label>
              <input
                id="calc-v"
                type="range"
                min={1000}
                max={60000}
                step={500}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
              />
            </div>
          </div>
          <table className="ruled calc-table" aria-live="polite">
            <caption className="sr-only">
              Fees on a {money(value)} project
            </caption>
            <thead>
              <tr>
                <th scope="col">Client plan</th>
                <th scope="col" className="num">
                  Client fee
                </th>
                <th scope="col" className="num">
                  Client pays
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.clientPlans.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td className="num">{money((value * p.fee) / 100)}</td>
                  <td className="num">{money(value * (1 + p.fee / 100))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Member receives</th>
                <td className="num">−{money((value * firstTier) / 100)}</td>
                <td className="num">{money(value * (1 - firstTier / 100))}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      <section className="section wrap faq-section" aria-labelledby="pfaq-h">
        <h2 id="pfaq-h">Fee questions</h2>
        <Faqs items={faqs.filter((f) => /fee|pay|rate|free/i.test(f.q))} />
      </section>
    </>
  );
}
