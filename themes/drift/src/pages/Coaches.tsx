import { Link } from "../router";
import { coaches } from "../content";

export function Coaches() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Coaches</h1>
          <p className="lede">
            Five coaches, all qualified surf instructors and lifeguards, all in
            the water for every lesson. Between them, a little over a hundred
            years of paddling out.
          </p>
        </div>
      </section>
      <section className="wrap coach-list" aria-label="All coaches">
        {coaches.map((c) => (
          <article key={c.id} className="coach-card">
            <img
              src={c.image.src}
              alt={c.image.alt}
              width={c.image.w}
              height={c.image.h}
              loading="lazy"
              style={{ objectPosition: c.image.pos }}
            />
            <div>
              <h2>
                <Link to={`/coaches/${c.id}`}>{c.name}</Link>
              </h2>
              <p className="coach-role">{c.role}</p>
              <p>{c.short}</p>
              <p className="coach-meta">
                Surfing since <span className="num">{c.since}</span> · {c.board}
              </p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
