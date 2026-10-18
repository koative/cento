import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, faqs, fees, process, testimonials } from "../content";

export function HowWeWork() {
  return (
    <>
      <header className="page-head wrap">
        <h1>How we work, and what it costs</h1>
        <p className="lede">
          No membership, no hidden mark-ups on changes, no call centre. Here is
          exactly what happens between your first email and your flight home.
        </p>
      </header>

      <section className="wrap section-tight">
        <h2 className="sr-only">The four steps</h2>
        <ol className="process process--page">
          {process.map((s, i) => (
            <li key={s.title}>
              <span className="process-n" aria-hidden="true">
                {i + 1}
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section fees">
        <div className="section-head">
          <h2>Fees and payments</h2>
          <p>
            All prices in US dollars. We are paid by the hotels and suppliers we
            book, as every agency is; the fee pays for the planning itself.
          </p>
        </div>
        <div className="table-scroll">
          <table className="stays">
            <tbody>
              {fees.map((f) => (
                <tr key={f.label}>
                  <th scope="row">{f.label}</th>
                  <td className="fee-value">{f.value}</td>
                  <td>{f.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="quote-band">
        <figure className="wrap">
          <blockquote>
            <p>{testimonials[1].quote}</p>
          </blockquote>
          <figcaption>
            {testimonials[1].name} · {testimonials[1].trip}
          </figcaption>
        </figure>
      </section>

      <section className="wrap section faq">
        <div className="section-head">
          <h2>Questions we are often asked</h2>
          <p>
            Anything else, call <a href={brand.phoneHref}>{brand.phone}</a> or
            write to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>Ready when you are.</h2>
          <p>
            Tell us a little about the trip. A planner replies within one
            working day.
          </p>
          <div className="actions">
            <Link to="/enquire" className="btn btn-accent">
              Start an enquiry <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/planner" className="btn btn-line">
              Sketch a route first
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
