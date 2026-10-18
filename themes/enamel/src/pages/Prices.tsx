import { useState } from "react";
import { Link } from "../router";
import { categories, paymentNotes, plan, treatments } from "../content";
import { money, priceRange } from "../lib/format";

export function Prices() {
  const [member, setMember] = useState(false);
  const [yearly, setYearly] = useState(false);
  const factor = member ? 1 - plan.discount : 1;
  const saving = plan.monthly * 12 - plan.yearly;

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Prices</h1>
        <p className="lede">
          Every treatment, every price, before you book. Estimates are confirmed
          in writing after your exam, and nothing beyond the exam starts without
          your yes.
        </p>
      </header>

      <section className="wrap price-table-wrap" aria-labelledby="pt-h">
        <div className="section-head split">
          <h2 id="pt-h">Treatment prices</h2>
          <div className="seg" role="group" aria-label="Show prices for">
            <button
              type="button"
              aria-pressed={!member}
              onClick={() => setMember(false)}
            >
              Pay as you go
            </button>
            <button
              type="button"
              aria-pressed={member}
              onClick={() => setMember(true)}
            >
              {plan.name} member
            </button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite">
          {member
            ? `Showing ${plan.name} member prices, ${plan.discount * 100}% lower.`
            : "Showing pay-as-you-go prices."}
        </p>
        {categories.map((c) => (
          <table key={c} className="price-table">
            <caption>{c}</caption>
            <thead>
              <tr>
                <th scope="col">Treatment</th>
                <th scope="col">Time</th>
                <th scope="col">Unit</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {treatments
                .filter((t) => t.category === c)
                .map((t) => {
                  const included =
                    member && (t.slug === "check-up" || t.slug === "hygienist");
                  return (
                    <tr key={t.slug}>
                      <th scope="row">
                        <Link to={`/treatments/${t.slug}`}>{t.name}</Link>
                      </th>
                      <td className="tnum">{t.minutes} min</td>
                      <td>{t.unit}</td>
                      <td
                        className="tnum price-cell"
                        data-member={member ? "" : undefined}
                      >
                        {included ? "Included" : priceRange(t, factor)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ))}
      </section>

      <section className="band band-gum" aria-labelledby="plan-h">
        <div className="wrap plan-block">
          <div>
            <h2 id="plan-h">The {plan.name}</h2>
            <p className="lede">
              Spread the cost of keeping your teeth healthy, and pay less when
              they need work.
            </p>
            <ul className="ticks">
              {plan.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <p className="quiet">{plan.terms}</p>
          </div>
          <div className="plan-card">
            <div className="seg seg-small" role="group" aria-label="Billing">
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
                Yearly
              </button>
            </div>
            <p className="plan-price tnum" aria-live="polite">
              {yearly ? money(plan.yearly) : money(plan.monthly)}
              <span>{yearly ? "a year" : "a month"}</span>
            </p>
            <p className="plan-sub">
              {yearly
                ? `Paid once — ${money(saving)} less than monthly.`
                : `Children under 16: ${money(plan.childMonthly)} a month.`}
            </p>
            <p className="plan-sub">
              Pay-as-you-go value of what's included:{" "}
              {money(treatments[0].price * 2 + treatments[1].price * 2)} a year.
            </p>
            <Link to="/book?t=check-up" className="btn btn-primary btn-block">
              Join at your first check-up
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap pay-notes" aria-labelledby="pay-h">
        <h2 id="pay-h">Paying, insurance and estimates</h2>
        <dl>
          {paymentNotes.map((n) => (
            <div key={n.title}>
              <dt>{n.title}</dt>
              <dd>{n.body}</dd>
            </div>
          ))}
        </dl>
        <p>
          Want a feel for your own costs first?{" "}
          <Link to="/">Mark your teeth on the chart</Link> for a rough estimate.
        </p>
      </section>
    </div>
  );
}
