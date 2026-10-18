import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  barbers,
  brand,
  cuts,
  days,
  tierSurcharge,
  type Barber,
} from "../content";
import { clock, hoursLabel, money } from "../lib/format";
import { slotsFor, upcomingDays, whenLabel, workdays } from "../lib/slots";

export function BarberPage({ barber }: { barber: Barber }) {
  const work = cuts.filter((c) => c.barber === barber.id);
  const others = barbers.filter((b) => b.id !== barber.id);
  const next = upcomingDays(7)
    .map((date) => ({ date, time: slotsFor(barber, date, 40)[0] }))
    .find((x) => x.time);
  const extra = tierSurcharge[barber.tier];

  return (
    <article className="barber-page">
      <header className="wrap barber-hero">
        <figure className="barber-hero-photo">
          <img
            src={barber.photo.src}
            alt={barber.photo.alt}
            width={barber.photo.w}
            height={barber.photo.h}
          />
        </figure>
        <div className="barber-hero-copy">
          <p className="crumbs">
            <Link to="/barbers">The barbers</Link> / Chair {barber.chair}
          </p>
          <h1>{barber.name}</h1>
          <p className="barber-tier">
            {barber.tier} · cutting since {barber.since}
            {extra
              ? ` · adds ${money(extra)} to the board price`
              : " · board prices"}
          </p>
          {barber.bio.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <div className="actions">
            <Link to={`/book?barber=${barber.id}`} className="btn btn-red">
              Book with {barber.name.split(" ")[0]}
            </Link>
            {next && (
              <p className="next-free">
                Next free: {whenLabel(next.date)} at {clock(next.time!)}
              </p>
            )}
          </div>
        </div>
      </header>

      <section
        className="wrap barber-facts"
        aria-label={`${barber.name.split(" ")[0]} in short`}
      >
        <div>
          <h2>Ask for</h2>
          <p className="signature">{barber.signature}</p>
        </div>
        <div>
          <h2>Best at</h2>
          <ul className="tags">
            {barber.specialties.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>In the chair</h2>
          <p>{workdays(barber.days)}</p>
          <ol className="week" aria-label="Weekly schedule">
            {[2, 3, 4, 5, 6, 0, 1].map((d) => {
              const on = barber.days.includes(d);
              return (
                <li key={d} data-on={on ? "" : undefined}>
                  <span className="week-day">{days[d].slice(0, 3)}</span>
                  <span className="sr-only">
                    : {on ? hoursLabel(brand.hours[d]) : "off"}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {work.length > 0 && (
        <section className="wrap barber-work" aria-labelledby="work-title">
          <div className="section-head">
            <h2 id="work-title">Off {barber.name.split(" ")[0]}'s chair</h2>
            <Link to="/gallery" className="text-link">
              Everyone's work <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="work-grid">
            {work.map((c) => (
              <li key={c.id}>
                <figure>
                  <img
                    src={c.img.src}
                    alt={c.img.alt}
                    width={c.img.w}
                    height={c.img.h}
                    loading="lazy"
                  />
                  <figcaption>
                    <strong>{c.title}</strong>
                    {c.recipe}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="wrap reviews" aria-labelledby="reviews-title">
        <h2 id="reviews-title">From the regulars</h2>
        <div className="review-row">
          {barber.reviews.map((r) => (
            <blockquote key={r.by}>
              <p>{r.text}</p>
              <footer>{r.by}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <nav className="wrap other-barbers" aria-labelledby="others-title">
        <h2 id="others-title">The other chairs</h2>
        <ul>
          {others.map((b) => (
            <li key={b.id}>
              <Link to={`/barbers/${b.id}`}>
                <span className="other-chair">{b.chair}</span>
                <span>
                  <strong>{b.name}</strong>
                  {b.signature}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
