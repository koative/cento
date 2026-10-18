import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "../router";
import { faqs, fees, programmes } from "../content";
import { money } from "../lib/format";
import { Coda } from "../components/Bits";

const PLANS = [
  { id: "lesson", label: "Per lesson", unit: "a lesson", factor: 1 },
  { id: "term", label: "Per term", unit: "a term", factor: fees.termWeeks },
  {
    id: "monthly",
    label: "Monthly",
    unit: "a month, 3 times a term",
    factor: fees.termWeeks / 3,
  },
];

export function Fees() {
  const [plan, setPlan] = useState(PLANS[1]);
  const groups = programmes.filter((p) => p.group);

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Fees & terms</h1>
        <p className="lede">{fees.terms}</p>
      </header>

      <section className="wrap fee-block" aria-labelledby="private-h">
        <div className="fee-head">
          <h2 id="private-h">Private lessons</h2>
          <fieldset className="segmented">
            <legend>Show prices</legend>
            {PLANS.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={plan === p}
                onClick={() => setPlan(p)}
              >
                {p.label}
              </button>
            ))}
          </fieldset>
        </div>
        <ul className="price-rows" aria-live="polite">
          {fees.private.map((r) => (
            <li key={r.minutes}>
              <span className="price-len">{r.minutes} minutes</span>
              <span className="price-note">{r.note}</span>
              <span className="price-amount">
                <strong>{money(r.perLesson * plan.factor)}</strong> {plan.unit}
              </span>
            </li>
          ))}
        </ul>
        <p className="fine">
          Terms are paid in advance or in three monthly instalments at no extra
          cost. One weekly lesson, same teacher, same time.
        </p>
      </section>

      <section className="wrap fee-block" aria-labelledby="group-h">
        <h2 id="group-h">Group classes</h2>
        <table className="rate-table">
          <caption className="sr-only">Group class prices</caption>
          <thead>
            <tr>
              <th scope="col">Class</th>
              <th scope="col">Length</th>
              <th scope="col">Per class</th>
              <th scope="col">Per term</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((p) => (
              <tr key={p.slug}>
                <th scope="row">
                  <Link to={`/programmes/${p.slug}`}>{p.name}</Link>
                </th>
                <td>{p.group!.minutes} min</td>
                <td>{money(p.group!.perSession)}</td>
                <td>{money(p.group!.perSession * fees.termWeeks)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="fine">
          Ensembles are free for students taking private lessons at Score.
        </p>
      </section>

      <section className="wrap fee-split" aria-label="Hire and extras">
        <div>
          <h2>Instrument hire</h2>
          <table className="rate-table">
            <caption className="sr-only">Monthly hire prices</caption>
            <thead>
              <tr>
                <th scope="col">Instrument</th>
                <th scope="col">A month</th>
              </tr>
            </thead>
            <tbody>
              {fees.hire.map((h) => (
                <tr key={h.item}>
                  <th scope="row">{h.item}</th>
                  <td>{money(h.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Everything else</h2>
          <table className="rate-table">
            <caption className="sr-only">Other costs</caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Cost</th>
              </tr>
            </thead>
            <tbody>
              {fees.extras.map((x) => (
                <tr key={x.item}>
                  <th scope="row">{x.item}</th>
                  <td>{x.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap fee-block" aria-labelledby="disc-h">
        <h2 id="disc-h">Discounts and bursaries</h2>
        <ul className="plain-list">
          {fees.discounts.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      </section>

      <section className="wrap faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions parents ask</h2>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>
              {f.q}
              <ChevronDown aria-hidden="true" />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>

      <Coda
        title="Start with the free part."
        text="The trial lesson costs nothing and commits you to nothing. Fees only begin when weekly lessons do."
      />
    </div>
  );
}
