import { useState } from "react";
import { Check } from "lucide-react";
import { membershipFaq, passes, plans, prices } from "../content";
import { Link } from "../router";
import { money } from "../lib/format";

export function Memberships() {
  const [annual, setAnnual] = useState(false);
  const [visits, setVisits] = useState(6);
  const [offPeak, setOffPeak] = useState(false);
  const [young, setYoung] = useState(false);

  const tenVisit = passes.find((p) => p.name === "10-visit card")!.adult / 10;
  const options = [
    { name: "Day passes", cost: visits * prices.dayAdult },
    { name: "10-visit card", cost: Math.round(visits * tenVisit) },
    ...plans
      .filter(
        (p) =>
          p.id !== "family" &&
          (p.id !== "off-peak" || offPeak) &&
          (p.id !== "under-26" || young),
      )
      .map((p) => ({ name: `${p.name} membership`, cost: p.monthly })),
  ].sort((a, b) => a.cost - b.cost);
  const best = options[0];

  return (
    <>
      <section className="page-head wrap">
        <h1>Memberships & prices</h1>
        <p className="lead">
          No joining fee, no contract longer than a month, and freezes when life
          gets in the way. Or skip the commitment and buy a day pass at the
          desk.
        </p>
      </section>

      <section className="wrap" aria-labelledby="plans-title">
        <div className="list-toolbar">
          <h2 id="plans-title" className="h-sm">
            Memberships
          </h2>
          <div className="seg" role="group" aria-label="Billing">
            <button
              type="button"
              aria-pressed={!annual}
              onClick={() => setAnnual(false)}
            >
              Pay monthly
            </button>
            <button
              type="button"
              aria-pressed={annual}
              onClick={() => setAnnual(true)}
            >
              Pay yearly · 2 months free
            </button>
          </div>
        </div>
        <ul className="plan-grid">
          {plans.map((p) => (
            <li
              key={p.id}
              className="plan"
              data-featured={p.featured ? "" : undefined}
            >
              {p.featured && <p className="plan-flag">Most members</p>}
              <h3>{p.name}</h3>
              <p className="plan-price">
                <span className="num">
                  {money(annual ? p.annual : p.monthly)}
                </span>
                {annual ? "/year" : "/month"}
              </p>
              <p className="plan-sub">
                {annual
                  ? `Works out at ${money(Math.round(p.annual / 12))} a month`
                  : `Or ${money(p.annual)} paid yearly`}
              </p>
              <p>{p.who}</p>
              <ul className="ticks-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check aria-hidden="true" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                className={`btn ${p.featured ? "btn-tape" : "btn-line"}`}
              >
                Start with a visit
              </Link>
            </li>
          ))}
        </ul>
        <p className="fine">
          Memberships start at the desk after your first visit and induction.
          Book a day pass first and we'll set it up when you arrive.
        </p>
      </section>

      <section className="wrap calc" aria-labelledby="calc-title">
        <div>
          <h2 id="calc-title">What should I buy?</h2>
          <p>
            Tell us how often you climb and we'll show the cheapest way to do
            it.
          </p>
          <label className="range-label" htmlFor="visits">
            Visits a month <output htmlFor="visits">{visits}</output>
          </label>
          <input
            id="visits"
            type="range"
            min={1}
            max={20}
            value={visits}
            onChange={(e) => setVisits(Number(e.target.value))}
          />
          <label className="check">
            <input
              type="checkbox"
              checked={offPeak}
              onChange={(e) => setOffPeak(e.target.checked)}
            />{" "}
            I can climb off-peak (weekdays before 16:00)
          </label>
          <label className="check">
            <input
              type="checkbox"
              checked={young}
              onChange={(e) => setYoung(e.target.checked)}
            />{" "}
            I'm aged 18–25
          </label>
        </div>
        <div className="calc-result" aria-live="polite">
          <p className="calc-best">
            <span>Best value</span>
            <strong>{best.name}</strong>
            <span className="num">{money(best.cost)} a month</span>
          </p>
          <table className="price-table">
            <caption className="sr-only">
              Monthly cost for {visits} visits
            </caption>
            <tbody>
              {options.map((o) => (
                <tr key={o.name} data-best={o === best ? "" : undefined}>
                  <th scope="row">{o.name}</th>
                  <td className="num">{money(o.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap" aria-labelledby="passes-title">
        <h2 id="passes-title" className="h-sm">
          Day passes & visit cards
        </h2>
        <table className="price-table wide">
          <thead>
            <tr>
              <th scope="col">Pass</th>
              <th scope="col">Adult</th>
              <th scope="col">Under 16</th>
              <th scope="col" className="hide-sm">
                Good to know
              </th>
            </tr>
          </thead>
          <tbody>
            {passes.map((p) => (
              <tr key={p.name}>
                <th scope="row">{p.name}</th>
                <td className="num">{money(p.adult)}</td>
                <td className="num">{money(p.youth)}</td>
                <td className="hide-sm">{p.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/book" className="btn btn-tape">
          Book a day pass
        </Link>
      </section>

      <section className="wrap faq" aria-labelledby="faq-title">
        <h2 id="faq-title">Questions</h2>
        {membershipFaq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
