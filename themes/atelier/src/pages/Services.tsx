import { ArrowRight, Plus } from "lucide-react";
import { Link } from "../router";
import {
  cases,
  engagements,
  faqs,
  photos,
  process,
  services,
  servicesPage,
} from "../content";
import { Photo } from "../components/CaseCard";
import { money } from "../lib";

export function Services() {
  return (
    <>
      <section className="page-head wrap">
        <h1>{servicesPage.title}</h1>
        <p className="lede">{servicesPage.intro}</p>
      </section>

      <section className="wrap service-list" aria-label="Disciplines">
        {services.map((s) => {
          const work = cases.filter((c) => c.disciplines.includes(s.id));
          return (
            <article key={s.id} className="service">
              <div className="service-head">
                <h2>{s.name}</h2>
                <p>{s.summary}</p>
              </div>
              <div className="service-body">
                <h3 className="sr-only">What you get</h3>
                <ul className="deliverables">
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <dl className="service-facts">
                  <div>
                    <dt>Typical length</dt>
                    <dd className="tabular">
                      {s.weeks[0]}–{s.weeks[1]} weeks
                    </dd>
                  </div>
                  <div>
                    <dt>Fees from</dt>
                    <dd className="tabular">{money(s.from)}</dd>
                  </div>
                  <div>
                    <dt>Seen in</dt>
                    <dd>
                      {work.map((c, i) => (
                        <span key={c.slug}>
                          {i > 0 && ", "}
                          <Link to={`/work/${c.slug}`}>{c.client}</Link>
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </article>
          );
        })}
      </section>

      <section className="section engagements-band" aria-labelledby="eng-title">
        <div className="wrap">
          <h2 id="eng-title">{servicesPage.engagementsTitle}</h2>
          <div className="engagements">
            {engagements.map((e) => (
              <article key={e.name} className="engagement">
                <h3>{e.name}</h3>
                <p className="engagement-price tabular">{e.price}</p>
                <p className="engagement-length">{e.length}</p>
                <p>{e.text}</p>
                <ul>
                  {e.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <p className="fine">{servicesPage.engagementsNote}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-process-title">
        <div className="wrap process-split">
          <div>
            <h2 id="svc-process-title">Every project, four rounds</h2>
            <Photo p={photos.brainstorm} className="process-photo" />
          </div>
          <ol className="process process-vertical">
            {process.map((p, i) => (
              <li key={p.name}>
                <span className="process-step tabular" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{p.name}</h3>
                <p className="process-weeks">{p.weeks}</p>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section faq-section" aria-labelledby="faq-title">
        <div className="wrap faq-grid">
          <h2 id="faq-title">{servicesPage.faqTitle}</h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  {f.q}
                  <Plus aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="close close-compact" aria-labelledby="svc-close">
        <div className="wrap close-grid">
          <h2 id="svc-close">Not sure which of these you need?</h2>
          <div className="close-side">
            <p>
              Pick the ones that sound closest. The brief builder suggests a
              team, a timeline and a starting budget as you go.
            </p>
            <Link to="/contact" className="btn btn-citron btn-big">
              Start a brief <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
