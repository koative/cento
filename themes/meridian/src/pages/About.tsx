import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, agents, sell } from "../content";

export function About() {
  const founder = agents[0];
  return (
    <>
      <section className="page-head wrap about-head">
        <div>
          <h1>{about.title}</h1>
          {about.intro.map((p, i) => (
            <p key={p.slice(0, 24)} className={i === 0 ? "lede" : undefined}>
              {p}
            </p>
          ))}
        </div>
        <figure className="founder">
          <img src={founder.photo} alt={`Portrait of ${founder.name}`} />
          <figcaption>
            <Link to={"/agents/" + founder.id}>{founder.name}</Link>, who still
            answers the phone on Saturdays.
          </figcaption>
        </figure>
      </section>

      <section className="wrap section">
        <h2>How we work</h2>
        <dl className="principles">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section">
        <h2>Thirty-nine years on Mercer Street</h2>
        <ol className="years">
          {about.timeline.map((t) => (
            <li key={t.year}>
              <span className="num">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section fees" aria-labelledby="about-fees">
        <h2 id="about-fees">What we charge</h2>
        <dl className="fee-list">
          {sell.fees.map((f) => (
            <div key={f.name}>
              <dt>{f.name}</dt>
              <dd className="fee-price num">{f.price}</dd>
              <dd className="muted">{f.note}</dd>
            </div>
          ))}
        </dl>
        <p className="fine">
          No upfront fees, no tie-in period, no charge for withdrawing. Lettings
          fees are charged to landlords only.
        </p>
      </section>

      <section className="close-band">
        <div className="wrap close-inner">
          <h2>Come and see the map on the wall</h2>
          <p>
            The office is open six days a week, and the coffee is better than
            you would expect.
          </p>
          <div className="btn-row">
            <Link to="/contact" className="btn btn-light">
              Find the office <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/agents" className="btn btn-ghost-light">
              Meet the agents
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
