import { useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "../router";
import {
  episodes,
  home,
  images,
  podcast,
  programmes,
  resources,
  stories,
  wheel,
} from "../content";
import { money, longDate, minutes, shortDate } from "../lib/format";
import { nextStart, upcoming } from "../lib/programmes";
import { Wheel } from "../components/Wheel";
import { Player } from "../components/Player";
import { Sheet } from "../components/Sheet";
import { StoryQuote } from "../components/StoryQuote";

export function Home() {
  const wheelRef = useRef<HTMLElement>(null);
  const cohort = programmes
    .flatMap((p) => upcoming(p).map((c) => ({ p, c })))
    .sort((a, b) => a.c.start.localeCompare(b.c.start))[0];
  const [latest, ...more] = episodes;
  const [before, after] = home.title.split(home.mark);
  const featured = stories.find((s) => s.id === "arturo")!;

  return (
    <div className="page home">
      <section className="hero wrap" aria-labelledby="hero-h">
        <div className="hero-copy">
          <h1 id="hero-h">
            {before}
            <span className="mark mark-draw">{home.mark}</span>
            {after}
          </h1>
          <p className="lede">{home.lede}</p>
          <div className="hero-actions">
            <Link to="/programmes" className="btn btn-ink">
              Find your programme <ArrowRight aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="btn btn-line"
              onClick={() =>
                wheelRef.current?.scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
            >
              Score your Manager's Wheel
            </button>
          </div>
        </div>
        <figure className="hero-photo">
          <img
            src={images.hero.src}
            alt={images.hero.alt}
            width={images.hero.w}
            height={images.hero.h}
            fetchPriority="high"
          />
          {cohort && (
            <figcaption className="note-card">
              <span className="note-card-title">{cohort.p.name}</span>
              Starts {longDate(cohort.c.start)}. {cohort.c.left} of{" "}
              {cohort.c.seats} places left.{" "}
              <Link to={`/programmes/${cohort.p.slug}`}>Dates and price</Link>
            </figcaption>
          )}
        </figure>
      </section>

      <section className="wrap ledger-section" aria-labelledby="ways-h">
        <div className="section-head">
          <h2 id="ways-h">Seven ways to work together</h2>
          <Link to="/programmes" className="link-arrow">
            Compare all programmes <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="ledger">
          {programmes.map((p) => (
            <li key={p.slug}>
              <Link to={`/programmes/${p.slug}`} className="ledger-row">
                <span
                  className="ledger-swatch"
                  data-tone={p.tone}
                  aria-hidden="true"
                />
                <span className="ledger-name">{p.name}</span>
                <span className="ledger-format">{p.format}</span>
                <span className="ledger-length">{p.length}</span>
                <span className="ledger-next">{nextStart(p)}</span>
                <span className="ledger-price num">
                  {p.priceNote ? "from " : ""}
                  {money(p.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="who" aria-labelledby="who-h">
        <div className="wrap who-grid">
          <div>
            <h2 id="who-h">{home.who.title}</h2>
            <p className="lede">{home.who.text}</p>
          </div>
          <ul className="moments">
            {home.who.moments.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="wheel-section"
        ref={wheelRef}
        aria-labelledby="wheel-h"
      >
        <div className="wrap">
          <div className="section-head section-head-stack">
            <h2 id="wheel-h">{wheel.title}</h2>
            <p className="lede">{wheel.intro}</p>
          </div>
          <Wheel />
        </div>
      </section>

      <section className="wrap method" aria-labelledby="method-h">
        <div className="section-head section-head-stack">
          <h2 id="method-h">{home.method.title}</h2>
          <p className="lede">{home.method.text}</p>
        </div>
        <div className="session-bar" aria-hidden="true">
          {home.method.steps.map((s, i) => {
            const span =
              parseInt(home.method.steps[i + 1]?.at ?? "50") - parseInt(s.at);
            return (
              <span key={s.at} style={{ flexGrow: span }}>
                {span} min
              </span>
            );
          })}
        </div>
        <ol className="session">
          {home.method.steps.map((s) => (
            <li key={s.at}>
              <span className="session-at num">{s.at}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap feature-story" aria-label="A client's story">
        <StoryQuote s={featured} />
        <Link to="/stories" className="link-arrow">
          Read more stories <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="on-air" aria-labelledby="pod-h">
        <div className="wrap on-air-grid">
          <div className="on-air-copy">
            <h2 id="pod-h">{podcast.name}</h2>
            <p>{podcast.description}</p>
            <h3 className="on-air-ep">
              <Link to={`/podcast/${latest.slug}`}>
                <span className="num">Ep. {latest.number}</span> {latest.title}
              </Link>
            </h3>
            <Player ep={latest} compact />
            <ul className="platforms">
              {podcast.platforms.map((p) => (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {p.label} <ArrowUpRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="on-air-side">
            <img
              src={images.studio.src}
              alt={images.studio.alt}
              width={images.studio.w}
              height={images.studio.h}
              loading="lazy"
            />
            <ul className="ep-mini">
              {more.slice(0, 3).map((e) => (
                <li key={e.slug}>
                  <Link to={`/podcast/${e.slug}`}>
                    <span className="num">{e.number}</span>
                    <span>{e.title}</span>
                    <span className="num">
                      {shortDate(e.date)} · {minutes(e.duration)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/podcast" className="link-arrow">
              All episodes <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap free" aria-labelledby="free-h">
        <div className="section-head">
          <h2 id="free-h">Free on the desk this week</h2>
          <Link to="/resources" className="link-arrow">
            All {resources.length} resources <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="free-grid">
          {resources.slice(0, 3).map((r) => (
            <li key={r.slug}>
              <Link to={`/resources/${r.slug}`} className="free-item">
                <Sheet r={r} />
                <span className="free-title">{r.title}</span>
                <span className="free-meta">
                  {r.type} · {r.minutes} minutes to use
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="meet" aria-labelledby="meet-h">
        <div className="wrap meet-grid">
          <img
            src={images.window.src}
            alt={images.window.alt}
            width={images.window.w}
            height={images.window.h}
            loading="lazy"
          />
          <div>
            <h2 id="meet-h">Hi, I'm Margo.</h2>
            <p className="lede">
              I managed engineering teams for twelve years and got a lot of it
              wrong in front of good people. Since 2021 I've coached managers
              full-time, from their first week to their first director role.
            </p>
            <Link to="/about" className="link-arrow">
              My story and the team <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <div className="wrap">
          <h2 id="close-h">{home.close.title}</h2>
          <p className="lede">{home.close.text}</p>
          <div className="hero-actions">
            <Link to="/apply" className="btn btn-ink">
              Start an application <ArrowRight aria-hidden="true" />
            </Link>
            <Link to="/programmes/one-to-one" className="btn btn-line">
              1:1 coaching from{" "}
              {money(programmes.find((p) => p.slug === "one-to-one")!.price)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
