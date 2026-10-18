import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { guides, type Guide } from "../content";
import { tripsBy } from "../lib/trips";
import { TripCard } from "../components/TripCard";

export function GuidePage({ guide }: { guide: Guide }) {
  const led = tripsBy(guide.slug);
  const i = guides.indexOf(guide);
  const next = guides[(i + 1) % guides.length];

  return (
    <article>
      <header className="guide-head">
        <img
          src={guide.image}
          alt={guide.imageAlt}
          width={1600}
          height={1066}
        />
        <div className="wrap guide-head-inner">
          <p className="crumbs">
            <Link to="/guides">Guides</Link> / {guide.base}
          </p>
          <h1>{guide.name}</h1>
          <p className="lede">{guide.specialty}</p>
        </div>
      </header>

      <div className="wrap section guide-body">
        <dl className="guide-facts">
          <div>
            <dt>Based in</dt>
            <dd>{guide.base}</dd>
          </div>
          <div>
            <dt>Guiding since</dt>
            <dd>{guide.since}</dd>
          </div>
          <div>
            <dt>Languages</dt>
            <dd>{guide.languages.join(", ")}</dd>
          </div>
          <div>
            <dt>Qualifications</dt>
            <dd>
              <ul>
                {guide.qualifications.map((q) => (
                  <li key={q}>{q}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
        <div className="guide-story">
          <blockquote className="pull">“{guide.quote}”</blockquote>
          {guide.bio.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <h2>Favourite moment on the route</h2>
          <p>{guide.favourite}</p>
        </div>
      </div>

      <section className="wrap section" aria-labelledby="led-title">
        <div className="section-head">
          <h2 id="led-title">Walk with {guide.name.split(" ")[0]}</h2>
          <Link to={`/guides/${next.slug}`} className="text-link">
            Next guide: {next.name} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="trip-grid">
          {led.map((t) => (
            <TripCard key={t.slug} trip={t} />
          ))}
        </div>
      </section>
    </article>
  );
}
