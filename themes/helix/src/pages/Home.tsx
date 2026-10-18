import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  home,
  imageAlt,
  images,
  papers,
  pricing,
  roadmap,
  systems,
} from "../content";
import { Cryostat } from "../components/Cryostat";
import { Composer } from "../components/Composer";
import { PaperRow } from "../components/PaperRow";
import { usd } from "../lib/format";

export default function Home() {
  const latest = [...papers]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.heroTitle}</h1>
          <p className="lead">{home.heroLead}</p>
          <div className="actions">
            <Link to="/access" className="btn btn-primary">
              Request access
            </Link>
            <Link to="/systems" className="btn btn-quiet">
              Compare systems
            </Link>
          </div>
          <dl className="hero-status">
            <div>
              <dt>System</dt>
              <dd>{home.status.system}</dd>
            </div>
            <div>
              <dt>Mixing chamber</dt>
              <dd>{home.status.temp}</dd>
            </div>
            <div>
              <dt>Queue</dt>
              <dd>{home.status.queue}</dd>
            </div>
          </dl>
        </div>
        <Cryostat />
      </section>

      <section className="section wrap" aria-labelledby="fleet-h">
        <div className="section-head">
          <h2 id="fleet-h">{home.fleetTitle}</h2>
          <p>{home.fleetLead}</p>
        </div>
        <div className="table-scroll">
          <table className="fleet">
            <thead>
              <tr>
                <th scope="col">System</th>
                <th scope="col">Qubits</th>
                <th scope="col">2Q fidelity</th>
                <th scope="col">T1 median</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              {systems.map((s) => (
                <tr key={s.slug}>
                  <th scope="row">
                    <Link to={`/systems/${s.slug}`}>{s.name}</Link>
                    <span>{s.line}</span>
                  </th>
                  <td>{s.qubits}</td>
                  <td>{s.f2q}%</td>
                  <td>{s.t1} µs</td>
                  <td>
                    <span className="tag" data-access={s.access}>
                      {s.access}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        className="section composer-section"
        aria-labelledby="composer-h"
      >
        <div className="wrap">
          <div className="section-head">
            <h2 id="composer-h">{home.composerTitle}</h2>
            <p>{home.composerLead}</p>
          </div>
          <Composer />
        </div>
      </section>

      <section className="section wrap pipeline" aria-labelledby="pipeline-h">
        <h2 id="pipeline-h">{home.pipelineTitle}</h2>
        <ol className="pipeline-steps">
          {home.pipeline.map((p) => (
            <li key={p.step}>
              <h3>{p.step}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap figures" aria-labelledby="fig-h">
        <h2 id="fig-h" className="visually-hidden">
          {home.photoTitle}
        </h2>
        <figure className="fig-tall">
          <img
            src={images.fridge}
            alt={imageAlt.fridge}
            loading="lazy"
            width={1080}
            height={1440}
          />
          <figcaption>
            <strong>Fig. 2a.</strong> {home.photoCaption}
          </figcaption>
        </figure>
        <figure>
          <img
            src={images.wiring}
            alt={imageAlt.wiring}
            loading="lazy"
            width={890}
            height={768}
          />
          <figcaption>
            <strong>Fig. 2b.</strong> {home.wiringCaption}
          </figcaption>
        </figure>
        <figure>
          <img
            src={images.chip}
            alt={imageAlt.chip}
            loading="lazy"
            width={1800}
            height={1200}
          />
          <figcaption>
            <strong>Fig. 2c.</strong> {home.chipCaption}
          </figcaption>
        </figure>
      </section>

      <section className="section wrap" aria-labelledby="papers-h">
        <div className="section-head">
          <h2 id="papers-h">{home.researchTitle}</h2>
          <Link to="/research" className="text-link">
            All {papers.length} papers <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <ul className="paper-list">
          {latest.map((p) => (
            <PaperRow key={p.slug} paper={p} />
          ))}
        </ul>
      </section>

      <section className="section roadmap-strip" aria-labelledby="road-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="road-h">{home.roadmapTitle}</h2>
            <Link to="/roadmap" className="text-link">
              Full roadmap <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
          <ol className="strip">
            {roadmap.milestones.slice(3, 9).map((m) => (
              <li key={m.year} data-state={m.state}>
                <span className="strip-year">{m.year}</span>
                <span className="strip-title">{m.title}</span>
                <span className="strip-metric">{m.metric}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section wrap quote-block"
        aria-label="From a Moraine user"
      >
        <blockquote>
          <p>“{home.quote.text}”</p>
          <footer>
            <strong>{home.quote.name}</strong>
            <span>{home.quote.role}</span>
          </footer>
        </blockquote>
      </section>

      <section
        className="section wrap pricing-teaser"
        aria-labelledby="price-h"
      >
        <div className="section-head">
          <h2 id="price-h">{home.pricingTitle}</h2>
          <p>{home.pricingLead}</p>
        </div>
        <ul className="plan-strip">
          {pricing.plans.map((p) => (
            <li key={p.id}>
              <span className="plan-strip-name">{p.name}</span>
              <span className="plan-strip-price">
                {p.monthly === null
                  ? "Custom"
                  : p.monthly === 0
                    ? "Free"
                    : `${usd(p.monthly)} / mo`}
              </span>
              <span>{p.minutes}</span>
            </li>
          ))}
        </ul>
        <Link to="/pricing" className="text-link">
          Compare plans and on-demand rates <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="close">
        <div className="wrap close-inner">
          <h2>{home.closeTitle}</h2>
          <p>{home.closeLead}</p>
          <Link to="/access" className="btn btn-gold">
            Request access
          </Link>
        </div>
      </section>
    </>
  );
}
