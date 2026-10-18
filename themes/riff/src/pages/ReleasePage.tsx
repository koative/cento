import { ArrowLeft, Play } from "lucide-react";
import {
  products,
  quotes,
  releases,
  streaming,
  videos,
  type Release,
} from "../content";
import { Link } from "../router";
import { longDate, money, totalLength } from "../lib/format";
import { play } from "../lib/player";
import { Cover } from "../components/Cover";
import { Tracklist } from "../components/Tracklist";
import { Photo, ReleaseCard } from "../components/Cards";

export function ReleasePage({ release }: { release: Release }) {
  const formats = products.filter((p) => release.formats.includes(p.id));
  const praise = quotes.filter((q) => q.on === release.title);
  const film = videos.filter((v) => v.release === release.slug);
  const others = releases.filter((r) => r.slug !== release.slug).slice(0, 4);

  return (
    <>
      <div className="wrap crumb">
        <Link to="/music">
          <ArrowLeft aria-hidden="true" /> Discography
        </Link>
      </div>

      <section className="wrap release-hero">
        <Cover release={release} className="cover-lg" />
        <div>
          <h1 className="display-xl">{release.title}</h1>
          <p className="release-line">
            {release.kind} · {longDate(release.date)} · {release.catalog} ·{" "}
            {release.tracks.length}{" "}
            {release.tracks.length === 1 ? "track" : "tracks"},{" "}
            {totalLength(release.tracks)}
          </p>
          <p className="lede">{release.blurb}</p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-red"
              onClick={() => play(release.slug, 0)}
            >
              <Play aria-hidden="true" /> Play previews
            </button>
            {formats.map((p) => (
              <Link key={p.id} to={`/merch/${p.id}`} className="btn btn-line">
                {p.art.kind === "lp"
                  ? "Vinyl"
                  : p.art.kind === "cd"
                    ? "CD"
                    : "Cassette"}{" "}
                · {money(p.price)}
              </Link>
            ))}
          </div>
          <ul className="stream-links" aria-label={`Stream ${release.title}`}>
            {streaming.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section band-ink" aria-labelledby="listen">
        <div className="wrap listen-grid">
          <div className="listen-head">
            <h2 id="listen" className="display-md">
              Listen
            </h2>
            <p>{release.recorded}</p>
          </div>
          <Tracklist release={release} />
        </div>
      </section>

      <section className="section wrap notes-grid" aria-labelledby="notes">
        <div>
          <h2 id="notes" className="display-md">
            Liner notes
          </h2>
          {release.notes.map((n) => (
            <p key={n.slice(0, 24)} className="prose">
              {n}
            </p>
          ))}
          {praise.map((q) => (
            <blockquote key={q.source} className="inline-quote">
              <p>{q.text}</p>
              <footer>{q.source}</footer>
            </blockquote>
          ))}
        </div>
        <aside className="credits" aria-labelledby="credits">
          <h2 id="credits" className="box-head">
            Credits
          </h2>
          <dl>
            {release.credits.map(([role, who]) => (
              <div key={role}>
                <dt>{role}</dt>
                <dd>{who}</dd>
              </div>
            ))}
            <div>
              <dt>Recorded</dt>
              <dd>{release.recorded}</dd>
            </div>
            <div>
              <dt>Label</dt>
              <dd>
                {release.catalog === "Self-released"
                  ? "Self-released"
                  : "Parlour Tapes"}
              </dd>
            </div>
          </dl>
        </aside>
      </section>

      {film.length > 0 && (
        <section className="section wrap" aria-labelledby="films">
          <h2 id="films" className="display-md">
            On film
          </h2>
          <div className="video-row">
            {film.map((v) => (
              <Link key={v.id} to={`/videos?v=${v.id}`} className="video-tile">
                <Photo photo={v.photo} />
                <span className="video-play" aria-hidden="true">
                  <Play />
                </span>
                <span className="video-caption">
                  <strong>{v.title}</strong>
                  <span>
                    {v.kind} · {v.length}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="section wrap" aria-labelledby="others">
        <h2 id="others" className="display-md">
          More records
        </h2>
        <div className="shelf">
          {others.map((r) => (
            <ReleaseCard key={r.slug} release={r} />
          ))}
        </div>
      </section>
    </>
  );
}
