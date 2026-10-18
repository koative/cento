import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  classes,
  events,
  home,
  instructorBySlug,
  instructors,
  passes,
  styleBySlug,
  styles,
  trialPrice,
} from "../content";
import { clock, upNext } from "../lib/util";
import { EventRows, StyleRows } from "../components/Lists";
import { TapTempo } from "../components/TapTempo";
import { spotsLabel } from "../components/ClassItem";

export function Home() {
  const next = upNext(classes);
  const featured = passes.filter((p) =>
    ["drop-in", "ten", "unlimited"].includes(p.id),
  );

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-type">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/trial" className="btn btn-ink btn-lg">
                Book a ${trialPrice} trial class{" "}
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <Link to="/timetable" className="btn btn-line btn-lg">
                See the timetable
              </Link>
            </div>
          </div>
          <figure className="hero-photo">
            <img
              src={home.hero.src}
              alt={home.hero.alt}
              width={home.hero.w}
              height={home.hero.h}
              fetchPriority="high"
            />
          </figure>
          <section className="tonight" aria-labelledby="tonight-title">
            <h2 id="tonight-title">{next.label}</h2>
            <ul>
              {next.items.map((c) => (
                <li key={c.id}>
                  <time>{clock(c.start)}</time>
                  <Link to={`/styles/${c.style}`}>{c.title}</Link>
                  <span>
                    {instructorBySlug(c.teacher)?.name.split(" ")[0]} ·{" "}
                    {c.level} · {spotsLabel(c.spotsLeft)}
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/timetable" className="text-link">
              All {classes.length} classes this week{" "}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </section>
        </div>
      </section>

      <div className="band" aria-hidden="true">
        <div className="band-track">
          {[...home.band, ...home.band, ...home.band].map((w, i) => (
            <span key={i}>{w}</span>
          ))}
        </div>
      </div>

      <section className="section wrap" aria-labelledby="styles-title">
        <div className="section-head">
          <h2 id="styles-title">Eight styles, three rooms, one floor.</h2>
          <p>
            Street, studio and partner dances, each with a beginner class every
            week. Pick by feel, by music, or by the speed you like to move at.
          </p>
        </div>
        <StyleRows list={styles} />
      </section>

      <section className="section-ink">
        <div className="wrap">
          <TapTempo />
        </div>
      </section>

      <section
        className="section wrap first-class"
        aria-labelledby="first-title"
      >
        <div className="section-head">
          <h2 id="first-title">{home.firstClass.title}</h2>
          <p>
            A 7:00 pm class, as it actually goes. Swap the times for any class
            on the board.
          </p>
        </div>
        <ol className="minutes">
          {home.firstClass.steps.map((s) => (
            <li key={s.time}>
              <time>{s.time}</time>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" aria-labelledby="team-title">
        <div className="section-head section-head-row">
          <h2 id="team-title">Seven teachers who remember starting out.</h2>
          <Link to="/instructors" className="text-link">
            Meet the instructors <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="team-strip">
          {instructors.slice(0, 4).map((p) => (
            <li key={p.slug}>
              <img
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.w}
                height={p.image.h}
                loading="lazy"
                style={{ objectPosition: p.image.pos }}
              />
              <h3>{p.name}</h3>
              <p>{p.styles.map((s) => styleBySlug(s)?.name).join(" & ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-paper2">
        <div className="wrap price-board" aria-labelledby="price-title">
          <div className="section-head">
            <h2 id="price-title">Pay for the way you dance.</h2>
            <p>
              No joining fee. No annual fee. Cards you can share with a friend,
              memberships you can freeze.
            </p>
          </div>
          <dl className="price-lines">
            <div>
              <dt>First class</dt>
              <dd>
                <b>${trialPrice}</b> once, any style
              </dd>
            </div>
            {featured.map((p) => (
              <div key={p.id}>
                <dt>{p.name}</dt>
                <dd>
                  <b>${p.price}</b>{" "}
                  {p.unit === "month"
                    ? "a month"
                    : p.unit === "card"
                      ? `· $${p.perClass} a class`
                      : "a class"}
                </dd>
              </div>
            ))}
          </dl>
          <Link to="/passes" className="btn btn-ink">
            All passes and memberships
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="events-title">
        <div className="section-head section-head-row">
          <h2 id="events-title">After hours.</h2>
          <Link to="/events" className="text-link">
            Every event <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <EventRows list={events.slice(0, 3)} />
      </section>

      <section className="quote-block">
        <figure className="wrap">
          <blockquote>
            <p>{home.quote.text}</p>
          </blockquote>
          <figcaption>— {home.quote.who}</figcaption>
        </figure>
      </section>

      <section className="section wrap close" aria-labelledby="close-title">
        <h2 id="close-title">{home.close.title}</h2>
        <p className="lede">{home.close.text}</p>
        <div className="actions">
          <Link to="/trial" className="btn btn-ink btn-lg">
            Book my trial <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <p className="close-where">
          {brand.address.join(", ")} · {brand.hours[0].days}{" "}
          {brand.hours[0].time}
        </p>
      </section>
    </>
  );
}
