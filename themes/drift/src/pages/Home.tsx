import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  bring,
  camps,
  coaches,
  home,
  images,
  lessons,
  spots,
} from "../content";
import { Forecast } from "../components/Forecast";
import { CampCard } from "../components/CampCard";
import {
  forecast,
  hourLabel,
  rate,
  ratingLabel,
  sizeWord,
} from "../lib/forecast";
import { money } from "../lib/util";

function TodayCard() {
  const now = new Date();
  const today = forecast(spots[0], now)[0];
  const hour = Math.min(19, Math.max(6, now.getHours() + 1));
  const h = today.hours.find((x) => x.hour === hour) ?? today.hours[0];
  const r = rate(h, "first-wave");
  return (
    <Link to="/forecast" className="today">
      <span className="today-label">
        Gull Point at <span className="num">{hourLabel(h.hour)}</span>
      </span>
      <span className="today-wave">
        <span className="num">{h.wave}</span> ft
      </span>
      <span className="today-detail">
        {sizeWord(h.wave)} · {h.wind} mph {h.windFrom}
        {h.offshore ? " offshore" : ""} · tide {h.rising ? "rising" : "falling"}
      </span>
      <span className="today-rating" data-r={r}>
        {ratingLabel[r]} for first-timers
      </span>
      <span className="today-more">
        Full surf report <ArrowRight aria-hidden="true" size={16} />
      </span>
    </Link>
  );
}

export function Home() {
  const core = lessons.filter((l) => l.id === l.level);
  const [featured, ...others] = camps.filter((c) =>
    c.departures.some((d) => d.spots > 0),
  );

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/book" className="btn btn-ink">
                Book a lesson <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link to="/camps" className="btn btn-line">
                Browse surf camps
              </Link>
            </div>
            <ul className="hero-prices" aria-label="Lesson prices">
              {core.map((l) => (
                <li key={l.id}>
                  <Link to="/lessons">
                    <strong>{l.name}</strong>
                    <span>
                      {l.duration} ·{" "}
                      <span className="num">{money(l.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <figure className="hero-figure">
            <img
              src={images.lessonGroup.src}
              alt={images.lessonGroup.alt}
              width={images.lessonGroup.w}
              height={images.lessonGroup.h}
            />
            <TodayCard />
          </figure>
        </div>
        <svg
          className="contours"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d="M0 70C160 70 220 30 400 30s260 50 440 50 260-44 420-44 160 24 180 24" />
          <path d="M0 92C180 92 240 58 420 58s260 44 420 44 280-38 420-38 140 20 180 20" />
          <path d="M0 112C200 112 260 84 440 84s240 34 400 34 300-30 440-30 120 14 160 14" />
        </svg>
      </section>

      <section className="section lessons-rack" aria-labelledby="h-lessons">
        <div className="wrap">
          <div className="section-head">
            <h2 id="h-lessons">Three lessons, one for wherever you are</h2>
            <p>
              Every lesson includes a soft-top board, a wetsuit that fits and a
              hot shower at the hut. Packs of three or five save up to 18%.
            </p>
          </div>
          <ol className="rack">
            {core.map((l) => (
              <li key={l.id} className="rack-row">
                <img
                  src={l.image.src}
                  alt=""
                  width={l.image.w}
                  height={l.image.h}
                  loading="lazy"
                  style={{ objectPosition: l.image.pos }}
                />
                <div className="rack-name">
                  <h3>{l.name}</h3>
                  <p>{l.who}</p>
                </div>
                <p className="rack-summary">{l.summary}</p>
                <p className="rack-price">
                  <span className="num">{money(l.price)}</span>
                  <small>
                    {l.duration} · {l.ratio}
                  </small>
                </p>
                <Link
                  to={`/book?lesson=${l.id}`}
                  className="btn btn-line btn-sm"
                  aria-label={`Book ${l.name}`}
                >
                  Book
                </Link>
              </li>
            ))}
          </ol>
          <p className="more-line">
            Also: <Link to="/lessons">private sessions from {money(180)}</Link>{" "}
            and <Link to="/lessons">Groms Club for kids 7–13</Link> on
            Saturdays.
          </p>
        </div>
      </section>

      <section className="section forecast-band" aria-labelledby="h-forecast">
        <div className="wrap">
          <div className="section-head">
            <h2 id="h-forecast">Is it any good tomorrow?</h2>
            <p>
              The same forecast our coaches read every evening. Pick your level
              and we'll show you the hours worth paddling out for, then book the
              one you like.
            </p>
          </div>
          <Forecast />
        </div>
      </section>

      <section className="section method" aria-labelledby="h-method">
        <div className="wrap method-grid">
          <div className="section-head">
            <h2 id="h-method">{home.method.heading}</h2>
            <p>{home.method.text}</p>
          </div>
          <ol className="stages">
            {home.method.steps.map((s, n) => (
              <li key={s.title} data-stage={n}>
                <span className="stage-n num" aria-hidden="true">
                  {n + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <svg
            className="stages-profile"
            viewBox="0 0 900 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path className="sand" d="M0 110 L300 110 L300 120 L0 120Z" />
            <path
              className="foam"
              d="M300 104c40-14 70 8 110-6s60 10 100-2 60 8 90-4L600 120H300Z"
            />
            <path
              className="green"
              d="M600 100c60 0 90-70 160-70s70 40 140 40V120H600Z"
            />
          </svg>
        </div>
      </section>

      <section className="section camps-feature" aria-labelledby="h-camps">
        <div className="wrap">
          <div className="section-head row">
            <h2 id="h-camps">Surf camps, home and away</h2>
            <Link to="/camps" className="text-link">
              All {camps.length} camps{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="feature-camp">
            <img
              src={featured.image.src}
              alt={featured.image.alt}
              width={featured.image.w}
              height={featured.image.h}
              loading="lazy"
            />
            <div>
              <p className="tags">
                <span className="tag">{featured.level}</span>
                <span>{featured.place}</span>
              </p>
              <h3>{featured.name}</h3>
              <p>{featured.intro}</p>
              <ul className="ticks">
                {featured.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="feature-price">
                <span className="num">{money(featured.price)}</span> ·{" "}
                {featured.length}
              </p>
              <Link to={`/camps/${featured.id}`} className="btn btn-ink">
                See dates and itinerary{" "}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            </div>
          </div>
          <div className="camp-grid">
            {others.slice(0, 3).map((c) => (
              <CampCard key={c.id} camp={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="quote-band" aria-label="What students say">
        <figure className="wrap">
          <blockquote>
            <p>“{home.quote.text}”</p>
          </blockquote>
          <figcaption>{home.quote.who}</figcaption>
        </figure>
      </section>

      <section className="section day-band" aria-labelledby="h-day">
        <div className="wrap day-grid">
          <div>
            <h2 id="h-day">A day on camp at Gull Point</h2>
            <p>Times shift with the tide, but the shape of the day doesn't.</p>
            <img
              src={images.campLife.src}
              alt={images.campLife.alt}
              width={images.campLife.w}
              height={images.campLife.h}
              loading="lazy"
            />
          </div>
          <ol className="timeline">
            {home.day.map((d) => (
              <li key={d.time}>
                <time className="num">{d.time}</time>
                <p>{d.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section coaches-teaser" aria-labelledby="h-coaches">
        <div className="wrap">
          <div className="section-head row">
            <h2 id="h-coaches">The people in the water with you</h2>
            <Link to="/coaches" className="text-link">
              Meet the coaches <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="coach-strip">
            {coaches.map((c) => (
              <li key={c.id}>
                <Link to={`/coaches/${c.id}`}>
                  <img
                    src={c.image.src}
                    alt=""
                    width={c.image.w}
                    height={c.image.h}
                    loading="lazy"
                    style={{ objectPosition: c.image.pos }}
                  />
                  <strong>{c.name}</strong>
                  <span>{c.role}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section practical" aria-labelledby="h-bring">
        <div className="wrap practical-grid">
          <div>
            <h2 id="h-bring">Bring a towel. We've got the rest.</h2>
            <p>
              Boards, wetsuits, boots in winter, lockers and hot showers are
              part of every lesson. Here's what to pack yourself.
            </p>
            <Link to="/faq" className="text-link">
              Read the full FAQ <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="ticks big">
            {bring.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close" aria-labelledby="h-close">
        <img
          src={images.sunset.src}
          alt=""
          width={images.sunset.w}
          height={images.sunset.h}
          loading="lazy"
        />
        <div className="wrap close-inner">
          <h2 id="h-close">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/book" className="btn btn-wax">
              Book a lesson <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <Link to="/forecast" className="btn btn-line-light">
              Check the surf report
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
