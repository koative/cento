import { useState, type CSSProperties } from "react";
import { ArrowUpRight, Check, Rss } from "lucide-react";
import {
  brand,
  episodes,
  hosts,
  platforms,
  shows,
  type Show,
} from "../content";
import { Link } from "../router";
import { player } from "../lib/player";
import { Cover } from "../components/Cover";
import { EpisodeRow } from "../components/EpisodeRow";
import { PlayButton } from "../components/Controls";

function FeedButton({ show }: { show: Show }) {
  const url = `${brand.feedBase}${show.slug}.xml`;
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      /* clipboard blocked: the URL is shown below for manual copying */
    }
    setCopied(true);
  };
  return (
    <div className="feed">
      <button type="button" className="btn btn-line" onClick={copy}>
        {copied ? <Check aria-hidden="true" /> : <Rss aria-hidden="true" />}
        {copied ? "Feed copied" : "Copy RSS feed"}
      </button>
      <p className="feed-url" aria-live="polite">
        {copied ? `Paste ${url} into any podcast app.` : ""}
      </p>
    </div>
  );
}

export function ShowPage({ show }: { show: Show }) {
  const eps = episodes.filter((e) => e.show === show.slug);
  const people = show.hosts.map((h) => hosts.find((x) => x.slug === h)!);
  const others = shows.filter((s) => s.slug !== show.slug).slice(0, 3);

  return (
    <>
      <section
        className="show-hero"
        style={
          {
            "--show-bg": show.cover.bg,
            "--show-fg": show.cover.fg,
          } as CSSProperties
        }
      >
        <div className="wrap show-hero-inner">
          <div className="show-hero-cover">
            <Cover show={show} label={`${show.title} cover art`} />
          </div>
          <div className="show-hero-copy">
            <p className="crumbs">
              <Link to="/shows">Shows</Link> <span aria-hidden="true">/</span>{" "}
              {show.genre}
            </p>
            <h1>{show.title}</h1>
            <p className="show-tagline">{show.tagline}</p>
            <p className="show-facts">
              Hosted by{" "}
              {people.map((p, i) => (
                <span key={p.slug}>
                  {i > 0 && " & "}
                  <Link to={`/hosts/${p.slug}`}>{p.name}</Link>
                </span>
              ))}
              <span aria-hidden="true"> · </span>
              {show.cadence}
              <span aria-hidden="true"> · </span>
              Since {show.since}
            </p>
            <div className="btn-row">
              <PlayButton ep={eps[0]} label className="play-on-cover" />
              <button
                type="button"
                className="btn btn-on-cover"
                onClick={() => player.queueAll(eps.map((e) => e.id))}
              >
                Add all {eps.length} to listening list
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap show-about" aria-labelledby="about-h">
        <div className="show-about-text">
          <h2 id="about-h">About the show</h2>
          {show.about.map((p) => (
            <p key={p.slice(0, 20)}>{p}</p>
          ))}
          <p className="meta">
            {show.archive} episodes in the archive. Everything stays online,
            with its notes.
          </p>
        </div>
        <aside className="subscribe" aria-labelledby="sub-h">
          <h2 id="sub-h">Follow {show.title}</h2>
          <ul>
            {platforms.map((p) => (
              <li key={p.label}>
                <a href={p.href} target="_blank" rel="noreferrer">
                  {p.label} <ArrowUpRight aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <FeedButton show={show} />
        </aside>
      </section>

      <figure className="wrap show-photo">
        <img
          src={show.photo.src}
          alt={show.photo.alt}
          loading="lazy"
          width={1600}
          height={1067}
        />
        <figcaption>{show.photo.caption}</figcaption>
      </figure>

      <section className="wrap" aria-labelledby="eps-h">
        <div className="section-head section-head-row">
          <h2 id="eps-h">Recent episodes</h2>
          <Link to="/episodes" className="text-link">
            All episodes across the network
          </Link>
        </div>
        <ul className="ep-list">
          {eps.map((e) => (
            <EpisodeRow key={e.id} ep={e} />
          ))}
        </ul>
      </section>

      <section className="wrap show-hosts" aria-labelledby="hosts-h">
        <h2 id="hosts-h">{people.length > 1 ? "Your hosts" : "Your host"}</h2>
        <ul>
          {people.map((p) => (
            <li key={p.slug} className="host-inline">
              <img
                src={p.photo}
                alt=""
                loading="lazy"
                width={720}
                height={900}
              />
              <div>
                <h3>
                  <Link to={`/hosts/${p.slug}`}>{p.name}</Link>
                </h3>
                <p>{p.bio[0]}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap more-shows" aria-labelledby="more-h">
        <h2 id="more-h">Elsewhere on Chapter</h2>
        <ul className="shelf shelf-3">
          {others.map((s) => (
            <li key={s.slug}>
              <Link to={`/shows/${s.slug}`} className="shelf-item">
                <Cover show={s} />
                <span className="shelf-title">{s.title}</span>
                <span className="shelf-line">{s.tagline}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
