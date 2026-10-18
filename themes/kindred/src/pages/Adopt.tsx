import { ChevronDown } from "lucide-react";
import { Link } from "../router";
import { brand, faq, fees, included, promises, steps } from "../content";
import { money } from "../lib/util";

export function Adopt() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>How adoption works</h1>
        <p className="lede">
          Four steps, usually a week from first hello to going home. We'd rather
          spend an extra conversation now than see an animal come back in a
          month — so we ask real questions, and we answer them too.
        </p>
      </header>

      <section className="wrap section" aria-labelledby="steps-h">
        <h2 id="steps-h" className="sr-only">
          The four steps
        </h2>
        <ol className="steps steps-large">
          {steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p className="step-time">{s.time}</p>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="actions">
          <Link to="/apply" className="btn btn-primary">
            Start an application
          </Link>
          <Link to="/animals" className="btn btn-quiet">
            Browse animals first
          </Link>
        </div>
      </section>

      <section className="band band-cream" aria-labelledby="fees-h">
        <div className="wrap fees">
          <div>
            <h2 id="fees-h">Adoption fees</h2>
            <p>
              Fees cover a fraction of what each animal costs us — around $640
              for the average dog. Everything listed here is included, whatever
              the fee.
            </p>
            <table className="fee-table">
              <caption className="sr-only">
                Adoption fees by species and age
              </caption>
              <thead>
                <tr>
                  <th scope="col">Animal</th>
                  <th scope="col">Fee</th>
                </tr>
              </thead>
              <tbody>
                {fees.map((f) => (
                  <tr key={f.label}>
                    <th scope="row">{f.label}</th>
                    <td className="num">{money(f.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3>Every adoption includes</h3>
            <ul className="included">
              {included.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wrap section promises" aria-labelledby="prom-h">
        <h2 id="prom-h">Our side of the deal</h2>
        <dl>
          {promises.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section faq" aria-labelledby="faq-h">
        <h2 id="faq-h">Questions people ask at reception</h2>
        <div className="faq-list">
          {faq.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <ChevronDown aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <p className="faq-more">
          Something else? Call the adoption line on{" "}
          <a href={brand.phoneHref}>{brand.phone}</a> or email{" "}
          <a href={`mailto:${brand.adoptEmail}`}>{brand.adoptEmail}</a>.
        </p>
      </section>
    </div>
  );
}
