import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import { pricing } from "../content";
import { Faq } from "../components/bits";

const money = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
const limits: Record<string, number> = { team: 500, business: 5000 };

export default function Pricing() {
  const [yearly, setYearly] = useState(true);
  const [count, setCount] = useState(400);

  return (
    <>
      <header className="page-head wrap">
        <h1>{pricing.heading}</h1>
        <p className="lede">{pricing.lede}</p>
        <fieldset className="toggle">
          <legend className="sr-only">Billing period</legend>
          <label>
            <input
              type="radio"
              name="billing"
              checked={yearly}
              onChange={() => setYearly(true)}
            />
            <span>Yearly, save about 20%</span>
          </label>
          <label>
            <input
              type="radio"
              name="billing"
              checked={!yearly}
              onChange={() => setYearly(false)}
            />
            <span>Monthly</span>
          </label>
        </fieldset>
      </header>

      <section className="wrap" aria-label="Plans">
        <ul className="plans">
          {pricing.plans.map((p) => {
            const rate = yearly ? p.yearly : p.monthly;
            return (
              <li
                key={p.id}
                className="plan"
                data-featured={p.featured ? "" : undefined}
              >
                <h2>{p.name}</h2>
                <p className="plan-blurb">{p.blurb}</p>
                <p className="plan-price">
                  {rate ? (
                    <>
                      <span className="num">${rate.toFixed(2)}</span>
                      <small>
                        per identity a month{yearly ? ", billed yearly" : ""}
                      </small>
                    </>
                  ) : (
                    <>
                      <span>Custom</span>
                      <small>
                        from {p.minimum.toLocaleString("en-US")} identities
                      </small>
                    </>
                  )}
                </p>
                {rate && (
                  <p className="quiet small">Minimum {p.minimum} identities.</p>
                )}
                <ul className="tick-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={16} aria-hidden /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/demo"
                  className={p.featured ? "btn btn-primary" : "btn btn-quiet"}
                >
                  {p.cta}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="calc wrap" aria-labelledby="calc-title">
        <div>
          <h2 id="calc-title">Estimate your bill</h2>
          <p>
            Count the people and service accounts with access to any system you
            review. Reviewers without grants in scope are free.
          </p>
          <label className="range">
            <span>
              Identities in scope{" "}
              <output className="num">{count.toLocaleString("en-US")}</output>
            </span>
            <input
              type="range"
              min={50}
              max={5000}
              step={50}
              value={count}
              onChange={(e) => setCount(+e.target.value)}
            />
          </label>
        </div>
        <dl className="calc-out" aria-live="polite">
          {pricing.plans.map((p) => {
            const rate = yearly ? p.yearly : p.monthly;
            const fits = rate !== null && count <= limits[p.id];
            return (
              <div key={p.id} data-featured={p.featured ? "" : undefined}>
                <dt>{p.name}</dt>
                <dd>
                  {fits ? (
                    <>
                      <span className="num">
                        {money(rate * Math.max(count, p.minimum))}
                      </span>
                      <small>
                        a month
                        {yearly
                          ? `, ${money(rate * Math.max(count, p.minimum) * 12)} a year`
                          : ""}
                      </small>
                    </>
                  ) : rate === null ? (
                    <small>
                      Quoted for{" "}
                      {count < p.minimum
                        ? `${p.minimum.toLocaleString("en-US")}+`
                        : count.toLocaleString("en-US")}{" "}
                      identities
                    </small>
                  ) : (
                    <small>
                      Above the {limits[p.id].toLocaleString("en-US")}-identity
                      limit
                    </small>
                  )}
                </dd>
              </div>
            );
          })}
        </dl>
      </section>

      <section className="wrap compare" aria-labelledby="compare-title">
        <h2 id="compare-title">Compare plans</h2>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                {pricing.plans.map((p) => (
                  <th scope="col" key={p.id}>
                    {p.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricing.compare.map((r) => (
                <tr key={r.feature}>
                  <th scope="row">{r.feature}</th>
                  {r.values.map((v, i) => (
                    <td key={i}>
                      {v === "—" ? <span aria-label="Not included">—</span> : v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="faq-section wrap" aria-labelledby="pfaq-title">
        <h2 id="pfaq-title">Billing questions</h2>
        <Faq items={pricing.faq} />
      </section>
    </>
  );
}
