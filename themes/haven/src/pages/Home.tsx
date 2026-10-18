import { useState } from "react";
import { ArrowRight } from "lucide-react";
import {
  brand,
  dining,
  experiences,
  home,
  posts,
  rooms,
  seasonLabel,
  spa,
} from "../content";
import { Link } from "../router";
import { money, postDate } from "../lib/stay";
import { StayBar } from "../components/StayBar";
import { RoomCard } from "../components/RoomCard";
import { Panorama } from "../components/Panorama";

const month = new Date().getMonth() + 1;

export function Home() {
  const [season, setSeason] = useState<"summer" | "winter">(
    month >= 5 && month <= 10 ? "summer" : "winter",
  );
  const seasonal = experiences.filter(
    (x) => x.season === season || x.season === "all",
  );
  const [lead, ...more] = posts.slice(0, 3);

  return (
    <>
      <section className="hero">
        <img
          className="hero-img"
          src={brand.hero.src}
          alt={brand.hero.alt}
          width={1800}
          height={1205}
          fetchPriority="high"
        />
        <div className="wrap hero-inner">
          <h1 className="hero-title">{home.title}</h1>
          <p className="hero-lede">{home.lede}</p>
          <p className="hero-rate">
            Rooms from{" "}
            <strong className="num">
              {money(Math.min(...rooms.map((r) => r.price)))}
            </strong>{" "}
            a night for two, breakfast included
          </p>
        </div>
        <div className="wrap hero-bar">
          <StayBar />
        </div>
      </section>

      <section className="section letter wrap" aria-labelledby="letter-h">
        <h2 id="letter-h">{home.letter.heading}</h2>
        <div className="prose">
          {home.letter.text.map((t) => (
            <p key={t}>{t}</p>
          ))}
          <p className="signed">{home.letter.signed}</p>
        </div>
      </section>

      <section className="section rooms-strip" aria-labelledby="rooms-h">
        <div className="wrap section-head">
          <h2 id="rooms-h">Seven rooms, all of them facing the range</h2>
          <Link to="/rooms" className="arrow-link">
            Compare every room <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="wrap">
          <ul className="strip" aria-label="Rooms and cabins">
            {rooms.map((r) => (
              <li key={r.id}>
                <RoomCard room={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section pano-section" aria-labelledby="pano-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="pano-h">Choose the view, then the room</h2>
            <p className="section-lede">
              Our terrace has a brass panorama table naming all eight summits.
              Here it is, with each window's slice of the range marked. Pick a
              room; tap a peak.
            </p>
          </div>
          <Panorama roomId="balcony-room" chooser />
        </div>
      </section>

      <section className="section dining-feature" aria-labelledby="dining-h">
        <div className="wrap dining-grid">
          <img
            src={dining.venues[0].image.src}
            alt={dining.venues[0].image.alt}
            width={1280}
            height={853}
            loading="lazy"
            className="dining-img"
          />
          <div>
            <h2 id="dining-h">
              Dinner is five courses, and the valley wrote them
            </h2>
            <p>{dining.intro}</p>
            <h3 className="menu-title">{dining.tasting.title}</h3>
            <ol className="course-list">
              {dining.tasting.courses.map((c) => (
                <li key={c.name}>
                  <span className="course-name">{c.name}</span>
                  <span className="course-detail">{c.detail}</span>
                </li>
              ))}
            </ol>
            <p className="small">{dining.tasting.note}</p>
            <Link to="/dining" className="arrow-link">
              Restaurant Teria and the Stube <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section band-pine bath-feature"
        aria-labelledby="bath-h"
      >
        <div className="wrap bath-grid">
          <div>
            <h2 id="bath-h">
              A wood-fired bathhouse, and a lake sixty steps from the door
            </h2>
            <p>{spa.intro}</p>
            <Link to="/spa" className="arrow-link">
              Inside the bathhouse <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="infusions">
            <h3>Today's infusions</h3>
            <ul>
              {spa.infusions.map((i) => (
                <li key={i.time}>
                  <span className="num">{i.time}</span>
                  <span>{i.name}</span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={spa.image.src}
            alt={spa.image.alt}
            width={1280}
            height={853}
            loading="lazy"
            className="bath-img"
          />
        </div>
      </section>

      <section className="section seasons" aria-labelledby="seasons-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="seasons-h">Two seasons, two different mountains</h2>
            <div className="toggle" role="group" aria-label="Season">
              {(["summer", "winter"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={season === s}
                  onClick={() => setSeason(s)}
                >
                  {seasonLabel[s]}
                </button>
              ))}
            </div>
          </div>
          <div className="seasons-grid">
            <img
              key={season}
              src={home.seasons[season].src}
              alt={home.seasons[season].alt}
              width={1280}
              height={853}
              loading="lazy"
              className="season-img"
            />
            <ul className="xp-list" aria-live="polite">
              {seasonal.map((x) => (
                <li key={x.id}>
                  <Link to={`/experiences/${x.id}`}>
                    <span className="xp-title">{x.title}</span>
                    <span className="xp-meta">
                      {x.duration} · {x.level} ·{" "}
                      {x.price ? money(x.price) : "Included"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <figure className="section quote wrap">
        <blockquote>
          <p>{home.quote.text}</p>
        </blockquote>
        <figcaption>{home.quote.by}</figcaption>
      </figure>

      <section className="section journal-feature" aria-labelledby="journal-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="journal-h">From the journal</h2>
            <Link to="/journal" className="arrow-link">
              All stories <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="journal-grid">
            <article className="post-lead">
              <Link to={`/journal/${lead.slug}`}>
                <img
                  src={lead.image.src}
                  alt={lead.image.alt}
                  width={1229}
                  height={825}
                  loading="lazy"
                />
                <h3>{lead.title}</h3>
              </Link>
              <p>{lead.dek}</p>
            </article>
            <div className="post-more">
              {more.map((p) => (
                <article key={p.slug} className="post-row">
                  <Link to={`/journal/${p.slug}`}>
                    <h3>{p.title}</h3>
                  </Link>
                  <p>{p.dek}</p>
                  <p className="meta">
                    <time dateTime={p.date}>{postDate(p.date)}</time> ·{" "}
                    {p.author}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="close" aria-labelledby="close-h">
        <img
          src={home.close.image.src}
          alt=""
          width={1800}
          height={1031}
          loading="lazy"
        />
        <div className="wrap close-inner">
          <h2 id="close-h">{home.close.heading}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-light">
              Check availability
            </Link>
            <Link to="/plan" className="btn btn-ghost-light">
              Getting here
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
