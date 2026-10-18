import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  classes,
  home,
  intro,
  passes,
  plans,
  sessions,
  teachers,
} from "../content";
import { Breather } from "../components/Breather";
import { bookHref, Effort } from "../components/SessionRow";
import {
  classOf,
  money,
  nextSessions,
  roomOf,
  sessionsOn,
  teacherOf,
  upcomingDays,
} from "../lib/week";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Home() {
  const next = nextSessions(3);
  const [preview, setPreview] = useState(classes[0].slug);
  const shown = classes.find((c) => c.slug === preview)!;
  const tomorrow = sessionsOn(upcomingDays()[1])[0];
  const today = (new Date().getDay() + 6) % 7;

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>
            {home.hero.title[0]}
            <br />
            <em>{home.hero.title[1]}</em>
          </h1>
          <p className="lead">{home.hero.lead}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-primary">
              Book a class <ArrowRight aria-hidden="true" size={16} />
            </Link>
            <Link to="/schedule" className="btn btn-ghost">
              See this week
            </Link>
          </div>
        </div>
        <figure className="hero-image">
          <img
            src={home.hero.image.src}
            alt={home.hero.image.alt}
            width={home.hero.image.w}
            height={home.hero.image.h}
            fetchPriority="high"
          />
        </figure>
        <div className="upnext">
          <h2>Up next</h2>
          <ul>
            {next.map((s) => (
              <li key={s.session.id + s.day.iso}>
                <Link to={bookHref(s)} className="upnext-item">
                  <span className="upnext-when">
                    {s.day.label} <strong>{s.session.time}</strong>
                  </span>
                  <span className="upnext-name">{classOf(s.session).name}</span>
                  <span className="upnext-meta">
                    {teacherOf(s.session).name.split(" ")[0]} ·{" "}
                    {s.left ? `${s.left} places` : "Waitlist"}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="statement wrap">
        <h2>
          {home.philosophy.title[0]} {home.philosophy.title[1]}{" "}
          <em>{home.philosophy.em}</em>
        </h2>
        <p>{home.philosophy.text}</p>
      </section>

      <section className="ways wrap" aria-labelledby="ways-title">
        <div className="section-head">
          <h2 id="ways-title">Eight ways in</h2>
          <p>
            Three kinds of class: some move, some soften, some barely move at
            all. Every one of them is open to beginners.
          </p>
        </div>
        <div className="ways-grid">
          <ul className="ways-list">
            {classes.map((c) => (
              <li
                key={c.slug}
                data-active={c.slug === preview ? "" : undefined}
              >
                <Link
                  to={`/classes/${c.slug}`}
                  onMouseEnter={() => setPreview(c.slug)}
                  onFocus={() => setPreview(c.slug)}
                >
                  <span className="ways-name">{c.name}</span>
                  <span className="ways-summary">{c.summary}</span>
                  <span className="ways-meta">
                    {c.focus} · {c.minutes} min
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <figure className="ways-preview" aria-hidden="true">
            <img
              key={shown.slug}
              src={shown.image.src}
              alt=""
              width={shown.image.w}
              height={shown.image.h}
              loading="lazy"
            />
            <figcaption>
              <span>{shown.name}</span>
              <Effort level={shown.effort} />
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="dusk breathe-band">
        <div className="wrap breathe-band-grid">
          <div>
            <h2>
              Take this moment. <em>It's yours.</em>
            </h2>
            <p>
              Before you do the next thing, try doing a little less. One minute
              of a longer out-breath is the way most of our classes begin.
            </p>
            <Link to="/breathe" className="text-link">
              Four patterns in the full breathing guide{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <Breather compact />
        </div>
      </section>

      <section className="glance wrap" aria-labelledby="glance-title">
        <div className="section-head">
          <h2 id="glance-title">A week at Still</h2>
          <p>
            {sessions.length} classes, the same every week, in two rooms.{" "}
            <Link to="/schedule">Book from the full schedule</Link>.
          </p>
        </div>
        <div className="glance-grid">
          {weekdays.map((d, i) => (
            <div
              key={d}
              className="glance-day"
              data-today={i === today ? "" : undefined}
            >
              <h3>
                {d}
                {i === today && <span className="sr-only"> (today)</span>}
              </h3>
              <ul>
                {sessions
                  .filter((s) => s.day === i)
                  .map((s) => (
                    <li key={s.id} data-focus={classOf(s).focus}>
                      <time>{s.time}</time> {classOf(s).name}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="glance-key" aria-label="Key">
          <span data-focus="Move">Move</span>
          <span data-focus="Soften">Soften</span>
          <span data-focus="Settle">Settle</span>
        </p>
      </section>

      <section className="faces wrap" aria-labelledby="faces-title">
        <div className="section-head">
          <h2 id="faces-title">Five teachers, one pace</h2>
          <Link to="/teachers" className="text-link">
            Meet the teachers <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <ul className="faces-row">
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
                <span className="faces-name">{t.name}</span>
                <span className="faces-role">{t.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="lavender newhere">
        <div className="wrap newhere-grid">
          <div>
            <h2>New here? Start with a fortnight.</h2>
            <p className="newhere-price">
              <strong>{money(intro.price)}</strong> for fourteen days of every
              class
            </p>
            <Link to="/book" className="btn btn-primary">
              Book your first class
            </Link>
          </div>
          <ol className="steps">
            {home.steps.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="quotes wrap" aria-label="What members say">
        {home.quotes.map((q) => (
          <figure key={q.who}>
            <blockquote>{q.text}</blockquote>
            <figcaption>{q.who}</figcaption>
          </figure>
        ))}
      </section>

      <section className="prices wrap" aria-labelledby="prices-title">
        <div className="section-head">
          <h2 id="prices-title">Simple prices</h2>
          <Link to="/memberships" className="text-link">
            All memberships and passes{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        <dl className="price-line">
          {[passes[0], passes[2]].map((p) => (
            <div key={p.id}>
              <dt>{p.name}</dt>
              <dd>
                <strong>{money(p.price)}</strong>
                {p.detail}
              </dd>
            </div>
          ))}
          <div>
            <dt>{plans[1].name}</dt>
            <dd>
              <strong>{money(plans[1].monthly)}</strong>a month, every class on
              the schedule.
            </dd>
          </div>
        </dl>
      </section>

      {tomorrow && (
        <section className="lavender closing">
          <div className="wrap closing-inner">
            <h2>
              The {roomOf(tomorrow.session).name} is quiet at{" "}
              {tomorrow.session.time} tomorrow.
            </h2>
            <p>{home.close.text}</p>
            <Link to={bookHref(tomorrow)} className="btn btn-primary">
              Book {classOf(tomorrow.session).name}, {upcomingDays()[1].short}{" "}
              {tomorrow.session.time}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
