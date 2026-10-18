import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, missions, vehicles, type Vehicle } from "../content";
import { num } from "../lib/format";
import {
  VehicleDrawing,
  VehicleSilhouette,
} from "../components/VehicleDrawing";
import { PerformanceChart } from "../components/PerformanceChart";
import { MissionCard } from "../components/MissionCard";

export function VehiclePage({ v }: { v: Vehicle }) {
  const flown = missions.filter((m) => m.vehicle === v.id);
  const others = vehicles.filter((x) => x.id !== v.id);

  return (
    <>
      <section className="page-head vehicle-head">
        <div className="wrap vehicle-head-grid">
          <div>
            <Link to="/vehicles" className="back">
              <ArrowLeft aria-hidden="true" size={16} /> All vehicles
            </Link>
            <p className="role">{v.role}</p>
            <h1>{v.name}</h1>
            <p className="lede">{v.summary}</p>
            <p className="price tnum">
              <strong>{v.price}</strong> {v.priceNote}
            </p>
            <div className="actions">
              <Link
                to={v.id === "kestrel" ? "/reserve" : "/rideshare"}
                className="btn btn-primary"
              >
                {v.id === "kestrel"
                  ? "Request a dedicated launch"
                  : "Price a rideshare"}{" "}
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <a
                href={`mailto:${brand.email}?subject=${encodeURIComponent(`${v.name} payload user's guide`)}`}
                className="btn btn-ghost-dark"
              >
                Ask for the user's guide
              </a>
            </div>
          </div>
          <div className="drawing-sheet">
            <VehicleDrawing v={v} />
            <p className="sheet-label tnum">
              {v.name.toUpperCase()} · ELEVATION · DIMENSIONS IN METRES
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="prose">
            <h2>How it flies</h2>
            {v.body.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div>
            <h2>Specifications</h2>
            <dl className="spec-list tnum">
              {v.specs.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section paper-2">
        <div className="wrap">
          <h2>{v.kind === "tug" ? "Propulsion" : "Stages"}</h2>
          <div className="table-wrap">
            <table className="data tnum">
              <thead>
                <tr>
                  <th scope="col">{v.kind === "tug" ? "Element" : "Stage"}</th>
                  <th scope="col">Engines</th>
                  <th scope="col">Propellant</th>
                  <th scope="col">Thrust</th>
                  <th scope="col">Burn</th>
                </tr>
              </thead>
              <tbody>
                {v.stages.map((s) => (
                  <tr key={s.name}>
                    <th scope="row">{s.name}</th>
                    <td>{s.engines}</td>
                    <td>{s.propellant}</td>
                    <td>{s.thrust}</td>
                    <td>{s.burn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split perf-split">
          <div>
            <h2>Performance</h2>
            <dl className="perf-list tnum">
              {v.performance.map((p) => (
                <div key={p.orbit}>
                  <dt>{p.orbit}</dt>
                  <dd>{p.kg ? `${num(p.kg)} kg` : "Included"}</dd>
                </div>
              ))}
            </dl>
          </div>
          <PerformanceChart v={v} />
        </div>
      </section>

      {flown.length > 0 && (
        <section className="section paper-2">
          <div className="wrap">
            <h2>{v.name} missions</h2>
            <div className="mission-grid">
              {flown.slice(0, 3).map((m) => (
                <MissionCard key={m.slug} m={m} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <h2>The rest of the fleet</h2>
          <div className="other-vehicles">
            {others.map((o) => (
              <Link
                key={o.id}
                to={`/vehicles/${o.id}`}
                className="other-vehicle"
              >
                <VehicleSilhouette v={o} k={3} frame={52} />
                <span>
                  <strong>{o.name}</strong>
                  {o.role}
                </span>
                <ArrowRight aria-hidden="true" size={18} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
