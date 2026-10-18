import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, teachers } from "../content";

export function About() {
  const r = about.retreat;
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lead">{about.lead}</p>
      </header>

      <section className="wrap story">
        <div className="prose prose-large">
          {about.story.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
        <ul className="story-faces" aria-label="The teachers">
          {teachers.map((t) => (
            <li key={t.slug}>
              <Link to={`/teachers/${t.slug}`}>
                <img
                  src={t.image.src}
                  alt=""
                  width={t.image.w}
                  height={t.image.h}
                  loading="lazy"
                />
                <span>{t.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="lavender values">
        <div className="wrap">
          <h2>What we hold to</h2>
          <dl className="values-list">
            {about.values.map((v) => (
              <div key={v.title}>
                <dt>{v.title}</dt>
                <dd>{v.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap rooms" aria-labelledby="rooms-title">
        <h2 id="rooms-title">Two rooms</h2>
        <div className="rooms-grid">
          {about.rooms.map((room) => (
            <div key={room.name}>
              <h3>{room.name}</h3>
              <p>{room.text}</p>
            </div>
          ))}
        </div>
        <RoomPlan />
      </section>

      <section className="wrap retreat">
        <figure>
          <img
            src={r.image.src}
            alt={r.image.alt}
            width={r.image.w}
            height={r.image.h}
            loading="lazy"
          />
        </figure>
        <div>
          <h2>{r.title}</h2>
          <p>{r.text}</p>
          <Link to="/memberships" className="text-link">
            Become a member <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}

/** Schematic floor plan of the second floor: one mat per place in each room. */
function RoomPlan() {
  const mats = Array.from({ length: 22 }, (_, i) => ({
    x: 40 + (i % 11) * 52,
    y: i < 11 ? 46 : 150,
  }));
  return (
    <figure className="plan-figure">
      <svg
        viewBox="0 0 960 260"
        role="img"
        aria-label="Floor plan: the Long Room with 22 mats in two rows beside nine east windows, the lobby in the middle, and the Small Room with 10 cushions"
      >
        <rect x="10" y="10" width="600" height="240" className="plan-wall" />
        <rect
          x="620"
          y="10"
          width="110"
          height="240"
          className="plan-wall plan-soft"
        />
        <rect x="740" y="10" width="210" height="240" className="plan-wall" />
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={40 + i * 64}
            x2={80 + i * 64}
            y1="10"
            y2="10"
            className="plan-window"
          />
        ))}
        {mats.map((m, i) => (
          <rect
            key={i}
            x={m.x}
            y={m.y}
            width="34"
            height="70"
            rx="4"
            className="plan-mat"
          />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <circle
            key={i}
            cx={785 + (i % 5) * 32}
            cy={i < 5 ? 90 : 170}
            r="12"
            className="plan-mat"
          />
        ))}
        <text x="310" y="238" className="plan-label">
          Long Room
        </text>
        <text x="675" y="138" className="plan-label">
          Lobby
        </text>
        <text x="845" y="238" className="plan-label">
          Small Room
        </text>
      </svg>
      <figcaption>
        The second floor. East windows along the top of the Long Room; tea and
        shoes in the lobby.
      </figcaption>
    </figure>
  );
}
