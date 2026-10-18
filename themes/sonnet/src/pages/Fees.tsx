import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { fees, glosses } from "../content";
import { PageHead } from "../components/Bits";
import { money } from "../lib/format";

export function Fees() {
  const [period, setPeriod] = useState<"term" | "year">("term");
  return (
    <div className="wrap page">
      <PageHead title={fees.title} lead={fees.lead} gloss={glosses.fees} />

      <section aria-labelledby="plans-h" className="plans-section">
        <div className="section-head">
          <h2 id="plans-h">Ways to study</h2>
          <div className="toggle" role="group" aria-label="Show prices">
            <button
              type="button"
              aria-pressed={period === "term"}
              onClick={() => setPeriod("term")}
            >
              Per term
            </button>
            <button
              type="button"
              aria-pressed={period === "year"}
              onClick={() => setPeriod("year")}
            >
              Whole year <span className="save">save up to 12%</span>
            </button>
          </div>
        </div>
        <ul className="plans" aria-live="polite">
          {fees.plans.map((p) => {
            const price = p[period];
            const full = p.term * 3;
            return (
              <li key={p.name} className="plan">
                <h3>{p.name}</h3>
                <p className="plan-price">
                  {p.unit && <span className="plan-unit">{p.unit} </span>}
                  <span className="num">{money(price)}</span>
                  <span className="plan-unit">
                    {" "}
                    {period === "term" ? "a term" : "for three terms"}
                  </span>
                </p>
                <p className="plan-save">
                  {period === "year"
                    ? `${money(full - price)} less than three single terms`
                    : `${money(p.year)} if you book the whole year`}
                </p>
                <p>{p.text}</p>
                <ul className="ticks">
                  {p.includes.map((i) => (
                    <li key={i}>
                      <Check size={17} aria-hidden="true" /> {i}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
        <p className="fine">
          Pay in full, or in two instalments: half when you enrol, half by week
          four. Employers can be invoiced directly.
        </p>
      </section>

      <div className="fees-grid">
        <section aria-labelledby="terms-h">
          <h2 id="terms-h">Term dates</h2>
          <dl className="ledger">
            {fees.terms.map((t) => (
              <div key={t.name}>
                <dt>{t.name}</dt>
                <dd>
                  <span className="num">{t.dates}</span>
                  <small>{t.note}</small>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="disc-h">
          <h2 id="disc-h">Discounts</h2>
          <dl className="ledger">
            {fees.discounts.map((d) => (
              <div key={d.name}>
                <dt>{d.name}</dt>
                <dd>{d.value}</dd>
              </div>
            ))}
          </dl>
          <p className="fine">
            Discounts do not combine; we always apply the largest one you
            qualify for.
          </p>
        </section>
      </div>

      <section aria-labelledby="faq-h" className="section faq">
        <h2 id="faq-h">Questions people ask the office</h2>
        <div className="faq-list">
          {fees.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="aside-note">
        <h2>Ready when you are.</h2>
        <p>
          Enrolment takes about three minutes. We hold your place for 48 hours
          while we confirm.
        </p>
        <Link to="/enrol" className="btn">
          Enrol on a course <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
