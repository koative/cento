import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link, navigate } from "../router";
import { bagCheck, cars, deals, faq, home, photos, stations } from "../content";
import { fromRate, setDraft, stationName } from "../lib/booking";
import { money, openStatus } from "../lib/format";
import { TripForm } from "../components/TripForm";
import { CarDrawing } from "../components/CarDrawing";
import { BagPlanner } from "../components/BagCheck";
import { RegionMap } from "../components/RegionMap";

export function Home() {
  const featured = deals.slice(0, 3);
  const questions = [faq[0].items[0], faq[1].items[3], faq[3].items[0]];

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
          </div>
          <div className="hero-search sign-panel">
            <h2>{home.searchTitle}</h2>
            <TripForm
              id="home-search"
              compact
              submitLabel="Show cars and prices"
              onDone={() => {
                setDraft({ step: 2 });
                navigate("/book");
              }}
            />
          </div>
          <figure className="hero-photo">
            <img
              src={photos.hero.src}
              alt={photos.hero.alt}
              width={photos.hero.w}
              height={photos.hero.h}
              fetchPriority="high"
            />
            <figcaption className="key-tag key-tag-lg">
              <span>From {money(fromRate)}</span>a day, unlimited miles
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section row-section" aria-labelledby="row-title">
        <div className="wrap section-head">
          <h2 id="row-title">Eight groups, parked and ready</h2>
          <Link to="/fleet" className="text-link">
            Compare the fleet <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="row" aria-label="Fleet by group">
          {cars.map((car, i) => (
            <li key={car.id} className="row-bay">
              <span className="bay-no" aria-hidden="true">
                R{String(i + 1).padStart(2, "0")}
              </span>
              <CarDrawing car={car} />
              <Link to={`/fleet/${car.id}`} className="card-link row-name">
                {car.name}
              </Link>
              <span className="row-meta">
                {car.className} ·{" "}
                <span className="tnum">{money(car.rate)}</span>/day
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="inc-title">
        <div className="wrap ledger-grid">
          <h2 id="inc-title">{home.included.title}</h2>
          <dl className="ledger">
            {home.included.items.map((it) => (
              <div key={it.term}>
                <dt>{it.term}</dt>
                <dd>{it.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section band-concrete" aria-labelledby="bags-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="bags-title">{bagCheck.title}</h2>
            <p className="section-intro">{bagCheck.text}</p>
          </div>
          <BagPlanner />
        </div>
      </section>

      <section className="section band-ink" aria-labelledby="steps-title">
        <div className="wrap">
          <h2 id="steps-title">{home.pickup.title}</h2>
          <ol className="wayfinding">
            {home.pickup.steps.map((s, i) => (
              <li key={s.title}>
                <span className="way-no" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                {i < home.pickup.steps.length - 1 && (
                  <ArrowRight className="way-arrow" aria-hidden="true" />
                )}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="stations-title">
        <div className="wrap stations-grid">
          <div>
            <h2 id="stations-title">Five stations, one coast</h2>
            <p className="section-intro">
              Return to any of them. Trips between the airport, Downtown and
              Northgate are always free one way.
            </p>
            <ul className="station-list">
              {stations.map((s) => {
                const status = openStatus(s);
                return (
                  <li key={s.id}>
                    <span className="station-code">{s.code}</span>
                    <Link to={`/locations/${s.id}`} className="card-link">
                      {s.name}
                    </Link>
                    <span
                      className="status"
                      data-open={status.open ? "" : undefined}
                    >
                      {status.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <RegionMap
            links
            label="Map of the Salt Coast with Roam's five stations"
          />
        </div>
      </section>

      <section className="section band-concrete" aria-labelledby="deals-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="deals-title">This season's codes</h2>
            <Link to="/deals" className="text-link">
              All six deals <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="deal-strip">
            {featured.map((d) => (
              <li key={d.code}>
                <p className="code">{d.code}</p>
                <h3>{d.title}</h3>
                <p>{d.summary}</p>
                <p className="deal-until">Until {d.until}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="drives-title">
        <div className="wrap">
          <h2 id="drives-title">{home.drives.title}</h2>
          <div className="drives">
            {home.drives.items.map((d, i) => {
              const p = photos[d.photo];
              return (
                <article key={d.title} className={`drive drive-${i}`}>
                  <img
                    src={p.src}
                    alt={p.alt}
                    width={p.w}
                    height={p.h}
                    loading="lazy"
                  />
                  <div className="drive-copy">
                    <h3>{d.title}</h3>
                    <p className="drive-route">
                      {stationName(d.from)}
                      {d.from !== d.to && ` to ${stationName(d.to)}`} ·{" "}
                      <span className="tnum">{d.miles} mi</span> · {d.time}
                    </p>
                    <p>{d.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section quotes-section" aria-label="What renters say">
        <div className="wrap quotes">
          {home.quotes.map((q) => (
            <figure key={q.name}>
              <blockquote>{q.text}</blockquote>
              <figcaption>
                <strong>{q.name}</strong> {q.trip}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="section band-concrete" aria-labelledby="faq-title">
        <div className="wrap faq-teaser">
          <div>
            <h2 id="faq-title">Asked at the counter every day</h2>
            <Link to="/faq" className="text-link">
              Every question <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="faq-list">
            {questions.map((q) => (
              <details key={q.q}>
                <summary>{q.q}</summary>
                <p>{q.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="close-band" aria-labelledby="close-title">
        <div className="wrap close-grid">
          <h2 id="close-title">{home.close.title}</h2>
          <div>
            <p>{home.close.text}</p>
            <Link to="/book" className="btn btn-ink btn-wide">
              Book a car <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
