import { useEffect, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  home,
  partners,
  products,
  series,
  tiers,
  videos,
} from "../content";
import { Thumb, VideoCard } from "../components/VideoCard";
import { ProductCard } from "../components/ProductCard";
import { Mockup } from "../components/Mockup";
import { Mark } from "../components/Header";
import { date, money, views } from "../lib/format";

/** Next Thursday 6 pm ET. ponytail: fixed at 22:00 UTC (EDT); reads an hour early in winter, use Intl time zones if that matters. */
function nextEpisode(now: Date) {
  const d = new Date(now);
  d.setUTCHours(22, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() + ((4 - d.getUTCDay() + 7) % 7));
  if (d <= now) d.setUTCDate(d.getUTCDate() + 7);
  return d;
}

function Countdown() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const left = Math.max(0, nextEpisode(now).getTime() - now.getTime());
  const days = Math.floor(left / 864e5);
  const hours = Math.floor((left % 864e5) / 36e5);
  const mins = Math.floor((left % 36e5) / 6e4);
  return (
    <p className="countdown">
      <span>Next episode in</span>
      <strong>
        {days}d {String(hours).padStart(2, "0")}h{" "}
        {String(mins).padStart(2, "0")}m
      </strong>
    </p>
  );
}

export function Home() {
  const [latest, ...rest] = videos;
  const latestSeries = series.find((s) => s.slug === latest.series)!;
  const opener = products.find((p) => p.id === "channel-opener")!;
  const others = products.filter((p) =>
    ["shop-tee", "waxed-apron", "welders-cap"].includes(p.id),
  );
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <h1>Steel, sparks and second chances.</h1>
          <p className="lead">{brand.intro}</p>
          <div className="channel-id">
            <Mark className="avatar" />
            <p>
              <strong>{brand.name}</strong>
              <span>
                {brand.handle} · {brand.subscribers}
              </span>
            </p>
          </div>
          <div className="actions">
            <Link to={"/videos/" + latest.slug} className="btn btn-spark">
              <Play size={18} fill="currentColor" aria-hidden="true" /> Watch
              the latest
            </Link>
            <Link to="/membership" className="btn btn-ghost">
              Join the shop
            </Link>
          </div>
        </div>
        <article className="hero-video">
          <Link to={"/videos/" + latest.slug} className="hero-video-link">
            <Thumb video={latest} eager />
            <span className="hero-play" aria-hidden="true">
              <Play size={30} fill="currentColor" />
            </span>
            <h2>{latest.title}</h2>
          </Link>
          <p className="video-meta">
            <span data-tone={latestSeries.tone}>New · {latestSeries.name}</span>
            <span>
              {views(latest.views)} ·{" "}
              <time dateTime={latest.published}>{date(latest.published)}</time>
            </span>
          </p>
        </article>
      </section>

      <section className="section wrap" aria-labelledby="h-latest">
        <div className="section-head">
          <h2 id="h-latest">Latest from the shop</h2>
          <Link to="/videos" className="more">
            All {videos.length} videos{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="video-grid">
          {rest.slice(0, 4).map((v) => (
            <VideoCard key={v.slug} video={v} />
          ))}
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-series">
        <div className="section-head">
          <h2 id="h-series">Four ways into the shop</h2>
          <Link to="/series" className="more">
            All series <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="series-shelf">
          {series.map((s) => {
            const eps = videos.filter((v) => v.series === s.slug);
            return (
              <li key={s.slug} data-tone={s.tone}>
                <Link to={"/series/" + s.slug} className="shelf-row">
                  <span className="shelf-name">{s.name}</span>
                  <span className="shelf-pitch">{s.pitch}</span>
                  <span className="shelf-count">
                    {eps.length} episodes · {s.rhythm}
                  </span>
                  <span className="shelf-stack" aria-hidden="true">
                    {eps.slice(0, 3).map((v) => (
                      <img
                        key={v.slug}
                        src={v.image}
                        alt=""
                        width={160}
                        height={90}
                        loading="lazy"
                      />
                    ))}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="manifesto" aria-labelledby="h-manifesto">
        <div className="wrap">
          <h2 id="h-manifesto">{home.manifesto}</h2>
          <p>{home.manifestoNote}</p>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-merch">
        <div className="section-head">
          <h2 id="h-merch">Merch, mostly made a few miles from the shop</h2>
          <Link to="/shop" className="more">
            Shop all merch <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <div className="merch-split">
          <Link to={"/shop/" + opener.id} className="merch-feature">
            <Mockup kind={opener.kind} color={opener.colors[0]} label="" />
            <div>
              <h3>{opener.name}</h3>
              <p>{opener.blurb}</p>
              <span className="price">{money(opener.price)}</span>
            </div>
          </Link>
          <div className="merch-rest">
            {others.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-week">
        <div className="section-head">
          <h2 id="h-week">A week on the channel</h2>
        </div>
        <div className="week" aria-hidden="true">
          {days.map((d) => (
            <span
              key={d}
              data-on={["Tue", "Thu", "Fri", "Sun"].includes(d) || undefined}
            >
              {d}
            </span>
          ))}
        </div>
        <ul className="schedule">
          {home.schedule.map((s) => (
            <li key={s.what}>
              <p className="schedule-when">
                <strong>{s.day}</strong> {s.time}
              </p>
              <h3>{s.what}</h3>
              <p>{s.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="members-band" aria-labelledby="h-members">
        <div className="wrap members-inner">
          <div>
            <h2 id="h-members">
              Members keep the lights on, and get the plans.
            </h2>
            <p>
              Early episodes, printable cut lists for every build, a monthly
              live stream from the bench. From {money(tiers[0].monthly)} a
              month.
            </p>
            <Link to="/membership" className="btn btn-spark">
              See memberships
            </Link>
          </div>
          <ul className="tier-strip">
            {tiers.map((t) => (
              <li key={t.id} data-featured={t.featured || undefined}>
                <span className="tier-name">{t.name}</span>
                <span className="tier-price">
                  {money(t.monthly)}
                  <small>/mo</small>
                </span>
                <span className="tier-pitch">{t.pitch}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-comments">
        <div className="section-head">
          <h2 id="h-comments">From the comments</h2>
        </div>
        <ul className="comments">
          {home.comments.map((c) => (
            <li key={c.handle}>
              <span className="comment-avatar" aria-hidden="true">
                {c.handle.charAt(1).toUpperCase()}
              </span>
              <div>
                <p className="comment-head">
                  <strong>{c.handle}</strong> <span>{c.when}</span>
                </p>
                <p>{c.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        className="section wrap partner-strip"
        aria-labelledby="h-partners"
      >
        <h2 id="h-partners">
          Six sponsored builds a year. Every one tested first.
        </h2>
        <p>{partners.intro}</p>
        <Link to="/partners" className="btn btn-ghost">
          Brand deals &amp; media kit
        </Link>
      </section>

      <section className="close" aria-labelledby="h-close">
        <div className="wrap close-inner">
          <h2 id="h-close">{home.close}</h2>
          <Countdown />
          <div className="actions">
            <Link to={"/videos/" + latest.slug} className="btn btn-spark">
              <Play size={18} fill="currentColor" aria-hidden="true" /> Catch up
              on this week
            </Link>
            <Link to="/series" className="btn btn-ghost">
              Start a series
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
