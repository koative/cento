import { useState } from "react";
import { Check, Link2, Play } from "lucide-react";
import { episodes, hosts, shows, type Episode, type Show } from "../content";
import { Link } from "../router";
import { clock, date, minutes } from "../lib/format";
import { player } from "../lib/player";
import { Cover } from "../components/Cover";
import { ChapterPlayer } from "../components/ChapterPlayer";
import { EpisodeRow } from "../components/EpisodeRow";

function ShareButton() {
  const [copied, setCopied] = useState(false);
  return (
    <>
      <button
        type="button"
        className="btn btn-line"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
          } catch {
            /* clipboard blocked: the address bar still has the link */
          }
          setCopied(true);
        }}
      >
        {copied ? <Check aria-hidden="true" /> : <Link2 aria-hidden="true" />}{" "}
        {copied ? "Link copied" : "Copy episode link"}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? "Episode link copied to clipboard" : ""}
      </span>
    </>
  );
}

export function EpisodePage({ ep, show }: { ep: Episode; show: Show }) {
  const people = show.hosts.map((h) => hosts.find((x) => x.slug === h)!);
  const more = episodes.filter((e) => e.show === show.slug && e.id !== ep.id);
  const elsewhere =
    episodes.find((e) => e.show !== show.slug && e.date <= ep.date) ??
    episodes.find((e) => e.show !== show.slug)!;

  return (
    <>
      <section className="wrap ep-head">
        <p className="crumbs">
          <Link to="/shows">Shows</Link> <span aria-hidden="true">/</span>{" "}
          <Link to={`/shows/${show.slug}`}>{show.title}</Link>{" "}
          <span aria-hidden="true">/</span> Season {ep.season}, episode{" "}
          {ep.number}
        </p>
        <div className="ep-head-grid">
          <Link
            to={`/shows/${show.slug}`}
            className="ep-head-cover"
            aria-label={`${show.title}, show page`}
          >
            <Cover show={show} />
          </Link>
          <div>
            <h1>{ep.title}</h1>
            <p className="ep-head-guest">
              {people.map((p) => p.name).join(" & ")} with{" "}
              {ep.guests
                .map((g) => `${g.name}, ${g.role.toLowerCase()}`)
                .join(" and ")}
            </p>
            <p className="meta">
              <time dateTime={ep.date}>{date(ep.date)}</time> ·{" "}
              {minutes(ep.duration)} · {ep.chapters.length} chapters
            </p>
            <p className="ep-summary">{ep.summary}</p>
          </div>
        </div>
      </section>

      <div className="wrap">
        <ChapterPlayer ep={ep} />
      </div>

      <section className="wrap ep-body">
        <div className="ep-notes">
          <h2>Episode notes</h2>
          {ep.notes.map((n) => (
            <p key={n.slice(0, 24)}>{n}</p>
          ))}
          <figure className="ep-quote">
            <blockquote>
              <p>“{ep.quote.text}”</p>
            </blockquote>
            <figcaption>
              {ep.guests[0].name}
              <button
                type="button"
                className="text-link"
                onClick={() => player.play(ep.id, ep.quote.at)}
              >
                <Play aria-hidden="true" /> Hear it at {clock(ep.quote.at)}
              </button>
            </figcaption>
          </figure>
        </div>
        <aside className="ep-side">
          <h2>In this episode</h2>
          <dl>
            {ep.guests.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>Guest · {g.role}</dd>
              </div>
            ))}
            {people.map((p) => (
              <div key={p.slug}>
                <dt>
                  <Link to={`/hosts/${p.slug}`}>{p.name}</Link>
                </dt>
                <dd>Host</dd>
              </div>
            ))}
          </dl>
          <ShareButton />
        </aside>
      </section>

      <section className="wrap" aria-labelledby="more-h">
        <div className="section-head section-head-row">
          <h2 id="more-h">Keep listening</h2>
          <Link to={`/shows/${show.slug}`} className="text-link">
            More from {show.title}
          </Link>
        </div>
        <ul className="ep-list">
          {[...more, elsewhere].map((e) => (
            <EpisodeRow key={e.id} ep={e} />
          ))}
        </ul>
      </section>
    </>
  );
}
