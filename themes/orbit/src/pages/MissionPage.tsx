import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { flights, missions, sites, type Mission } from "../content";
import { day, num, utc, vehicleName } from "../lib/format";
import { Patch } from "../components/Patch";
import { OrbitDiagram } from "../components/OrbitDiagram";
import { Countdown } from "../components/FlightTable";
import { MissionCard } from "../components/MissionCard";

export function MissionPage({ m }: { m: Mission }) {
  const upcoming = m.outcome === "Upcoming";
  const flight = flights.find((f) => f.mission === m.slug);
  const related = [
    ...missions.filter((x) => x.slug !== m.slug && x.vehicle === m.vehicle),
    ...missions.filter((x) => x.vehicle !== m.vehicle),
  ].slice(0, 3);

  return (
    <>
      <section className="mission-head night">
        <div className="wrap">
          <Link to="/missions" className="back">
            <ArrowLeft aria-hidden="true" size={16} /> All missions
          </Link>
          <div className="mission-head-grid">
            <Patch mission={m} size={220} />
            <div>
              <p className="mission-meta tnum">
                <span className="outcome" data-outcome={m.outcome}>
                  {m.outcome}
                </span>
                {m.flight} · {m.type}
              </p>
              <h1>{m.name}</h1>
              <p className="lede">{m.summary}</p>
              {upcoming && <Countdown iso={m.date} name={m.name} />}
            </div>
          </div>
          <dl className="facts facts-row tnum">
            <div>
              <dt>{upcoming ? "Window opens" : "Lift-off"}</dt>
              <dd>
                {day(m.date)}, {utc(m.date)}
              </dd>
            </div>
            <div>
              <dt>Vehicle</dt>
              <dd>
                <Link to={`/vehicles/${m.vehicle}`}>
                  {vehicleName(m.vehicle)}
                </Link>
              </dd>
            </div>
            <div>
              <dt>Site</dt>
              <dd>{sites[m.site].name}</dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>{m.customer}</dd>
            </div>
            <div>
              <dt>Payload mass</dt>
              <dd>
                {num(m.payloadMass)} kg, {m.payloads} spacecraft
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap mission-body">
          <div className="prose">
            <h2>{upcoming ? "Mission plan" : "What happened"}</h2>
            {m.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <figure className="mission-orbit">
            <OrbitDiagram
              altitude={m.orbit.altitude}
              inclination={m.orbit.inclination}
              label={m.name}
            />
            <figcaption className="tnum">
              {m.orbit.label}, {m.orbit.inclination}° · altitude drawn ×5
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap split">
          <div>
            <h2>{upcoming ? "Planned timeline" : "Flight timeline"}</h2>
            <ol className="timeline tnum">
              {m.timeline.map((t) => (
                <li key={t.t}>
                  <span>{t.t}</span>
                  <p>{t.event}</p>
                </li>
              ))}
            </ol>
          </div>
          <img
            src={m.image.src}
            alt={m.image.alt}
            width={m.image.w}
            height={m.image.h}
            loading="lazy"
            className="mission-photo"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Payloads</h2>
          <div className="table-wrap">
            <table className="data tnum">
              <thead>
                <tr>
                  <th scope="col">Spacecraft</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Port</th>
                  <th scope="col" className="num">
                    Mass
                  </th>
                </tr>
              </thead>
              <tbody>
                {m.manifest.map((p) => (
                  <tr key={p.name}>
                    <th scope="row">{p.name}</th>
                    <td>{p.operator}</td>
                    <td>{p.port}</td>
                    <td className="num">{num(p.kg)} kg</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {m.payloads > m.manifest.length && (
            <p className="hint">
              Showing the largest payloads; {m.payloads - m.manifest.length}{" "}
              more are listed in the customer mission book.
            </p>
          )}
        </div>
      </section>

      <section className="cta-band night">
        <div className="wrap cta-row">
          <p>
            {flight?.openKg
              ? `${flight.name} still has ${num(flight.openKg)} kg of port capacity open.`
              : "Your satellite could be on the next Tandem."}
          </p>
          <Link to="/rideshare" className="btn btn-primary">
            Price your payload <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>More missions</h2>
          <div className="mission-grid">
            {related.map((x) => (
              <MissionCard key={x.slug} m={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
