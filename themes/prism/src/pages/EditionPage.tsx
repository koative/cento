import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { editions, speakers, type Edition } from "../content";
import { SpeakerCard } from "../components/SpeakerCard";

export function EditionPage({ edition: e }: { edition: Edition }) {
  const i = editions.indexOf(e);
  const newer = editions[i - 1];
  const older = editions[i + 1];
  const returning = speakers.filter((s) => s.pastEdition === e.year);

  return (
    <div className="wrap page">
      <Link to="/editions" className="back">
        <ArrowLeft aria-hidden="true" /> All editions
      </Link>

      <header className="edition-head">
        <h1>
          <span className="eh-year">{e.year}</span>
          <span className="eh-title">{e.title}</span>
        </h1>
        <dl className="facts">
          <div>
            <dt>Dates</dt>
            <dd>{e.dates}</dd>
          </div>
          <div>
            <dt>Venue</dt>
            <dd>{e.venue}</dd>
          </div>
          <div>
            <dt>Attendees</dt>
            <dd>{e.attendees.toLocaleString("en")}</dd>
          </div>
          <div>
            <dt>Speakers</dt>
            <dd>{e.speakerCount}</dd>
          </div>
        </dl>
      </header>

      <figure className="wide-photo">
        <img
          src={e.image.src}
          alt={e.image.alt}
          width={e.image.w}
          height={e.image.h}
        />
      </figure>

      <section className="section split">
        <h2>The recap</h2>
        <div className="prose">
          <p className="lede">{e.summary}</p>
          {e.recap.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section split">
        <h2>Talks people still mention</h2>
        <ul className="highlights">
          {e.highlights.map((h) => (
            <li key={h.title}>
              <h3>{h.title}</h3>
              <p className="hl-who">{h.speaker}</p>
              <p>{h.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <figure className="pull-quote">
        <blockquote>
          <p>{e.quote.text}</p>
        </blockquote>
        <figcaption>{e.quote.by}</figcaption>
      </figure>

      {returning.length > 0 && (
        <section className="section">
          <h2 className="h-section">Back on stage in 2027</h2>
          <div className="speaker-grid">
            {returning.map((s) => (
              <SpeakerCard key={s.slug} speaker={s} />
            ))}
          </div>
        </section>
      )}

      <nav className="pager" aria-label="Other editions">
        {older ? (
          <Link to={`/editions/${older.year}`}>
            <ArrowLeft aria-hidden="true" /> {older.year}: {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link to={`/editions/${newer.year}`}>
            {newer.year}: {newer.title} <ArrowRight aria-hidden="true" />
          </Link>
        ) : (
          <Link to="/tickets">
            Next: Prism 2027 tickets <ArrowRight aria-hidden="true" />
          </Link>
        )}
      </nav>
    </div>
  );
}
