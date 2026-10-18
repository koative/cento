import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { firm, offices } from "../content";
import { tel } from "../lib/util";
import { PageHead } from "../components/PageHead";
import { Closing } from "../components/Closing";

export function Firm() {
  return (
    <>
      <PageHead title={firm.title} />

      <section className="wrap area-intro">
        <div className="prose prose-large">
          {firm.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link to="/people" className="text-link">
            Meet the people <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <aside className="area-aside">
          <img
            src={offices[0].image}
            alt={offices[0].imageAlt}
            width={1800}
            height={1200}
          />
        </aside>
      </section>

      <section className="section wrap" aria-labelledby="principles-title">
        <h2 id="principles-title" className="section-title">
          How we practise
        </h2>
        <dl className="services principles">
          {firm.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section wrap" aria-labelledby="history-title">
        <h2 id="history-title" className="section-title">
          Since 1989
        </h2>
        <ol className="timeline">
          {firm.timeline.map((t) => (
            <li key={t.year}>
              <span className="timeline-year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="night" aria-labelledby="probono-title">
        <div className="wrap night-grid">
          <h2 id="probono-title" className="section-title">
            The Thursday Clinic
          </h2>
          <p className="night-text">{firm.probono}</p>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="offices-title">
        <h2 id="offices-title" className="section-title">
          Offices
        </h2>
        <div className="offices">
          {offices.map((o) => (
            <article key={o.city}>
              <img
                src={o.image}
                alt={o.imageAlt}
                width={1600}
                height={1067}
                loading="lazy"
              />
              <h3>{o.city}</h3>
              <address>
                {o.address.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </address>
              <p>
                <a href={tel(o.phone)}>{o.phone}</a>
                <br />
                {o.hours}
              </p>
              <p className="muted">{o.note}</p>
            </article>
          ))}
        </div>
      </section>

      <Closing />
    </>
  );
}
