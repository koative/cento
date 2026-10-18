import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  applySteps,
  brand,
  entryEquivalents,
  faqs,
  keyDates,
  livingCosts,
  programmes,
  scholarships,
} from "../content";
import { longDate, money } from "../lib/format";

type FeeStatus = "home" | "international";
const TERM_WEEKS = 34;

export function Admissions() {
  const [status, setStatus] = useState<FeeStatus>("home");
  const weekly = livingCosts.reduce((s, c) => s + c.week, 0);

  return (
    <>
      <header className="page-head wrap">
        <h1>Admissions</h1>
        <p className="lead">
          How to apply for September 2027, what we ask for, what it costs and
          the help available to pay for it. Applications close on 28 January
          2027.
        </p>
        <div className="btn-row">
          <Link to="/apply" className="btn btn-primary">
            Start your application
          </Link>
          <Link to="/programmes" className="btn btn-outline">
            Find a programme
          </Link>
        </div>
      </header>

      <section className="section-stone section" aria-labelledby="how-h">
        <div className="wrap">
          <h2 id="how-h">How to apply</h2>
          <ol className="steps">
            {applySteps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="entry-h">
        <div>
          <h2 id="entry-h">Entry requirements</h2>
          <p>
            Typical offers for 2027 entry. Contextual offers may be up to two
            grades lower; we check eligibility automatically.
          </p>
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Programme</th>
                <th scope="col">Typical offer</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((p) => (
                <tr key={p.id}>
                  <th scope="row">
                    <Link to={`/programmes/${p.id}`}>
                      {p.award} {p.title}
                    </Link>
                  </th>
                  <td>{p.entry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="h-sub">Other qualifications</h3>
          <dl className="equiv">
            {entryEquivalents.map((e) => (
              <div key={e.qualification}>
                <dt>{e.qualification}</dt>
                <dd>{e.note}</dd>
              </div>
            ))}
          </dl>
          <p className="small">
            English language: IELTS 6.5 overall with no component below 6.0, or
            an equivalent test.
          </p>
        </div>
      </section>

      <section className="section-stone section" aria-labelledby="fees-h">
        <div className="wrap">
          <div className="section-head section-head-row">
            <h2 id="fees-h">Tuition fees, 2027–28</h2>
            <fieldset className="segmented">
              <legend className="sr-only">Fee status</legend>
              {(["home", "international"] as const).map((s) => (
                <label key={s}>
                  <input
                    type="radio"
                    name="fee-status"
                    checked={status === s}
                    onChange={() => setStatus(s)}
                  />
                  <span>
                    {s === "home" ? "Home students" : "International students"}
                  </span>
                </label>
              ))}
            </fieldset>
          </div>
          <div className="split">
            <table className="data-table">
              <caption className="sr-only">
                Annual tuition fees for {status} students
              </caption>
              <thead>
                <tr>
                  <th scope="col">Programme</th>
                  <th scope="col" className="num">
                    Per year
                  </th>
                  <th scope="col" className="num">
                    Whole programme
                  </th>
                </tr>
              </thead>
              <tbody>
                {programmes.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">
                      {p.award} {p.title}
                    </th>
                    <td className="num">{money(p.fees[status])}</td>
                    <td className="num">{money(p.fees[status] * p.years)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <h3 className="h-sub">Living costs, roughly</h3>
              <table className="data-table">
                <tbody>
                  {livingCosts.map((c) => (
                    <tr key={c.item}>
                      <th scope="row">{c.item}</th>
                      <td className="num">{money(c.week)} / wk</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th scope="row">
                      Across a {TERM_WEEKS}-week academic year
                    </th>
                    <td className="num">{money(weekly * TERM_WEEKS)}</td>
                  </tr>
                </tfoot>
              </table>
              <p className="small">
                An estimate for a student in a self-catered en-suite hall, built
                from what our current students tell us they spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="sch-h">
        <h2 id="sch-h">Scholarships and bursaries</h2>
        <ul className="ledger-list">
          {scholarships.map((s) => (
            <li key={s.name}>
              <h3>{s.name}</h3>
              <p className="ledger-value">
                {s.per.startsWith("%")
                  ? `${s.value}${s.per}`
                  : `${money(s.value)} ${s.per}`}
              </p>
              <p>{s.who}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section split" aria-labelledby="faq-h">
        <div>
          <h2 id="faq-h">Questions applicants ask</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <aside className="dates-card" aria-labelledby="dates-h">
          <h2 id="dates-h">Dates to keep</h2>
          <ul>
            {keyDates.map((d) => (
              <li key={d.date}>
                <time dateTime={d.date}>{longDate(d.date)}</time>
                <Link to={d.to}>{d.label}</Link>
              </li>
            ))}
          </ul>
          <p>
            Questions? <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </p>
          <Link to="/apply" className="text-link">
            Apply now <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </section>
    </>
  );
}
