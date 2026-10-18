import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  classes,
  instructors,
  styles,
  trialPrice,
  type DanceStyle,
} from "../content";
import { useWeek } from "../lib/week";
import { ClassItem } from "../components/ClassItem";
import { StyleRows } from "../components/Lists";

export function StylePage({ style: s }: { style: DanceStyle }) {
  const week = useWeek();
  const list = classes
    .filter((c) => c.style === s.slug)
    .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start));
  const teachers = instructors.filter((i) => i.styles.includes(s.slug));
  const related = styles.filter(
    (x) => x.family === s.family && x.slug !== s.slug,
  );

  return (
    <>
      <section className="style-hero wrap">
        <div className="style-hero-text">
          <nav aria-label="Breadcrumb" className="crumb">
            <Link to="/styles">Styles</Link> / {s.family}
          </nav>
          <h1>{s.name}</h1>
          <p className="lede">{s.intro}</p>
          <div className="actions">
            <Link to={`/trial?style=${s.slug}`} className="btn btn-ink btn-lg">
              Try {s.name} for ${trialPrice}
            </Link>
            <Link
              to={`/timetable?style=${s.slug}`}
              className="btn btn-line btn-lg"
            >
              On the timetable
            </Link>
          </div>
        </div>
        <figure className="style-hero-photo">
          <img
            src={s.image.src}
            alt={s.image.alt}
            width={s.image.w}
            height={s.image.h}
            style={{ objectPosition: s.image.pos }}
          />
        </figure>
      </section>

      <dl className="wrap facts">
        <div>
          <dt>Tempo</dt>
          <dd className="num">
            {s.bpm[0]}–{s.bpm[1]} BPM
          </dd>
        </div>
        <div>
          <dt>Music</dt>
          <dd>{s.music}</dd>
        </div>
        <div>
          <dt>Wear</dt>
          <dd>{s.wear}</dd>
        </div>
        <div>
          <dt>Classes a week</dt>
          <dd className="num">{list.length}</dd>
        </div>
      </dl>

      <section className="section wrap style-body">
        <div className="prose">
          <h2>How we teach it</h2>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h3>Your first class</h3>
          <p>{s.firstClass}</p>
        </div>
        <div className="learn">
          <h2>What you'll learn</h2>
          <ol>
            {s.learn.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ol>
        </div>
      </section>

      {s.gallery && (
        <figure className="wrap wide-photo">
          <img
            src={s.gallery.src}
            alt={s.gallery.alt}
            width={s.gallery.w}
            height={s.gallery.h}
            loading="lazy"
          />
        </figure>
      )}

      <section className="section wrap" aria-labelledby="week-classes">
        <div className="section-head section-head-row">
          <h2 id="week-classes">{s.name} this week</h2>
          <Link to="/timetable" className="text-link">
            Price my week on the timetable{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="class-grid">
          {list.map((c) => (
            <ClassItem key={c.id} c={c} picked={week.includes(c.id)} showDay />
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="teachers-title">
        <h2 id="teachers-title">Taught by</h2>
        <ul className="teacher-mini">
          {teachers.map((t) => (
            <li key={t.slug}>
              <img
                src={t.image.src}
                alt=""
                width={t.image.w}
                height={t.image.h}
                loading="lazy"
                style={{ objectPosition: t.image.pos }}
              />
              <div>
                <h3>{t.name}</h3>
                <p>{t.bio}</p>
                <Link to="/instructors" className="text-link">
                  All instructors <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {related.length > 0 && (
        <section className="section wrap" aria-labelledby="related-title">
          <h2 id="related-title">Also in {s.family.toLowerCase()}</h2>
          <StyleRows list={related} />
        </section>
      )}
    </>
  );
}
