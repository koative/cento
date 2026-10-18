import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { modeLabel, services, type Mode } from "../content";
import { tariffs } from "../lib/quote";

const filters: ("all" | Mode)[] = ["all", "road", "rail", "sea", "air"];

export default function Services() {
  const [mode, setMode] = useState<"all" | Mode>("all");
  const list = services.filter((s) => mode === "all" || s.mode === mode);

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Freight services</h1>
          <p className="lede">
            Seven services, one booking flow. Each runs through Relay hubs so
            freight is scanned at every handoff, whichever mode carries it
            between them.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="toolbar">
            <div className="chips" role="group" aria-label="Filter by mode">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="chip"
                  aria-pressed={mode === f}
                  onClick={() => setMode(f)}
                >
                  {f === "all" ? "All modes" : modeLabel[f]}
                </button>
              ))}
            </div>
            <p className="muted" aria-live="polite">
              {list.length} {list.length === 1 ? "service" : "services"}
            </p>
          </div>

          <ul className="service-list">
            {list.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="service-row">
                  <img
                    src={s.image}
                    alt=""
                    width={480}
                    height={320}
                    loading="lazy"
                  />
                  <div className="service-text">
                    <span className={`mode-tag mode-${s.mode}`}>
                      {modeLabel[s.mode]}
                    </span>
                    <h2>{s.name}</h2>
                    <p>{s.summary}</p>
                  </div>
                  <dl className="service-facts">
                    <div>
                      <dt>Transit</dt>
                      <dd className="num">{s.transit}</dd>
                    </div>
                    <div>
                      <dt>Unit</dt>
                      <dd className="num">{s.unit}</dd>
                    </div>
                    <div>
                      <dt>From</dt>
                      <dd className="num">{s.from}</dd>
                    </div>
                  </dl>
                  <ArrowRight className="row-arrow" size={22} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>Choosing a mode</h2>
            <p>
              Typical figures from our sample tariff for a 1,000 km lane. The
              quote tool calculates your exact lane.
            </p>
          </div>
          <div className="table-scroll">
            <table className="data-table compare-table">
              <thead>
                <tr>
                  <th scope="col">Service</th>
                  <th scope="col">Typical transit</th>
                  <th scope="col">Rate at 1,000 km</th>
                  <th scope="col">CO₂e per tonne-km</th>
                  <th scope="col">Pallets per booking</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(tariffs).map((t) => {
                  const days = Math.max(
                    1,
                    Math.ceil((1000 / t.kmh + t.handling) / 24),
                  );
                  const rate = t.perKm
                    ? `€${Math.round(t.base + 1000 * t.perKm)} per load`
                    : t.perPallet
                      ? `€${Math.round(t.perPallet! + 1000 * t.perPalletKm!)} per pallet`
                      : `€${(t.perKg! * 1.5).toFixed(2)} per kg`;
                  return (
                    <tr key={t.label}>
                      <th scope="row">{t.label}</th>
                      <td className="num">
                        {days} {days === 1 ? "day" : "days"}
                      </td>
                      <td className="num">{rate}</td>
                      <td className="num">{(t.co2 * 1000).toFixed(0)} g</td>
                      <td className="num">up to {t.maxPallets}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="actions">
            <Link to="/quote" className="btn btn-primary">
              Quote your lane <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
