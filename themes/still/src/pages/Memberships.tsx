import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  compare,
  concessions,
  faqs,
  intro,
  passes,
  plans,
  policies,
} from "../content";
import { money } from "../lib/week";
import { Faq } from "../components/Faq";

export function Memberships() {
  const [yearly, setYearly] = useState(false);

  return (
    <>
      <header className="page-head wrap">
        <h1>Memberships & passes</h1>
        <p className="lead">
          Pay by the class, by the pack or by the month. Every option includes
          mats, props, blankets and tea. Nothing renews without telling you
          first.
        </p>
      </header>

      <section className="lavender offer">
        <div className="wrap offer-row">
          <h2>{intro.name}</h2>
          <p className="offer-price">
            <strong>{money(intro.price)}</strong>
            <span>{intro.text}</span>
          </p>
          <Link to="/book?pay=intro" className="btn btn-primary">
            Start your fortnight
          </Link>
        </div>
      </section>

      <section className="wrap plans" aria-labelledby="plans-title">
        <div className="section-head">
          <h2 id="plans-title">Memberships</h2>
          <fieldset className="toggle">
            <legend className="sr-only">Billing</legend>
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
          </fieldset>
        </div>
        <div className="plan-grid">
          {plans.map((p) => (
            <div key={p.id} className="plan">
              <h3>{p.name}</h3>
              <p className="plan-price" aria-live="polite">
                <strong>{money(yearly ? p.yearly : p.monthly)}</strong>
                <span>
                  {yearly
                    ? `a year, about ${money(Math.round(p.yearly / 12))} a month`
                    : "a month, cancel with 30 days' notice"}
                </span>
              </p>
              <p>{p.text}</p>
              <ul className="ticks">
                {p.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <Link to={`/book?pay=${p.id}`} className="btn btn-primary">
                Start {p.name} <ArrowRight aria-hidden="true" size={16} />
              </Link>
            </div>
          ))}
        </div>
        <p className="fine">{concessions}</p>
      </section>

      <section className="wrap passes" aria-labelledby="passes-title">
        <h2 id="passes-title">Class passes</h2>
        <ul className="pass-list">
          {passes.map((p) => (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.detail}</p>
              <strong>{money(p.price)}</strong>
              <Link to={`/book?pay=${p.id}`} className="btn btn-small">
                Buy and book
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap compare" aria-labelledby="compare-title">
        <h2 id="compare-title">Side by side</h2>
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
                {compare.columns.map((c) => (
                  <th key={c} scope="col">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap policies" aria-labelledby="policies-title">
        <h2 id="policies-title">The small print, written plainly</h2>
        <dl>
          {policies.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions</h2>
        <Faq items={faqs} />
      </section>
    </>
  );
}
