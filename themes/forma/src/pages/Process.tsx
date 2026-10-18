import { useState } from "react";
import { ArrowRight, Minus, Plus } from "lucide-react";
import { Link } from "../router";
import { faqs, fees, stages } from "../content";

export function Process() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>Process and fees</h1>
        <p>
          Six stages, from the first walk round the site to a visit one year
          after you move in. A partner leads each one, and you sign off every
          stage before the next begins.
        </p>
      </header>

      <section className="wrap band">
        <h2 className="visually-hidden">Stages</h2>
        <div className="fee-bar" aria-hidden="true">
          {stages.map((s) => (
            <span key={s.name} style={{ flexGrow: s.share }}>
              <span className="num">{s.share}%</span>
            </span>
          ))}
        </div>
        <p className="small">Share of the total fee, by stage.</p>
        <ol className="stages">
          {stages.map((s, i) => (
            <li key={s.name}>
              <span className="stage-no num">{i + 1}</span>
              <div className="stage-main">
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
              </div>
              <dl className="stage-facts">
                <div>
                  <dt>Duration</dt>
                  <dd>{s.weeks}</dd>
                </div>
                <div>
                  <dt>Fee share</dt>
                  <dd className="num">{s.share}%</dd>
                </div>
              </dl>
              <ul
                className="stage-outputs"
                aria-label={`What you receive at ${s.name.toLowerCase()}`}
              >
                {s.outputs.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap band split">
        <div>
          <h2>Fees</h2>
          <p>{fees.intro}</p>
          <table className="register compact">
            <tbody>
              {fees.bands.map((b) => (
                <tr key={b.label}>
                  <th scope="row">{b.label}</th>
                  <td className="right num">{b.range}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="small">
            Percentages of construction cost, excluding VAT. Illustrative
            figures for this demo studio.
          </p>
        </div>
        <figure>
          <img
            src={fees.image.src}
            alt={fees.image.alt}
            width={fees.image.w}
            height={fees.image.h}
            loading="lazy"
          />
        </figure>
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>Questions clients ask</h2>
        </div>
        <div className="faq">
          {faqs.map((f, i) => (
            <div key={f.q} className="faq-item">
              <h3>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={"faq-" + i}
                  id={"faq-btn-" + i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {f.q}
                  {open === i ? (
                    <Minus size={18} aria-hidden="true" />
                  ) : (
                    <Plus size={18} aria-hidden="true" />
                  )}
                </button>
              </h3>
              <div
                id={"faq-" + i}
                role="region"
                aria-labelledby={"faq-btn-" + i}
                hidden={open !== i}
              >
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap case-cta">
        <h2>Ready for stage one?</h2>
        <p>The first site walk is free. Tell us where it is.</p>
        <Link to="/contact" className="btn">
          Start a project <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
