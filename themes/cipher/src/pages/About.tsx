import { ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";
import { Avatar } from "../components/bits";

export default function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.heading}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap story" aria-label="Our story">
        {about.story.map((p) => (
          <p key={p.slice(0, 20)}>{p}</p>
        ))}
      </section>

      <section className="loop" aria-labelledby="principles-title">
        <div className="wrap">
          <h2 id="principles-title">What we hold to</h2>
          <ol className="loop-list three">
            {about.principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap" aria-labelledby="team-title">
        <h2 id="team-title">The people behind it</h2>
        <ul className="team">
          {about.team.map((t) => (
            <li key={t.name}>
              <Avatar initials={t.initials} size="lg" />
              <div>
                <h3>{t.name}</h3>
                <p className="team-role">{t.role}</p>
                <p>{t.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap offices" aria-labelledby="offices-title">
        <h2 id="offices-title">Offices</h2>
        <div className="office-row">
          {about.offices.map((o) => (
            <address key={o.city}>
              <strong>{o.city}</strong>
              {o.lines.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </address>
          ))}
          <address>
            <strong>Say hello</strong>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>
          </address>
        </div>
      </section>

      <section className="wrap" aria-labelledby="roles-title">
        <div className="section-head">
          <h2 id="roles-title">Open roles</h2>
          <p>
            Remote within your region, or in the office if you like the coffee.
            Every role has a public salary range in the listing.
          </p>
        </div>
        <ul className="index-list">
          {about.roles.map((r) => (
            <li key={r.title}>
              <a
                href={`mailto:${brand.careers}?subject=${encodeURIComponent(r.title)}`}
              >
                <span className="index-name">{r.title}</span>
                <span className="index-summary">{r.place}</span>
                <span className="index-meta">{r.team}</span>
                <ArrowUpRight size={18} aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="close slim" aria-labelledby="about-close">
        <div className="wrap close-inner">
          <h2 id="about-close">See what a reviewer sees</h2>
          <div className="actions">
            <Link to="/app" className="btn btn-primary">
              Open the demo workspace
            </Link>
            <Link to="/trust" className="btn btn-quiet">
              Read the trust center
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
