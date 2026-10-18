import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, images } from "../content";
import { PageHead, Photo } from "../components/Bits";

export default function About() {
  return (
    <>
      <PageHead title={about.title} lead={about.lead} />

      <section className="wrap about-story">
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="spec-table">
          {about.facts.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd className="num">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="wrap photo-pair">
        <Photo img={images.crewSloped} />
        <Photo img={images.installerKneeling} />
      </div>

      <section className="section wrap">
        <div className="section-head">
          <h2>How we work</h2>
        </div>
        <ul className="principles">
          {about.principles.map((p) => (
            <li key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap">
        <div className="section-head">
          <h2>Some of the people you will meet</h2>
          <p>
            Forty-six of us in all: designers, surveyors, electricians, roofers,
            a permits desk and the service team.
          </p>
        </div>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <strong>{t.name}</strong>
              <span className="team-role">{t.role}</span>
              <span>{t.bio}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap visit">
        <Photo img={images.cells} className="visit-photo" />
        <div>
          <h2>Visit the yard</h2>
          <p>
            Panels, batteries and a working Gateway are on the wall at our
            Foundry Lane yard. Come and see what the hardware looks like before
            it goes on your house.
          </p>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <dl className="footer-hours">
            {brand.hours.map(([d, h]) => (
              <div key={d}>
                <dt>{d}</dt>
                <dd className="num">{h}</dd>
              </div>
            ))}
          </dl>
          <Link to="/quote" className="btn btn-sun">
            Book a free survey <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
