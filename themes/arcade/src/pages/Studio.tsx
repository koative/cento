import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, games, studio, team } from "../content";
import { Avatar } from "../components/PixelArt";

export function Studio() {
  return (
    <>
      <div className="page wrap">
        <header className="page-head">
          <h1>{studio.title}</h1>
          <p className="lede">{studio.lede}</p>
        </header>

        <section className="studio-story">
          <div className="prose">
            <h2>How we got here</h2>
            {studio.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ol className="timeline" aria-label="Studio timeline">
            {studio.timeline.map((t) => {
              const game = games.find((g) => g.slug === t.game);
              return (
                <li key={t.year}>
                  <span className="timeline-year num">{t.year}</span>
                  <p>
                    {t.text}
                    {game && (
                      <>
                        {" "}
                        <Link to={`/games/${game.slug}`}>See {game.name}</Link>
                      </>
                    )}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>
      </div>

      <section className="principles" aria-labelledby="principles-title">
        <div className="wrap">
          <h2 id="principles-title">How we work</h2>
          <ul>
            {studio.principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap team" aria-labelledby="team-title">
        <div className="section-head">
          <h2 id="team-title">The team</h2>
          <p>Nine people, drawn by Priya, twelve pixels square.</p>
        </div>
        <ul className="team-grid">
          {team.map((p) => (
            <li key={p.name}>
              <Avatar person={p} className="team-face" />
              <h3>{p.name}</h3>
              <p className="team-role">{p.role}</p>
              <p>{p.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap visit" aria-labelledby="visit-title">
        <div>
          <h2 id="visit-title">{studio.visit.title}</h2>
          <p>{studio.visit.text}</p>
          <Link to="/jobs" className="text-link">
            Or come and work here <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <address>
          {brand.address.map((l) => (
            <span key={l}>{l}</span>
          ))}
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.phoneHref}>{brand.phone}</a>
        </address>
      </section>
    </>
  );
}
