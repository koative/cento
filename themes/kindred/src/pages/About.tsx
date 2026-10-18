import { MapPin, Phone } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";
import { HoursList } from "../components/Hours";

export function About() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>About Kindred</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <section className="wrap section about-story" aria-labelledby="story-h">
        <div className="prose">
          <h2 id="story-h">An open door since 1987</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <ol className="timeline" aria-label="Milestones">
          {about.milestones.map((m) => (
            <li key={m.year}>
              <span className="num">{m.year}</span>
              <p>{m.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="band band-forest" aria-labelledby="building-h">
        <div className="wrap building">
          <h2 id="building-h">The building on Orchard Road</h2>
          <dl>
            {about.building.map((b) => (
              <div key={b.title}>
                <dt>{b.title}</dt>
                <dd>{b.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section" aria-labelledby="team-h">
        <h2 id="team-h">The people you'll meet</h2>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <span className="initials" aria-hidden="true">
                {t.name
                  .replace("Dr. ", "")
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <div>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <p>{t.note}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="team-more">
          Plus fourteen kennel staff, two vet nurses and around 140 volunteers.{" "}
          <Link to="/volunteer">Join them</Link>.
        </p>
      </section>

      <section className="wrap section visit" aria-labelledby="visit-h">
        <div>
          <h2 id="visit-h">Visiting</h2>
          <p className="visit-address">
            <MapPin aria-hidden="true" />
            <span>{brand.address.join(", ")}</span>
          </p>
          <p className="visit-address">
            <Phone aria-hidden="true" />
            <a href={brand.phoneHref}>{brand.phone}</a>
          </p>
          <ul className="notes">
            {about.visitNotes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div className="visit-hours">
          <HoursList />
        </div>
      </section>
    </div>
  );
}
