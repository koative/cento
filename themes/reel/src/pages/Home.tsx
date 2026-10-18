import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { films, flagship, home, img, screenings, services } from "../content";
import { dayLabel } from "../lib/format";
import { TrailerPlayer } from "../components/TrailerPlayer";
import { FilmCard } from "../components/FilmCard";
import { ProductionBoard } from "../components/ProductionBoard";

export function Home() {
  const upcoming = screenings
    .filter((s) => s.film === flagship.slug)
    .slice(0, 4);
  const slate = films.filter((f) => f !== flagship);
  const quoted = films.find((f) => f.slug === "deep-time")?.press;

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="actions">
            <Link to="/films" className="btn btn-primary">
              See the films
            </Link>
            <Link to="/services" className="btn btn-ghost">
              Work with us
            </Link>
          </div>
        </div>
        <div className="hero-screen">
          <TrailerPlayer film={flagship} />
          <p className="hero-caption">
            <Link to={`/films/${flagship.slug}`}>{flagship.title}</Link> —{" "}
            {flagship.logline}
          </p>
        </div>
      </section>

      <section className="band now-showing">
        <div className="wrap now-grid">
          <div>
            <h2 className="h-section">{home.nowShowing.heading}</h2>
            <p>{home.nowShowing.text}</p>
            <Link
              to={`/screenings?film=${flagship.slug}`}
              className="text-link"
            >
              Every date <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="dates">
            {upcoming.map((s) => (
              <li key={s.id}>
                <span className="dates-day">{dayLabel(s.date)}</span>
                <span className="dates-place">
                  <strong>{s.city}</strong> {s.venue}
                </span>
                <span className="dates-kind">{s.kind}</span>
                <span className="tickets" data-state={s.tickets}>
                  {s.tickets}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2 className="h-section">{home.slate.heading}</h2>
          <p>{home.slate.text}</p>
        </div>
        <div className="slate">
          {slate.map((f) => (
            <FilmCard key={f.slug} film={f} />
          ))}
        </div>
      </section>

      {quoted && (
        <figure className="wrap pull">
          <blockquote>“{quoted.quote}”</blockquote>
          <figcaption>
            {quoted.source} on <Link to="/films/deep-time">Deep Time</Link>
          </figcaption>
        </figure>
      )}

      <section className="wrap section">
        <div className="section-head">
          <h2 className="h-section">{home.board.heading}</h2>
          <p>{home.board.text}</p>
        </div>
        <ProductionBoard />
      </section>

      <section className="approach">
        <img
          src={img.editFlatbed.src}
          alt={img.editFlatbed.alt}
          width={img.editFlatbed.w}
          height={img.editFlatbed.h}
          loading="lazy"
        />
        <div className="approach-copy">
          <h2 className="h-section">{home.approach.heading}</h2>
          {home.approach.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <Link to="/studio" className="text-link">
            Meet the studio <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="wrap section">
        <div className="section-head">
          <h2 className="h-section">{home.services.heading}</h2>
          <p>{home.services.text}</p>
        </div>
        <ul className="service-lines">
          {services.map((s) => (
            <li key={s.id}>
              <Link to="/services">
                <span className="service-name">{s.name}</span>
                <span className="service-sum">{s.summary}</span>
                <span className="service-from">{s.from}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap section">
        <h2 className="h-section">{home.festivalsHeading}</h2>
        <ul className="festivals">
          {films
            .filter((f) => f.status === "Released")
            .flatMap((f) => f.festivals.map((fest) => ({ fest, f })))
            .map(({ fest, f }) => (
              <li key={fest}>
                <span>{fest}</span>
                <Link to={`/films/${f.slug}`}>{f.title}</Link>
              </li>
            ))}
        </ul>
      </section>

      <section className="close">
        <img
          src={img.seats.src}
          alt=""
          width={img.seats.w}
          height={img.seats.h}
          loading="lazy"
        />
        <div className="wrap close-copy">
          <h2 className="h-display">{home.close.heading}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/contact?type=screening" className="btn btn-primary">
              Request a screening
            </Link>
            <Link to="/screenings" className="btn btn-ghost">
              Licences and dates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
