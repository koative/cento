import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  episodes,
  podcast,
  programmes,
  resources,
  skills,
  type Episode,
} from "../content";
import { longDate, minutes } from "../lib/format";
import { Player } from "../components/Player";
import { Sheet } from "../components/Sheet";

export function EpisodePage({ ep }: { ep: Episode }) {
  const i = episodes.indexOf(ep);
  const newer = episodes[i - 1];
  const older = episodes[i + 1];
  const resource = resources.find((r) => r.episode === ep.slug);
  const skill = skills.find((s) => s.id === ep.skill)!;
  const programme =
    programmes.find((p) => p.skills[0] === ep.skill) ??
    programmes.find((p) => p.skills.includes(ep.skill))!;

  return (
    <div className="page episode">
      <div className="wrap crumbs">
        <Link to="/podcast" className="link-back">
          <ArrowLeft aria-hidden="true" /> {podcast.name}
        </Link>
      </div>

      <header className="wrap ep-head">
        <p className="ep-big-num num" aria-hidden="true">
          {ep.number}
        </p>
        <div>
          <h1>{ep.title}</h1>
          <p className="ep-byline">
            <span className="sr-only">Episode {ep.number}. </span>
            {ep.guest ? (
              <>
                Margo Ellery with <strong>{ep.guest.name}</strong>,{" "}
                {ep.guest.role}
              </>
            ) : (
              "Margo Ellery, solo"
            )}
          </p>
          <p className="ep-when num">
            {longDate(ep.date)} · {minutes(ep.duration)} · {skill.label}
          </p>
        </div>
      </header>

      <section className="wrap ep-player" aria-label="Listen">
        <Player ep={ep} />
      </section>

      <div className="wrap ep-body">
        <article className="prose">
          <p className="lede">{ep.summary}</p>
          {ep.notes.map((n) => (
            <p key={n}>{n}</p>
          ))}
          <blockquote className="pull">
            <p>{ep.quote}</p>
          </blockquote>
          <h2>Three things to try this week</h2>
          <ol className="takeaways">
            {ep.takeaways.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        </article>

        <aside className="ep-aside">
          {resource && (
            <Link to={`/resources/${resource.slug}`} className="ep-res">
              <Sheet r={resource} />
              <span className="next-title">Free: {resource.title}</span>
              <span className="link-arrow" aria-hidden="true">
                Get the {resource.type.toLowerCase()} <ArrowRight />
              </span>
            </Link>
          )}
          <p className="ep-prog">
            Working on {skill.label.toLowerCase()} with others:{" "}
            <Link to={`/programmes/${programme.slug}`}>{programme.name}</Link>.
          </p>
        </aside>
      </div>

      <nav className="wrap ep-pager" aria-label="More episodes">
        {older ? (
          <Link to={`/podcast/${older.slug}`} className="pager-link">
            <span>Previous · Ep. {older.number}</span>
            {older.title}
          </Link>
        ) : (
          <span />
        )}
        {newer && (
          <Link to={`/podcast/${newer.slug}`} className="pager-link pager-next">
            <span>Next · Ep. {newer.number}</span>
            {newer.title}
          </Link>
        )}
      </nav>
    </div>
  );
}
