import { ArrowRight, Play, Shuffle } from "lucide-react";
import fieldRecording from "../assets/field-recording.jpg";
import {
  advertise,
  episodes,
  home,
  hosts,
  newsletter,
  shows,
} from "../content";
import { Link, navigate } from "../router";
import { clock, minutes } from "../lib/format";
import { player } from "../lib/player";
import { Cover } from "../components/Cover";
import { EpisodeRow } from "../components/EpisodeRow";
import { PlayButton, QueueButton } from "../components/Controls";

export function Home() {
  const latest = episodes[0];
  const latestShow = shows.find((s) => s.slug === latest.show)!;
  const feature = shows.find((s) => s.slug === home.featureShow)!;
  const featureEp = episodes.find((e) => e.show === feature.slug)!;
  const quoted = episodes.find((e) => e.id === home.quoteEpisode)!;
  const quotedShow = shows.find((s) => s.slug === quoted.show)!;

  return (
    <>
      <section className="wrap hero">
        <div className="hero-copy">
          <h1>{home.title}</h1>
          <p className="lede">{home.intro}</p>
          <div className="btn-row">
            <button
              type="button"
              className="btn btn-ink"
              onClick={() => player.play(latest.id)}
            >
              <Play aria-hidden="true" /> Play the newest episode
            </button>
            <Link to="/shows" className="btn btn-line">
              Browse the six shows
            </Link>
          </div>
        </div>

        <article className="hero-feature" aria-labelledby="hero-ep">
          <Link
            to={`/shows/${latestShow.slug}`}
            className="hero-cover"
            aria-label={`${latestShow.title}, show page`}
          >
            <Cover show={latestShow} />
          </Link>
          <div className="hero-ep">
            <p className="meta">
              New on {latestShow.title} · {minutes(latest.duration)}
            </p>
            <h2 id="hero-ep">
              <Link to={`/episodes/${latest.id}`}>{latest.title}</Link>
            </h2>
            <p className="hero-guest">
              with {latest.guests[0].name},{" "}
              {latest.guests[0].role.toLowerCase()}
            </p>
            <div className="hero-actions">
              <PlayButton ep={latest} label />
              <QueueButton ep={latest} />
            </div>
          </div>
          <ol className="hero-chapters" aria-label="Chapters">
            {latest.chapters.map((c, i) => (
              <li key={c.start}>
                <button
                  type="button"
                  onClick={() => player.play(latest.id, c.start)}
                >
                  <span className="ch-time">{clock(c.start)}</span>
                  <span>
                    <span className="sr-only">Play chapter {i + 1}: </span>
                    {c.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </article>
      </section>

      <section className="wrap shelf-section" aria-labelledby="shelf-h">
        <div className="section-head">
          <h2 id="shelf-h">{home.shelfTitle}</h2>
          <p>{home.shelfIntro}</p>
        </div>
        <ul className="shelf">
          {shows.map((s) => (
            <li key={s.slug}>
              <Link to={`/shows/${s.slug}`} className="shelf-item">
                <Cover show={s} />
                <span className="shelf-title">{s.title}</span>
                <span className="shelf-line">{s.tagline}</span>
                <span className="shelf-cadence">{s.cadence}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap latest" aria-labelledby="latest-h">
        <div className="section-head section-head-row">
          <h2 id="latest-h">{home.latestTitle}</h2>
          <Link to="/episodes" className="text-link">
            Every episode <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="ep-list">
          {episodes.slice(0, 8).map((e) => (
            <EpisodeRow key={e.id} ep={e} />
          ))}
        </ul>
      </section>

      <section className="spread" aria-labelledby="spread-h">
        <figure className="spread-photo">
          <img
            src={feature.photo.src}
            alt={feature.photo.alt}
            loading="lazy"
            width={1600}
            height={1067}
          />
          <figcaption>{feature.photo.caption}</figcaption>
        </figure>
        <div className="spread-copy">
          <h2 id="spread-h">{home.featureTitle}</h2>
          <p>{feature.about[0]}</p>
          <p>{feature.about[1]}</p>
          <div className="spread-start">
            <p className="meta">Start with</p>
            <p className="spread-ep">
              <Link to={`/episodes/${featureEp.id}`}>{featureEp.title}</Link>
              <span>{minutes(featureEp.duration)}</span>
            </p>
            <div className="btn-row">
              <PlayButton ep={featureEp} label />
              <Link to={`/shows/${feature.slug}`} className="btn btn-line">
                About {feature.title}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap pull" aria-label="From the archive">
        <blockquote>
          <p>“{quoted.quote.text}”</p>
          <footer>
            {quoted.guests[0].name} on <cite>{quotedShow.title}</cite>, “
            {quoted.title}”
          </footer>
        </blockquote>
        <button
          type="button"
          className="btn btn-line"
          onClick={() => player.play(quoted.id, quoted.quote.at)}
        >
          <Play aria-hidden="true" /> Hear it at {clock(quoted.quote.at)}
        </button>
      </section>

      <section className="wrap making" aria-labelledby="making-h">
        <img
          src={fieldRecording}
          alt="A recordist holding a microphone towards a hiker resting against a weathered pine"
          loading="lazy"
          width={1600}
          height={1067}
        />
        <div>
          <h2 id="making-h">{home.makingTitle}</h2>
          <dl>
            {home.making.map((m) => (
              <div key={m.title}>
                <dt>{m.title}</dt>
                <dd>{m.text}</dd>
              </div>
            ))}
          </dl>
          <Link to="/about" className="text-link">
            How the network works <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="wrap voices" aria-labelledby="voices-h">
        <div className="section-head section-head-row">
          <h2 id="voices-h">{home.hostsTitle}</h2>
          <Link to="/hosts" className="text-link">
            Meet the hosts <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="voices-list">
          {hosts.map((h) => (
            <li key={h.slug}>
              <Link to={`/hosts/${h.slug}`} className="voice">
                <img
                  src={h.photo}
                  alt=""
                  loading="lazy"
                  width={720}
                  height={900}
                />
                <span className="voice-name">{h.name}</span>
                <span className="voice-role">{h.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="margin-band" aria-labelledby="margin-h">
        <div className="wrap margin-inner">
          <div>
            <h2 id="margin-h">{newsletter.title}</h2>
            <p>{newsletter.intro}</p>
            <Link to="/newsletter" className="btn btn-paper">
              Subscribe to {newsletter.name}
            </Link>
          </div>
          <article
            className="letter"
            aria-label={`Excerpt from issue ${newsletter.sample.issue}`}
          >
            <p className="letter-head">
              No. {newsletter.sample.issue} · {newsletter.sample.date}
            </p>
            <p>{newsletter.sample.greeting}</p>
            <p>{newsletter.sample.body[0]}</p>
            <p className="letter-sign">— {newsletter.sample.signoff}</p>
          </article>
        </div>
      </section>

      <section className="wrap ad-strip" aria-labelledby="ad-h">
        <h2 id="ad-h">For advertisers</h2>
        <p>
          {advertise.principles[0].text} {advertise.principles[1].text}
        </p>
        <Link to="/advertise" className="text-link">
          Rate card and planner <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="wrap close" aria-labelledby="close-h">
        <h2 id="close-h">{home.closeTitle}</h2>
        <div className="btn-row">
          <button
            type="button"
            className="btn btn-ink"
            onClick={() =>
              navigate(
                `/episodes/${episodes[Math.floor(Math.random() * episodes.length)].id}`,
              )
            }
          >
            <Shuffle aria-hidden="true" /> Pick one for me
          </button>
          <Link to="/episodes" className="btn btn-line">
            Browse every episode
          </Link>
        </div>
      </section>
    </>
  );
}
