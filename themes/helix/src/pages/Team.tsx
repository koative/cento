import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { careers, imageAlt, images, team } from "../content";
import { PageHead } from "../components/PageHead";

export default function Team() {
  return (
    <>
      <PageHead title={team.heading} lead={team.lead} />

      <section className="wrap story" aria-labelledby="story-h">
        <figure className="story-photo">
          <img src={images.lab} alt={imageAlt.lab} width={1600} height={1100} />
        </figure>
        <div className="story-copy">
          <h2 id="story-h">How it started</h2>
          {team.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <dl className="facts">
            {team.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {team.groups.map((g) => (
        <section key={g} className="section wrap people-group" aria-label={g}>
          <h2>{g}</h2>
          <ul className="people">
            {team.people
              .filter((p) => p.group === g)
              .map((p) => (
                <li key={p.name}>
                  <span className="monogram" aria-hidden="true">
                    {p.initials}
                  </span>
                  <h3>{p.name}</h3>
                  <p className="person-role">{p.role}</p>
                  <p>{p.bio}</p>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section className="close">
        <div className="wrap close-inner">
          <h2>
            {careers.openings.length} open roles in hardware, theory and
            software.
          </h2>
          <p>{careers.lead}</p>
          <Link to="/careers" className="btn btn-gold">
            See open roles <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
