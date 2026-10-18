import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { days, dentists, treatments, type Dentist } from "../content";
import { dayLabel, initials, priceRange } from "../lib/format";
import { nextFree } from "../lib/slots";

export function DentistPage({ d }: { d: Dentist }) {
  const theirs = treatments.filter((t) => t.dentists.includes(d.slug));
  const slot = nextFree([d.slug], 30);
  const others = dentists.filter((x) => x.slug !== d.slug);

  return (
    <div className="page dentist-page">
      <div className="wrap crumbs">
        <Link to="/dentists">Dentists</Link> / <span>{d.name}</span>
      </div>
      <header className="wrap dp-head">
        <span className="monogram monogram-lg" aria-hidden="true">
          {initials(d.name)}
        </span>
        <div>
          <h1>{d.name}</h1>
          <p className="dp-role">{d.role}</p>
          <blockquote className="dp-quote">
            <p>“{d.quote}”</p>
          </blockquote>
        </div>
      </header>

      <section className="wrap dp-body">
        <div className="dp-bio">
          {d.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="quiet">Outside the clinic: {d.outside}</p>
        </div>
        <dl className="dp-facts">
          <div>
            <dt>Focus</dt>
            <dd>{d.focus}</dd>
          </div>
          <div>
            <dt>Training</dt>
            <dd>{d.credentials}</dd>
          </div>
          <div>
            <dt>At Enamel since</dt>
            <dd className="tnum">{d.since}</dd>
          </div>
          <div>
            <dt>In clinic</dt>
            <dd>{d.days.map((n) => days[n]).join(", ")}</dd>
          </div>
          <div>
            <dt>Speaks</dt>
            <dd>{d.languages.join(", ")}</dd>
          </div>
          {slot && (
            <div>
              <dt>Next free</dt>
              <dd>
                {dayLabel(slot.day)}, {slot.label}
              </dd>
            </div>
          )}
        </dl>
      </section>

      <section className="wrap related" aria-labelledby="dt-h">
        <h2 id="dt-h">
          Treatments with {d.name.replace("Dr. ", "").split(" ")[0]}
        </h2>
        <ul className="related-list">
          {theirs.map((t) => (
            <li key={t.slug}>
              <Link to={`/treatments/${t.slug}`}>
                <span className="rl-cat">{t.category}</span>
                <span className="rl-name">{t.name}</span>
                <span className="rl-price tnum">{priceRange(t)}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link to={`/book?d=${d.slug}`} className="btn btn-primary">
          Book with {d.name} <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <nav className="wrap others" aria-label="Other dentists">
        <h2>The rest of the team</h2>
        <ul>
          {others.map((o) => (
            <li key={o.slug}>
              <Link to={`/dentists/${o.slug}`}>
                {o.name} <span>{o.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
