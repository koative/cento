import { ArrowRight } from "lucide-react";
import { Link, navigate } from "../router";
import {
  artistBySlug,
  events,
  exhibitions,
  works,
  type Exhibition,
} from "../content";
import { dateRange, eventDate, openState } from "../lib/format";
import { shortlist } from "../lib/store";
import { ExhibitionCard, ExhibitionVisual } from "../components/Cards";
import { WorkCard } from "../components/WorkCard";

export function ExhibitionPage({ ex }: { ex: Exhibition }) {
  const list = works.filter((w) => ex.works.includes(w.id));
  const available = list.filter((w) => w.status === "available");
  const talks = events.filter((e) => e.exhibition === ex.slug);
  const related = exhibitions
    .filter(
      (e) =>
        e.slug !== ex.slug &&
        (e.status === ex.status ||
          e.artists.some((a) => ex.artists.includes(a))),
    )
    .slice(0, 2);
  const state = openState(new Date());

  const enquire = () => {
    shortlist.set([
      ...new Set([...shortlist.get(), ...available.map((w) => w.id)]),
    ]);
    navigate("/enquire");
  };

  return (
    <article className="page">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link to="/exhibitions">Exhibitions</Link>
      </nav>
      <header className="ex-head">
        <h1 className="display">{ex.title}</h1>
        <p className="ex-head-artists">
          {ex.artists.map((slug, i) => {
            const a = artistBySlug(slug);
            return (
              <span key={slug}>
                {i > 0 && ", "}
                <Link to={`/artists/${slug}`}>{a?.name}</Link>
              </span>
            );
          })}
        </p>
        <dl className="facts">
          <div>
            <dt>Dates</dt>
            <dd>
              <time dateTime={ex.opens}>{dateRange(ex.opens, ex.closes)}</time>
            </dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{ex.space}</dd>
          </div>
          <div>
            <dt>Admission</dt>
            <dd>Free</dd>
          </div>
          <div>
            <dt>Status</dt>
            <dd>
              {ex.status === "current"
                ? state.text
                : ex.status === "upcoming"
                  ? "Opens soon"
                  : "Closed"}
            </dd>
          </div>
        </dl>
      </header>

      <figure className="ex-hero">
        <ExhibitionVisual ex={ex} eager />
        {ex.view && <figcaption>Installation view, {ex.space}</figcaption>}
      </figure>

      <div className="ex-body">
        <div className="prose">
          <p className="lede">{ex.summary}</p>
          {ex.text.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        {talks.length > 0 && (
          <aside className="ex-events" aria-labelledby="ex-events-title">
            <h2 id="ex-events-title">Events</h2>
            <ul>
              {talks.map((ev) => (
                <li key={ev.id}>
                  <time dateTime={`${ev.date}T${ev.time}`}>
                    {eventDate(ev.date)}, {ev.time}
                  </time>
                  <h3>{ev.title}</h3>
                  <p>{ev.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      <section className="section" aria-labelledby="checklist-title">
        <div className="section-head">
          <h2 id="checklist-title">Works in the exhibition</h2>
          {available.length > 0 && (
            <button type="button" className="btn btn-ghost" onClick={enquire}>
              Enquire about{" "}
              {available.length === 1
                ? "the available work"
                : `all ${available.length} available works`}
            </button>
          )}
        </div>
        <div className="work-grid">
          {list.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section" aria-labelledby="related-title">
          <div className="section-head">
            <h2 id="related-title">
              {ex.status === "past" ? "From the archive" : "Also at Folio"}
            </h2>
            <Link to="/exhibitions" className="text-link">
              All exhibitions <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <div className="ex-pair">
            {related.map((r) => (
              <ExhibitionCard key={r.slug} ex={r} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
