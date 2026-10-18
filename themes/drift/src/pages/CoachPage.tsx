import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { camps, coaches, lessons, type Coach } from "../content";

export function CoachPage({ coach }: { coach: Coach }) {
  const teachLessons = lessons.filter((l) => coach.teaches.includes(l.id));
  const teachCamps = camps.filter((c) => coach.teaches.includes(c.id));
  const others = coaches.filter((c) => c.id !== coach.id);

  return (
    <>
      <section className="wrap coach-hero">
        <img
          src={coach.image.src}
          alt={coach.image.alt}
          width={coach.image.w}
          height={coach.image.h}
          style={{ objectPosition: coach.image.pos }}
        />
        <div>
          <Link to="/coaches" className="back">
            <ArrowLeft aria-hidden="true" size={16} /> All coaches
          </Link>
          <h1>{coach.name}</h1>
          <p className="coach-role">{coach.role}</p>
          <blockquote className="coach-quote">
            <p>{coach.quote}</p>
          </blockquote>
          <dl className="facts">
            <div>
              <dt>Surfing since</dt>
              <dd className="num">{coach.since}</dd>
            </div>
            <div>
              <dt>From</dt>
              <dd>{coach.from}</dd>
            </div>
            <div>
              <dt>Board</dt>
              <dd>{coach.board}</dd>
            </div>
            <div>
              <dt>Favourite session</dt>
              <dd>{coach.spot}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wrap coach-body">
        <div>
          <h2>About {coach.name.split(" ")[0]}</h2>
          {coach.bio.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <h2>Qualifications</h2>
          <ul className="ticks">
            {coach.certs.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
        <aside className="coach-teaches" aria-labelledby="h-teaches">
          <h2 id="h-teaches">Surf with {coach.name.split(" ")[0]}</h2>
          <ul>
            {teachLessons.map((l) => (
              <li key={l.id}>
                <Link to="/lessons">{l.name}</Link>
                <span>Lesson · {l.duration}</span>
              </li>
            ))}
            {teachCamps.map((c) => (
              <li key={c.id}>
                <Link to={`/camps/${c.id}`}>{c.name}</Link>
                <span>Camp · {c.length}</span>
              </li>
            ))}
          </ul>
          <Link to="/book?lesson=private" className="btn btn-ink">
            Book a private session <ArrowRight aria-hidden="true" size={18} />
          </Link>
          <p className="quiet">
            Add “with {coach.name.split(" ")[0]}” in the notes and we'll do our
            best to match you.
          </p>
        </aside>
      </section>

      <section className="section" aria-labelledby="h-others">
        <div className="wrap">
          <h2 id="h-others">The rest of the crew</h2>
          <ul className="coach-strip">
            {others.map((c) => (
              <li key={c.id}>
                <Link to={`/coaches/${c.id}`}>
                  <img
                    src={c.image.src}
                    alt=""
                    width={c.image.w}
                    height={c.image.h}
                    loading="lazy"
                    style={{ objectPosition: c.image.pos }}
                  />
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
