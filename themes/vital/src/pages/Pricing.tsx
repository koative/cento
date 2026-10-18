import { useState } from "react";
import { Check } from "lucide-react";
import { Link } from "../router";
import {
  compareRows,
  conditions,
  insurers,
  plans,
  pricingFaq,
} from "../content";
import { money } from "../lib/care";
import { Faq } from "../components/Faq";

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const plus = plans.find((p) => p.featured)!;

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Pricing & insurance</h1>
          <p className="lede">
            Pay per visit, or join for lower visit prices and unlimited
            messages. The price is on the screen before a clinician joins, and
            you are not charged if we send you elsewhere in the first ten
            minutes.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
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
              Yearly <span className="billing-save">Save 20%</span>
            </button>
          </div>

          <ul className="plans">
            {plans.map((p) => (
              <li
                key={p.id}
                className="plan"
                data-featured={p.featured ? "" : undefined}
              >
                <h2>{p.name}</h2>
                <p className="plan-people">{p.people}</p>
                <p className="plan-price">
                  {p.monthly ? (
                    <>
                      <span className="num">
                        {money(yearly ? Math.round(p.yearly / 12) : p.monthly)}
                      </span>
                      <span>
                        / month
                        {yearly && <>, billed {money(p.yearly)} yearly</>}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="num">$0</span>
                      <span>no membership</span>
                    </>
                  )}
                </p>
                <p className="plan-pitch">{p.pitch}</p>
                <ul className="check-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check aria-hidden="true" /> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/check-in"
                  className={`btn btn-block ${p.featured ? "btn-light" : "btn-primary"}`}
                >
                  {p.monthly
                    ? `Join ${p.name} at check-in`
                    : "Start a check-in"}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Compare plans</h2>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {r.values.map((v, i) => (
                      <td key={i} className="num">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap split">
          <div>
            <h2>Self-pay prices by condition</h2>
            <p>
              What one visit costs without insurance, and with {plus.name}.
              Follow-up messages for the same problem are always included.
            </p>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Condition</th>
                  <th scope="col">Self-pay</th>
                  <th scope="col">{plus.name}</th>
                </tr>
              </thead>
              <tbody>
                {conditions.map((c) => {
                  const member =
                    c.visitTypes[0] === "message"
                      ? 0
                      : c.slug === "anxiety-low-mood"
                        ? 69
                        : plus.visit;
                  return (
                    <tr key={c.slug}>
                      <th scope="row">
                        <Link to={`/conditions/${c.slug}`}>{c.name}</Link>
                      </th>
                      <td className="num">{money(c.price)}</td>
                      <td className="num">
                        {member ? money(member) : "Included"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Insurance we accept</h2>
            <p>
              Video and scheduled visits are in network with these plans in the
              states we serve. Add your card at the last step of the check-in;
              your copay appears before the visit starts.
            </p>
          </div>
          <ul className="insurer-list">
            {insurers.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-grid">
          <h2>Billing questions</h2>
          <Faq items={pricingFaq} />
        </div>
      </section>
    </>
  );
}
