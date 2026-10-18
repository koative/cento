import { useState } from "react";
import { Link } from "../router";
import { fees, type Audience } from "../content";
import { areaBySlug, money } from "../lib/util";
import { PageHead } from "../components/PageHead";
import { Faqs } from "../components/Faqs";
import { Closing } from "../components/Closing";

export function Fees() {
  const [audience, setAudience] = useState<Audience>("individual");
  const rows = fees.fixed.filter((f) => f.audience === audience);

  return (
    <>
      <PageHead title={fees.title} lede={fees.intro} />

      <section className="wrap section-tight" aria-labelledby="bases-title">
        <h2 id="bases-title" className="visually-hidden">
          Ways we charge
        </h2>
        <dl className="services bases">
          {fees.bases.map((b) => (
            <div key={b.name}>
              <dt>{b.name}</dt>
              <dd>{b.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap" aria-labelledby="fixed-title">
        <div className="split-head">
          <h2 id="fixed-title" className="section-title">
            Fixed-fee schedule
          </h2>
          <div className="segmented" role="group" aria-label="Show fees for">
            <button
              type="button"
              aria-pressed={audience === "individual"}
              onClick={() => setAudience("individual")}
            >
              Individuals
            </button>
            <button
              type="button"
              aria-pressed={audience === "business"}
              onClick={() => setAudience("business")}
            >
              Businesses
            </button>
          </div>
        </div>
        <table className="ledger fee-table">
          <caption className="visually-hidden">
            Fixed fees for{" "}
            {audience === "individual" ? "individuals" : "businesses"}, in US
            dollars
          </caption>
          <thead>
            <tr>
              <th scope="col">Matter</th>
              <th scope="col">Practice</th>
              <th scope="col" className="num-col">
                Fee
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={f.name}>
                <th scope="row">
                  {f.name}
                  <span className="muted">{f.per}</span>
                </th>
                <td>
                  <Link to={`/practice/${f.area}`}>
                    {areaBySlug(f.area)?.name}
                  </Link>
                </td>
                <td className="num-col">{money(f.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="table-note">
          Fees exclude filing, recording and title-insurance costs, which are
          passed on at cost.
        </p>
      </section>

      <section className="section wrap rates" aria-labelledby="rates-title">
        <div>
          <h2 id="rates-title" className="section-title">
            Hourly rates
          </h2>
          <p className="muted">
            For work that cannot be fixed. Billed in six-minute units, reviewed
            each January, effective January 1, 2026.
          </p>
        </div>
        <table className="ledger">
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col" className="num-col">
                Per hour
              </th>
            </tr>
          </thead>
          <tbody>
            {fees.rates.map((r) => (
              <tr key={r.role}>
                <th scope="row">{r.role}</th>
                <td className="num-col">{money(r.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section
        className="section wrap faq-section"
        aria-labelledby="fees-faq-title"
      >
        <h2 id="fees-faq-title" className="section-title">
          Engagement questions
        </h2>
        <Faqs items={fees.faqs} />
      </section>

      <Closing title="Ask for a quote. It costs nothing." />
    </>
  );
}
