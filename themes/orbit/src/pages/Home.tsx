import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  brand,
  flights,
  home,
  images,
  jobs,
  missions,
  rideshare,
  sites,
  vehicles,
} from "../content";
import {
  day,
  money,
  nextFlight,
  num,
  useNow,
  utc,
  vehicleName,
} from "../lib/format";
import { Countdown, FlightTable } from "../components/FlightTable";
import { Calculator } from "../components/Calculator";
import { Steps } from "../components/Steps";
import { MissionCard } from "../components/MissionCard";
import { VehicleSilhouette } from "../components/VehicleDrawing";

export function Home() {
  const now = useNow(60000);
  const next = nextFlight(now);
  const upcoming = flights.filter((f) => Date.parse(f.date) > now).slice(0, 4);
  const flown = missions.filter((m) => m.outcome !== "Upcoming").slice(0, 3);
  const tallest = Math.max(...vehicles.map((v) => v.geometry.height));

  return (
    <>
      <section className="hero night">
        <img
          className="hero-photo"
          src={images.launchArc.src}
          alt=""
          width={images.launchArc.w}
          height={images.launchArc.h}
        />
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/rideshare" className="btn btn-primary">
                Price your payload <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link to="/manifest" className="btn btn-ghost">
                Read the manifest
              </Link>
            </div>
          </div>

          {next && (
            <aside className="next-launch" aria-labelledby="next-title">
              <h2 id="next-title">
                Next launch: <span>{next.name}</span>
              </h2>
              <Countdown iso={next.date} name={next.name} />
              <dl className="facts tnum">
                <div>
                  <dt>Window opens</dt>
                  <dd>
                    {day(next.date)}, {utc(next.date)}
                  </dd>
                </div>
                <div>
                  <dt>Vehicle</dt>
                  <dd>{vehicleName(next.vehicle)}</dd>
                </div>
                <div>
                  <dt>Orbit</dt>
                  <dd>{next.orbit}</dd>
                </div>
                <div>
                  <dt>Pad</dt>
                  <dd>{sites[next.site].name}</dd>
                </div>
              </dl>
              {next.mission && (
                <Link to={`/missions/${next.mission}`} className="text-link">
                  Mission profile <ArrowRight aria-hidden="true" size={16} />
                </Link>
              )}
            </aside>
          )}
        </div>
        <p className="wrap photo-credit">
          Photograph: long exposure of an ascent at dusk.
        </p>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>The next four launches</h2>
            <p>
              Dates are NET, no earlier than. When one moves, it moves here
              first and in your inbox second.
            </p>
          </div>
          <FlightTable rows={upcoming} caption="Next four launches" />
          <Link to="/manifest" className="text-link">
            Full manifest through 2027{" "}
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      <section className="section fleet-band">
        <div className="wrap">
          <div className="section-head">
            <h2>Three vehicles, drawn to the same scale.</h2>
            <p>
              A dedicated small launcher, a reusable medium lifter that carries
              every rideshare, and the tug that takes you the rest of the way.
            </p>
          </div>
          <div className="fleet">
            {vehicles.map((v) => (
              <article key={v.id} className="fleet-item">
                <div className="fleet-drawing">
                  <VehicleSilhouette v={v} k={9} frame={tallest} />
                </div>
                <h3>
                  <Link to={`/vehicles/${v.id}`} className="stretched">
                    {v.name}
                  </Link>
                </h3>
                <p className="role">{v.role}</p>
                <p className="tnum fleet-stat">
                  {v.kind === "tug"
                    ? `${num(v.performance[0].kg)} kg across 8 ports`
                    : `${num(v.performance[1].kg)} kg to ${v.performance[1].orbit}`}
                </p>
              </article>
            ))}
          </div>
          <p className="scale-note">
            Scale: 10 m = 90 px. Wayfarer is 2.4 m tall; it is the small one.
          </p>
        </div>
      </section>

      <section className="section calc-band">
        <div className="wrap">
          <div className="section-head">
            <h2>What your satellite costs to fly.</h2>
            <p>
              Rideshare from {money(rideshare.orbits[1].perKg)}/kg to
              mid-inclination and {money(rideshare.orbits[0].perKg)}/kg to
              sun-synchronous. Choose a flight and services on the full
              calculator; the number does not change on the phone.
            </p>
          </div>
          <Calculator compact />
        </div>
      </section>

      <section className="quiet">
        <img
          src={images.limb.src}
          alt={images.limb.alt}
          width={images.limb.w}
          height={images.limb.h}
          loading="lazy"
        />
        <div className="wrap">
          <p>
            More than 300 satellites from 90 operators have ridden with us.
            Every one of them could read the launch date a year ahead.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Recently flown</h2>
            <Link to="/missions" className="text-link">
              Every mission, including the one that went wrong{" "}
              <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="mission-grid">
            {flown.map((m) => (
              <MissionCard key={m.slug} m={m} />
            ))}
          </div>
        </div>
      </section>

      <section className="section steps-band">
        <div className="wrap">
          <div className="section-head">
            <h2>From reservation to deployment in twelve months.</h2>
            <p>
              One mission manager from the deposit to the first ping from your
              satellite.
            </p>
          </div>
          <Steps steps={rideshare.steps} />
        </div>
      </section>

      <section className="section">
        <div className="wrap record">
          <div className="section-head">
            <h2>Flight log</h2>
            <p>
              Every Orbit launch since 2023, one mark each. Fifty flights, one
              partial failure, and the investigation is{" "}
              <Link to="/missions/headwind">public</Link>.
            </p>
          </div>
          <div className="log">
            {home.record.years.map((y, i) => {
              const first = home.record.years
                .slice(0, i)
                .reduce((s, x) => s + x.flights, 1);
              const partial = home.record.partial
                .filter(
                  (p) => p.flight >= first && p.flight < first + y.flights,
                )
                .map((p) => p.flight);
              return (
                <div key={y.year} className="log-year">
                  <span className="tnum">{y.year}</span>
                  <div
                    className="log-marks"
                    role="img"
                    aria-label={`${y.flights} flights in ${y.year}${partial.length ? `, ${partial.length} partial failure` : ", all successful"}`}
                  >
                    {Array.from({ length: y.flights }, (_, n) => (
                      <span
                        key={n}
                        data-partial={
                          partial.includes(first + n) ? "" : undefined
                        }
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section testimonial">
        <div className="wrap testimonial-grid">
          <img
            src={images.cubesat.src}
            alt={images.cubesat.alt}
            width={images.cubesat.w}
            height={images.cubesat.h}
            loading="lazy"
          />
          <figure>
            <blockquote>
              <p>{home.quote.text}</p>
            </blockquote>
            <figcaption>
              <strong>{home.quote.name}</strong>
              {home.quote.role}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section careers-band night">
        <div className="wrap careers-grid">
          <img
            src={images.engine.src}
            alt={images.engine.alt}
            width={images.engine.w}
            height={images.engine.h}
            loading="lazy"
          />
          <div>
            <h2>Build the engine you will watch fly.</h2>
            <p>
              We make engines, tanks, composites and flight software under one
              roof. {jobs.length} open roles across the factory, the test site
              and the pad.
            </p>
            <ul className="role-list">
              {jobs.slice(0, 3).map((j) => (
                <li key={j.slug}>
                  <Link to={`/careers/${j.slug}`}>
                    <strong>{j.title}</strong>
                    <span>{j.location}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/careers" className="btn btn-ghost">
              All open roles <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="closing night">
        <div className="wrap">
          <h2>{home.closing}</h2>
          <p>
            Reserve with a 10% deposit; we move you to the next flight free of
            charge if your satellite is not ready.
          </p>
          <div className="actions">
            <Link to="/reserve" className="btn btn-primary">
              Reserve a slot <ArrowRight aria-hidden="true" size={18} />
            </Link>
            <a href={`mailto:${brand.email}`} className="btn btn-ghost">
              {brand.email}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
