import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { Link } from "../router";
import { brand, plans, pricing, type Plan } from "../content";
import { usd } from "../components/format";

const STOPS = [1, 2, 5, 10, 20, 35, 50, 75, 100, 150, 200, 350, 500];

function monthlyCost(plan: Plan, millions: number, yearly: boolean) {
  const base = (yearly ? plan.yearly : plan.monthly) ?? 0;
  if (plan.perMillion === null) return millions <= plan.included ? base : null;
  return base + Math.max(0, millions - plan.included) * plan.perMillion;
}

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [stop, setStop] = useState(3);
  const millions = STOPS[stop];
  const costs = plans.map((p) => ({
    plan: p,
    cost: monthlyCost(p, millions, yearly),
  }));
  const best = costs
    .filter((c) => c.cost !== null)
    .sort((a, b) => a.cost! - b.cost!)[0];

  return (
    <>
      <header className="page-head wrap">
        <h1>{pricing.heading}</h1>
        <p className="lede">{pricing.intro}</p>
        <div
          className="billing-toggle"
          role="radiogroup"
          aria-label="Billing period"
        >
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              role="radio"
              aria-checked={yearly === y}
              onClick={() => setYearly(y)}
            >
              {y ? "Yearly" : "Monthly"}
              {y && <span className="save">Save up to 17%</span>}
            </button>
          ))}
        </div>
      </header>

      <section className="wrap plans" aria-label="Plans">
        {plans.map((p) => (
          <article
            key={p.id}
            className="plan"
            data-featured={p.id === "team" ? "" : undefined}
          >
            <h2>{p.name}</h2>
            <p className="plan-blurb">{p.blurb}</p>
            <p className="plan-price">
              <span className="num">
                {usd.format((yearly ? p.yearly : p.monthly) ?? 0)}
              </span>
              <small>
                {p.monthly === 0
                  ? "forever"
                  : yearly
                    ? "per month, billed yearly"
                    : "per month"}
              </small>
            </p>
            <Link
              to={p.cta.to}
              className={p.id === "team" ? "btn btn-primary" : "btn btn-ghost"}
            >
              {p.cta.label}
            </Link>
            <ul className="ticks">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="wrap section calculator" aria-labelledby="calc-title">
        <div>
          <h2 id="calc-title">{pricing.calculator.title}</h2>
          <p>{pricing.calculator.text}</p>
        </div>
        <div className="panel calc-panel">
          <label htmlFor="volume" className="calc-label">
            Monthly events <strong className="num">{millions}M</strong>
          </label>
          <input
            id="volume"
            type="range"
            min={0}
            max={STOPS.length - 1}
            value={stop}
            onChange={(e) => setStop(Number(e.target.value))}
            aria-valuetext={`${millions} million events a month`}
          />
          <div className="calc-scale" aria-hidden>
            <span>1M</span>
            <span>500M</span>
          </div>
          <table className="data-table compact">
            <tbody>
              {costs.map(({ plan, cost }) => (
                <tr
                  key={plan.id}
                  data-best={best?.plan.id === plan.id ? "" : undefined}
                >
                  <th scope="row">{plan.name}</th>
                  <td className="r num">
                    {cost === null ? "Over limit" : `${usd.format(cost)} / mo`}
                  </td>
                  <td className="r">
                    {best?.plan.id === plan.id && (
                      <span className="status" data-status="Verified">
                        Best fit
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="quiet-note" aria-live="polite">
            {best
              ? `${best.plan.name} at ${usd.format(best.cost!)} a month for ${millions}M events, ${yearly ? "billed yearly" : "billed monthly"}.`
              : ""}
          </p>
        </div>
      </section>

      <section className="wrap section">
        <h2 className="section-title">Compare plans</h2>
        <div
          className="table-scroll"
          role="region"
          aria-label="Plan comparison"
          tabIndex={0}
        >
          <table className="data-table compare">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {plans.map((p) => (
                  <th scope="col" key={p.id}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.map((row) => (
                <tr key={row.feature}>
                  <th scope="row">{row.feature}</th>
                  {row.values.map((v, i) => (
                    <td key={i}>
                      {v === true ? (
                        <Check
                          size={18}
                          aria-label="Included"
                          className="yes"
                        />
                      ) : v === false ? (
                        <Minus
                          size={18}
                          aria-label="Not included"
                          className="no"
                        />
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

      <section className="band-dark">
        <div className="wrap section enterprise">
          <div>
            <h2>{pricing.enterprise.title}</h2>
            <p>{pricing.enterprise.text}</p>
          </div>
          <div className="actions">
            <Link to="/demo" className="btn btn-primary btn-lg">
              Talk to sales
            </Link>
            <a href={`mailto:${brand.sales}`} className="text-link light">
              {brand.sales}
            </a>
          </div>
        </div>
      </section>

      <section className="wrap section split">
        <h2>{pricing.faqTitle}</h2>
        <div className="faq">
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
