import { Link } from "../router";
import { brand, classes, instructors, styleBySlug, weekdays } from "../content";
import { clock } from "../lib/util";
import { PageHead } from "../components/Lists";

export function Instructors() {
  return (
    <>
      <PageHead
        title="The people at the front. Briefly."
        intro="Seven teachers, most of whom started dancing as adults. They rotate the lines, learn your name in week one and will happily explain a move a fourth time."
      />
      <ul className="wrap instructor-list">
        {instructors.map((p) => {
          const teaches = classes
            .filter((c) => c.teacher === p.slug)
            .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
          return (
            <li key={p.slug} className="instructor">
              <img
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.w}
                height={p.image.h}
                loading="lazy"
                style={{ objectPosition: p.image.pos }}
              />
              <div className="instructor-text">
                <h2>{p.name}</h2>
                <p className="instructor-styles">
                  {p.styles.map((s, i) => (
                    <span key={s}>
                      {i > 0 && " & "}
                      <Link to={`/styles/${s}`}>{styleBySlug(s)?.name}</Link>
                    </span>
                  ))}
                  <span className="muted">
                    {" "}
                    · teaching at {brand.name} since {p.since}
                  </span>
                </p>
                <p>{p.bio}</p>
                <p className="muted">Plays: {p.plays}</p>
                <h3 className="sr-only">Classes with {p.name.split(" ")[0]}</h3>
                <ul className="instructor-classes">
                  {teaches.map((c) => (
                    <li key={c.id}>
                      <b>{weekdays[c.day].slice(0, 3)}</b> {clock(c.start)} ·{" "}
                      {c.title}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
      <section className="section wrap teach">
        <h2>Want to teach here?</h2>
        <p className="lede">
          We hire twice a year and pay guest teachers from each style's own
          scene at a proper day rate. Send a short video of you teaching (not
          performing) to <a href={`mailto:${brand.email}`}>{brand.email}</a>.
        </p>
      </section>
    </>
  );
}
