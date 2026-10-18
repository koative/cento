import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  courses,
  fees,
  home,
  homeSample,
  hours,
  images,
  languages,
  levelTests,
  teachers,
  testimonials,
} from "../content";
import { WordCard } from "../components/WordCard";
import { CourseRow, langStyle, Marked, MoreLink } from "../components/Bits";
import { langOf, longDate, money, minutes } from "../lib/format";

const soonest = [...courses]
  .sort((a, b) => a.start.localeCompare(b.start))
  .slice(0, 5);
const tuesday = courses
  .flatMap((c) =>
    c.sessions
      .filter((s) => s.day === 1)
      .map((s) => ({ course: c, session: s })),
  )
  .sort((a, b) => minutes(a.session.start) - minutes(b.session.start));
const termStart = fees.terms[0];

export function Home() {
  return (
    <>
      <section className="hero wrap">
        <div className="hero-text">
          <h1>{home.title}</h1>
          <p className="lead">{home.lead}</p>
          <div className="actions">
            <Link to="/courses" className="btn">
              Browse this term's courses{" "}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link to="/level-test" className="btn btn-ghost">
              Take the level test
            </Link>
          </div>
          <p className="hero-note">
            {termStart.name} begins{" "}
            {longDate(courses.map((c) => c.start).sort()[0])}. Groups of eight
            at most.
          </p>
        </div>
        <WordCard />
      </section>

      <section className="wrap section soon" aria-labelledby="soon-h">
        <div className="section-head">
          <h2 id="soon-h">Starting in the next few weeks</h2>
          <MoreLink to="/courses">All {courses.length} courses</MoreLink>
        </div>
        <ul className="course-list">
          {soonest.map((c) => (
            <CourseRow key={c.id} course={c} />
          ))}
        </ul>
      </section>

      <section className="section shelf-section" aria-labelledby="langs-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="langs-h">Six languages, six rooms.</h2>
            <p>
              Each language has its own room, named after a poet who wrote in
              it, and its own head teacher.
            </p>
          </div>
          <ul className="shelf">
            {languages.map((l) => (
              <li key={l.id} style={langStyle(l.color)}>
                <img
                  src={l.image.src}
                  alt={l.image.alt}
                  width={l.image.w}
                  height={l.image.h}
                  loading="lazy"
                />
                <div className="shelf-text">
                  <h3>
                    <Link to={`/courses?lang=${l.id}`}>{l.name}</Link>
                  </h3>
                  <p className="shelf-native" lang={l.code}>
                    {l.native} · {l.room}
                  </p>
                  <p>{l.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section method" aria-labelledby="method-h">
        <div className="method-text">
          <h2 id="method-h">{home.method.title}</h2>
          {home.method.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <MoreLink to="/about">How the school works</MoreLink>
        </div>
        <figure className="method-photo">
          <img
            src={images.classroom.src}
            alt={images.classroom.alt}
            width={images.classroom.w}
            height={images.classroom.h}
            loading="lazy"
          />
        </figure>
        <ul
          className="parallel"
          aria-label="Three proverbs about learning, with translations"
        >
          {home.method.parallel.map((p, n) => (
            <li key={p.text}>
              <p lang={["fr", "it", "es"][n]}>{p.text}</p>
              <p className="tr">{p.translation}</p>
            </li>
          ))}
        </ul>
      </section>

      <SampleQuestion />

      <section className="wrap section day" aria-labelledby="day-h">
        <div className="section-head">
          <h2 id="day-h">An ordinary Tuesday on Calder Street</h2>
          <MoreLink to="/timetable">The whole week</MoreLink>
        </div>
        <ol className="day-line">
          {tuesday.map(({ course, session }) => {
            const l = langOf(course.lang);
            return (
              <li key={course.id} style={langStyle(l.color)}>
                <time className="num">{session.start}</time>
                <div>
                  <Link to={`/courses/${course.id}`}>{course.title}</Link>
                  <p>
                    {l.name} {course.levels.join("–")} · {course.room} · until{" "}
                    {session.end}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section teachers-band" aria-labelledby="teach-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="teach-h">Taught by people who grew up in the language.</h2>
            <MoreLink to="/teachers">
              Meet all {teachers.length} teachers
            </MoreLink>
          </div>
          <dl className="entries">
            {teachers.slice(1, 4).map((t) => (
              <div key={t.id} className="entry">
                <dt>
                  {t.name} <span className="pron">/{t.pron}/</span>
                </dt>
                <dd>
                  <i>
                    {t.role}, from {t.from}.
                  </i>{" "}
                  {t.bio}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section voices" aria-labelledby="voices-h">
        <h2 id="voices-h" className="vh">
          What students say
        </h2>
        <figure className="voice-main">
          <blockquote>
            <p>{testimonials[0].quote}</p>
          </blockquote>
          <figcaption>
            {testimonials[0].name} · {testimonials[0].course}
          </figcaption>
        </figure>
        <div className="voice-side">
          {testimonials.slice(1).map((t) => (
            <figure key={t.name}>
              <blockquote>
                <p>{t.quote}</p>
              </blockquote>
              <figcaption>
                {t.name} · {t.course}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="wrap section terms-strip" aria-labelledby="terms-h">
        <h2 id="terms-h">
          From {money(fees.plans[0].term)} a term, <em>materials included.</em>
        </h2>
        <dl>
          {fees.terms.map((t) => (
            <div key={t.name}>
              <dt>{t.name}</dt>
              <dd>{t.dates}</dd>
            </div>
          ))}
        </dl>
        <MoreLink to="/fees">Fees, discounts and refunds</MoreLink>
      </section>

      <section className="close" aria-labelledby="close-h">
        <div className="wrap close-inner">
          <div>
            <h2 id="close-h">{home.close.title}</h2>
            <p>{home.close.text}</p>
            <div className="actions">
              <Link to="/enrol" className="btn btn-light">
                Enrol now <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/level-test" className="btn btn-ghost-light">
                Find my level first
              </Link>
            </div>
          </div>
          <div className="close-visit">
            <p>
              {brand.address}
              <br />
              {brand.addressNote}
            </p>
            <dl>
              {hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd className="num">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}

function SampleQuestion() {
  const q = levelTests[homeSample.lang]![homeSample.question];
  const lang = langOf(homeSample.lang);
  const [chosen, setChosen] = useState<number | null>(null);
  return (
    <section className="section sample" aria-labelledby="sample-h">
      <div className="wrap sample-inner">
        <div className="sample-text">
          <h2 id="sample-h">Try one sentence.</h2>
          <p>
            This is question two of the {lang.name} level test. The full test
            has eight, takes about ten minutes, and suggests a group at the end.
          </p>
          <MoreLink to="/level-test">Take the full level test</MoreLink>
        </div>
        <div className="sample-sheet">
          <fieldset>
            <legend>
              <span className="marked" lang={lang.code}>
                {q.prompt.replace("___", "______")}
              </span>
              <span className="gloss-line">{q.gloss}</span>
            </legend>
            <div className="options">
              {q.options.map((o, n) => (
                <label key={o} className="option">
                  <input
                    type="radio"
                    name="sample"
                    checked={chosen === n}
                    onChange={() => setChosen(n)}
                  />
                  <span lang={lang.code}>{o}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div aria-live="polite" className="sample-result">
            {chosen === null ? (
              <p className="sample-wait">
                Choose a word and it comes back marked.
              </p>
            ) : (
              <>
                <Marked q={q} chosen={chosen} lang={lang.code} />
                <p>
                  {chosen === q.answer
                    ? "Right. "
                    : `Not quite: it is “${q.options[q.answer]}”. `}
                  {homeSample.why}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      <img
        className="sample-photo"
        src={images.notebook.src}
        alt=""
        width={images.notebook.w}
        height={images.notebook.h}
        loading="lazy"
      />
    </section>
  );
}
