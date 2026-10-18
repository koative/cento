import { ArrowRight, Play } from "lucide-react";
import {
  home,
  homecomingId,
  members,
  photos,
  products,
  quotes,
  releases,
  shows,
  streaming,
  videos,
} from "../content";
import { Link } from "../router";
import { play } from "../lib/player";
import { clock, dayName, longDate, monthDay } from "../lib/format";
import { Cover } from "../components/Cover";
import { Tracklist } from "../components/Tracklist";
import { Photo, ProductCard, ReleaseCard, ShowRow } from "../components/Cards";
import { ShowBill } from "../components/ShowBill";

export function Home() {
  const record = releases[0];
  const upcoming = shows.filter((s) => !s.setlist);
  const homecoming = shows.find((s) => s.id === homecomingId)!;
  const [featured, ...moreVideos] = [videos[4], videos[0], videos[5]];

  return (
    <>
      <section className="home-hero wrap">
        <div className="hero-copy">
          <h1 className="stack">
            <span>Riff</span>
            <span className="stack-red">{record.title}</span>
            <span>Out now</span>
          </h1>
          <p className="lede">{home.heroLine}</p>
          <div className="actions">
            <button
              type="button"
              className="btn btn-red"
              onClick={() => play(record.slug, 0)}
            >
              <Play aria-hidden="true" /> Play the record
            </button>
            <Link to="/tour" className="btn btn-line">
              Tour dates
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <Photo photo={photos.crowd} red eager className="hero-photo" />
          <Link
            to={`/music/${record.slug}`}
            className="hero-cover"
            aria-label={`${record.title}, album page`}
          >
            <Cover release={record} />
          </Link>
        </div>
        <div className="hero-next">
          <h2 className="mini-head">Next up</h2>
          <ul>
            {upcoming.slice(0, 3).map((s) => (
              <li key={s.id}>
                <Link to={`/tour/${s.id}`}>
                  <span className="hero-next-date">
                    {dayName(s.date)} {monthDay(s.date)}
                  </span>
                  <span>
                    {s.city} · {s.venue}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="road">
        <div className="section-head">
          <h2 id="road" className="display-md">
            On the road
          </h2>
          <p>
            {upcoming.length} shows across North America, the UK and Europe.
            Over half are all ages, and a dollar from every ticket goes to the
            Small Rooms Fund.
          </p>
        </div>
        <ul className="ledger">
          {upcoming.slice(0, 6).map((s) => (
            <ShowRow key={s.id} show={s} />
          ))}
        </ul>
        <Link to="/tour" className="more-link">
          All {upcoming.length} dates <ArrowRight aria-hidden="true" />
        </Link>
      </section>

      <section className="record band-ink" aria-labelledby="record">
        <div className="wrap record-grid">
          <div className="record-art">
            <Cover release={record} className="cover-lg" />
            <p className="record-meta">
              {record.kind} · {longDate(record.date)} · {record.catalog}
            </p>
          </div>
          <div className="record-body">
            <h2 id="record" className="display-md">
              {home.recordHeading}
            </h2>
            <p>{record.blurb}</p>
            <Tracklist release={record} />
            <div className="actions">
              <Link to={`/merch/${record.formats[0]}`} className="btn btn-red">
                Buy the LP
              </Link>
              <Link to={`/music/${record.slug}`} className="btn btn-line-paper">
                Liner notes & credits
              </Link>
            </div>
            <ul className="stream-links" aria-label="Stream Low Ceiling">
              {streaming.map((s) => (
                <li key={s.name}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pull wrap" aria-label="Press">
        <blockquote>
          <p>{quotes[0].text}</p>
          <footer>
            {quotes[0].source}, on {quotes[0].on}
          </footer>
        </blockquote>
      </section>

      <section className="section wrap" aria-labelledby="watch">
        <div className="section-head">
          <h2 id="watch" className="display-md">
            Watch
          </h2>
          <Link to="/videos" className="more-link">
            All videos <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="video-mosaic">
          {[featured, ...moreVideos].map((v, i) => (
            <Link
              key={v.id}
              to={`/videos?v=${v.id}`}
              className={`video-tile ${i === 0 ? "video-tile-lg" : ""}`}
            >
              <Photo photo={v.photo} red={i === 0} />
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

      <section className="section band-stock" aria-labelledby="table">
        <div className="wrap">
          <div className="section-head">
            <h2 id="table" className="display-md">
              From the merch table
            </h2>
            <p>
              Screenprinted in Baltimore, shipped in three working days, or
              picked up at any show.
            </p>
          </div>
          <div className="product-grid">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Link to="/merch" className="more-link">
            Everything in the store <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap band-split" aria-labelledby="band">
        <Photo photo={photos.rehearsal} className="band-photo" />
        <div>
          <h2 id="band" className="display-md">
            {home.bandHeading}
          </h2>
          <p>{home.bandText}</p>
          <dl className="lineup">
            {members.map((m) => (
              <div key={m.name}>
                <dt>{m.name}</dt>
                <dd>{m.role}</dd>
              </div>
            ))}
          </dl>
          <Link to="/about" className="more-link">
            The whole story <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="records">
        <div className="section-head">
          <h2 id="records" className="display-md">
            Every record
          </h2>
          <Link to="/music" className="more-link">
            Discography <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <div className="shelf">
          {releases.map((r) => (
            <ReleaseCard key={r.slug} release={r} />
          ))}
        </div>
      </section>

      <section className="close band-red" aria-labelledby="close">
        <div className="wrap close-grid">
          <ShowBill show={homecoming} />
          <div>
            <h2 id="close" className="display-lg">
              {home.closeHeading}
            </h2>
            <p>{home.closeText}</p>
            <p className="close-when">
              {longDate(homecoming.date)} · {homecoming.venue} · on stage{" "}
              {clock(homecoming.onstage)}
            </p>
            <Link to={`/tour/${homecoming.id}`} className="btn btn-ink">
              Get homecoming tickets
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
