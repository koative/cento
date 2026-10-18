import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  commissions,
  events,
  findFrame,
  home,
  prints,
  series,
} from "../content";
import { PrintCard } from "../components/PrintCard";

export function Home() {
  const heroFrames = home.heroOrder.map((id) => findFrame(id)!);
  const [i, setI] = useState(0);
  const hero = heroFrames[i];
  const n = heroFrames.length;
  const featured = series.find((s) => s.slug === home.featured)!;
  const [big, ...small] = [
    featured.frames[2],
    featured.frames[1],
    featured.frames[5],
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>{home.title}</h1>
          <p className="lede">{home.lede}</p>
          <div className="actions">
            <Link to="/series" className="btn btn-solid">
              See the series
            </Link>
            <Link to="/commissions" className="text-link">
              Commissions <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <p className="hero-note">{brand.booking}.</p>
        </div>
        <figure className="hero-figure">
          <div className="hero-print">
            <img
              key={hero.id}
              className="develop"
              src={hero.src}
              width={hero.w}
              height={hero.h}
              alt={hero.alt}
            />
          </div>
          <figcaption className="hero-label">
            <span className="label">
              <Link
                to={`/series/${hero.series.slug}?frame=${hero.id}`}
                className="label-title"
              >
                {hero.title}
              </Link>
              <span>
                From <em>{hero.series.title}</em>, {hero.series.years}
              </span>
            </span>
            <span className="hero-controls">
              <button
                type="button"
                className="icon-btn"
                onClick={() => setI((i - 1 + n) % n)}
                aria-label="Previous photograph"
              >
                <ArrowLeft size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
              <span className="counter" aria-live="polite">
                <span className="visually-hidden">Photograph </span>
                {i + 1} / {n}
              </span>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setI((i + 1) % n)}
                aria-label="Next photograph"
              >
                <ArrowRight size={20} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </span>
          </figcaption>
        </figure>
      </section>

      <section className="section home-series" aria-labelledby="h-series">
        <div className="section-head">
          <h2 id="h-series">Six series, all still open</h2>
          <Link to="/series" className="text-link">
            Every series <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="series-strip">
          {series.map((s) => {
            const cover =
              heroFrames.find((f) => f.series.slug === s.slug) ?? s.frames[0];
            return (
              <li key={s.slug}>
                <Link to={`/series/${s.slug}`} className="series-tile">
                  <span className="series-tile-img">
                    <img
                      src={cover.src}
                      alt=""
                      width={cover.w}
                      height={cover.h}
                      loading="lazy"
                    />
                  </span>
                  <span className="label">
                    <span className="label-title">{s.title}</span>
                    <span>
                      {s.subject} · {s.years} · {s.frames.length} frames
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="statement" aria-label="On the practice">
        <blockquote>
          <p>{home.statement}</p>
          <footer>{brand.photographer}</footer>
        </blockquote>
      </section>

      <section className="section featured" aria-labelledby="h-featured">
        <div className="featured-text">
          <h2 id="h-featured">{featured.title}</h2>
          <p>{featured.summary}</p>
          <p className="featured-date">{featured.shown[0]}</p>
          <Link to={`/series/${featured.slug}`} className="btn">
            Open the contact sheet
          </Link>
        </div>
        <figure className="featured-big">
          <img
            src={big.src}
            alt={big.alt}
            width={big.w}
            height={big.h}
            loading="lazy"
          />
          <figcaption className="label">
            <span className="label-title">{big.title}</span>
            <span>{big.place}</span>
          </figcaption>
        </figure>
        {small.map((f) => (
          <figure className="featured-small" key={f.id}>
            <img
              src={f.src}
              alt={f.alt}
              width={f.w}
              height={f.h}
              loading="lazy"
            />
            <figcaption className="label">
              <span className="label-title">{f.title}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section
        className="section home-commissions"
        aria-labelledby="h-commissions"
      >
        <div className="section-head">
          <h2 id="h-commissions">
            Commissions for editors, architects and a few brands
          </h2>
          <Link to="/commissions" className="text-link">
            Rates and process <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <ul className="discipline-rows">
          {commissions.disciplines.map((d) => {
            const img = findFrame(d.image)!;
            return (
              <li key={d.id}>
                <img
                  src={img.src}
                  alt=""
                  width={img.w}
                  height={img.h}
                  loading="lazy"
                />
                <h3>{d.name}</h3>
                <p>{d.body}</p>
                <p className="rate">{d.rate}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section home-prints" aria-labelledby="h-prints">
        <div className="section-head">
          <h2 id="h-prints">Editioned prints</h2>
          <Link to="/prints" className="text-link">
            All eight prints <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <p className="section-lede">
          Signed, numbered and never reprinted once an edition closes. Colour on
          cotton rag, black-and-white printed by hand in the studio darkroom.
        </p>
        <div className="print-grid">
          {prints.slice(0, 4).map((p) => (
            <PrintCard key={p.id} print={p} />
          ))}
        </div>
      </section>

      <section className="section clients" aria-labelledby="h-clients">
        <h2 id="h-clients">Published and commissioned by</h2>
        <ul className="client-list">
          {commissions.clients.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <blockquote className="quote">
          <p>{commissions.testimonials[0].quote}</p>
          <footer>
            {commissions.testimonials[0].name},{" "}
            {commissions.testimonials[0].role}
          </footer>
        </blockquote>
      </section>

      <section className="section events" aria-labelledby="h-events">
        <h2 id="h-events">Where to see the work</h2>
        <ul className="event-list">
          {events.map((e) => (
            <li key={e.title}>
              <p className="event-date">{e.date}</p>
              <h3>
                <Link to={e.to}>{e.title}</Link>
              </h3>
              <p>{e.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="close" aria-labelledby="h-close">
        <h2 id="h-close">Have something in mind?</h2>
        <p>
          A portrait for a feature, a building before it opens, a campaign that
          should feel like a series. Tell me about it and I will reply myself.
        </p>
        <div className="actions">
          <Link to="/contact" className="btn btn-solid">
            Start an enquiry
          </Link>
          <a href={`mailto:${brand.email}`} className="text-link">
            {brand.email}
          </a>
        </div>
      </section>
    </>
  );
}
