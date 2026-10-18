import { about, brand, images } from "../content";
import { Link } from "../router";

const RING = [25, 50, 75];
const MAX_MILES = 90;

/** Growers plotted by distance from the studio; the angle only spreads the labels. */
function GrowerMap() {
  const r = (miles: number) => Math.max(18, (miles / MAX_MILES) * 140);
  return (
    <svg
      className="grower-map"
      viewBox="-160 -160 320 320"
      role="img"
      aria-label="Our growers by distance from the studio, all within 75 miles"
    >
      {RING.map((m) => (
        <g key={m}>
          <circle r={r(m)} className="ring" />
          <text y={-r(m) - 4} textAnchor="middle" className="ring-label">
            {m} mi
          </text>
        </g>
      ))}
      <circle r="5" className="studio-dot" />
      <text y="-10" textAnchor="middle" className="map-label map-label-strong">
        Studio
      </text>
      {about.growers.map((g, i) => {
        const a = ((i * 72 + 20) * Math.PI) / 180;
        const x = Math.cos(a) * r(g.miles);
        const y = Math.sin(a) * r(g.miles);
        return (
          <g key={g.name}>
            <line x1="0" y1="0" x2={x} y2={y} className="spoke" />
            <circle cx={x} cy={y} r="4.5" className="grower-dot" />
            <text
              x={x}
              y={y + (y > 0 ? 16 : -9)}
              textAnchor="middle"
              className="map-label"
            >
              {g.short}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function About() {
  return (
    <>
      <header className="page-head page-head-split">
        <div>
          <h1>A narrow studio on Larkspur Row</h1>
          <p className="lead">{about.intro}</p>
        </div>
        <img
          src={images.florist.src}
          alt={images.florist.alt}
          width={images.florist.w}
          height={images.florist.h}
        />
      </header>

      <section className="section story" aria-labelledby="story">
        <img
          src={images.floristStall.src}
          alt={images.floristStall.alt}
          width={images.floristStall.w}
          height={images.floristStall.h}
          loading="lazy"
        />
        <div>
          <h2 id="story">Arranged like a gardener would</h2>
          {about.story.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>
      </section>

      <section
        className="section principles surface-tissue"
        aria-labelledby="rules"
      >
        <h2 id="rules">Three house rules</h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section growers" aria-labelledby="growers">
        <div>
          <h2 id="growers">Where the flowers come from</h2>
          <p>
            Five growers supply most of what we sell from April to October. In
            winter we buy more from the city market, and we tell you on the
            label when we do.
          </p>
          <ul className="grower-list">
            {about.growers.map((g) => (
              <li key={g.name}>
                <strong>{g.name}</strong>
                <span>{g.grows}</span>
                <span className="num">{g.miles} mi</span>
              </li>
            ))}
          </ul>
        </div>
        <GrowerMap />
      </section>

      <section className="section team" aria-labelledby="team">
        <h2 id="team">Who you'll meet</h2>
        <ul className="team-list">
          {about.team.map((t) => (
            <li key={t.name}>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section visit surface-tissue" aria-labelledby="visit">
        <div>
          <h2 id="visit">Come and see the bench</h2>
          <p>
            {brand.street}, {brand.district}. Walk in for a wrapped bunch in ten
            minutes, or <Link to="/weddings">book a wedding consultation</Link>.
          </p>
          <p>
            <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </p>
        </div>
        <dl className="hours">
          {brand.hours.map((h) => (
            <div key={h.days}>
              <dt>{h.days}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
