import { useState } from "react";
import { Link } from "../router";
import {
  chargers,
  chargingPage,
  models,
  photos,
  type Charger,
  type Trim,
} from "../content";
import {
  cents,
  chargePower,
  chargeSession,
  duration,
  money,
} from "../lib/calc";

export function Charging() {
  return (
    <>
      <header className="page-head sheet">
        <div className="wrap">
          <h1>Charging</h1>
          <p className="lede">{chargingPage.intro}</p>
        </div>
      </header>

      <Calculator />

      <section className="section">
        <div className="wrap split">
          <figure className="photo">
            <img
              src={photos.charging.src}
              alt={photos.charging.alt}
              width={photos.charging.width}
              height={photos.charging.height}
              loading="lazy"
            />
          </figure>
          <div className="prose">
            <h2>{chargingPage.home.title}</h2>
            {chargingPage.home.text.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <Link to="/configure" className="text-link">
              Add a Wallbox to your build
            </Link>
          </div>
        </div>
      </section>

      <section className="section night grid-section">
        <img
          className="grid-photo"
          src={photos.nightRoad.src}
          alt={photos.nightRoad.alt}
          width={photos.nightRoad.width}
          height={photos.nightRoad.height}
          loading="lazy"
        />
        <div className="wrap split">
          <div className="prose">
            <h2>{chargingPage.grid.title}</h2>
            {chargingPage.grid.text.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <table className="spec-table on-night">
            <caption>Prices, October 2026</caption>
            <tbody>
              {chargingPage.tariffs.map((t) => (
                <tr key={t.label}>
                  <th scope="row">{t.label}</th>
                  <td className="num">{t.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-wrap">
          <h2>Charging questions</h2>
          <div className="faq">
            {chargingPage.faq.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Calculator() {
  const trims = models.flatMap((m) =>
    m.trims.map((t) => ({ ...t, label: `${m.name} ${t.name}` })),
  );
  const [trimId, setTrimId] = useState("span-long");
  const [chargerId, setChargerId] = useState("grid");
  const [from, setFrom] = useState(10);
  const [to, setTo] = useState(80);
  const trim = trims.find((t) => t.id === trimId) ?? trims[0];
  const charger = chargers.find((c) => c.id === chargerId) ?? chargers[0];
  const s = chargeSession(trim, charger, from, to);

  return (
    <section className="section calc" aria-labelledby="calc-title">
      <div className="wrap calc-grid">
        <div className="calc-controls">
          <h2 id="calc-title">How long will it take?</h2>
          <label className="select">
            <span>Car</span>
            <select value={trimId} onChange={(e) => setTrimId(e.target.value)}>
              {trims.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </label>
          <fieldset className="charger-list">
            <legend>Charger</legend>
            {chargers.map((c) => (
              <label key={c.id} className="opt-row">
                <input
                  type="radio"
                  name="charger"
                  checked={c.id === chargerId}
                  onChange={() => setChargerId(c.id)}
                />
                <span className="opt-name">
                  {c.name} <small className="num">{c.kw} kW</small>
                </span>
                <span className="opt-meta">{c.where}</span>
              </label>
            ))}
          </fieldset>
          <label className="range-field">
            <span>
              Start at <strong className="num">{from}%</strong>
            </span>
            <input
              type="range"
              min={0}
              max={95}
              step={5}
              value={from}
              onChange={(e) => {
                const v = +e.target.value;
                setFrom(v);
                if (v >= to) setTo(Math.min(100, v + 5));
              }}
            />
          </label>
          <label className="range-field">
            <span>
              Stop at <strong className="num">{to}%</strong>
            </span>
            <input
              type="range"
              min={5}
              max={100}
              step={5}
              value={to}
              onChange={(e) => {
                const v = +e.target.value;
                setTo(v);
                if (v <= from) setFrom(Math.max(0, v - 5));
              }}
            />
          </label>
        </div>

        <div className="calc-result">
          <dl className="calc-out" aria-live="polite">
            <div className="calc-time">
              <dt>Time</dt>
              <dd className="num">{duration(s.minutes)}</dd>
            </div>
            <div>
              <dt>Range added</dt>
              <dd className="num">+{s.miles} mi</dd>
            </div>
            <div>
              <dt>Energy from the charger</dt>
              <dd className="num">{s.kwh.toFixed(1)} kWh</dd>
            </div>
            <div>
              <dt>Cost at {cents(charger.price)}/kWh</dt>
              <dd className="num">{money(s.cost)}</dd>
            </div>
          </dl>
          <Curve trim={trim} charger={charger} from={from} to={to} />
          <p className="fine">
            Pack pre-warmed, 70 °F outside. Illustrative; real sessions vary
            with temperature and site load.
          </p>
        </div>
      </div>
    </section>
  );
}

/** Charging power against state of charge, the chosen window shaded. */
function Curve({
  trim,
  charger,
  from,
  to,
}: {
  trim: Trim;
  charger: Charger;
  from: number;
  to: number;
}) {
  const W = 640;
  const H = 260;
  const pad = { l: 44, r: 24, t: 16, b: 32 };
  const top = charger.dc ? 330 : 13.2; // headroom above the top tick for the unit label
  const x = (soc: number) => pad.l + (soc / 100) * (W - pad.l - pad.r);
  const y = (kw: number) => H - pad.b - (kw / top) * (H - pad.t - pad.b);
  const pts = Array.from(
    { length: 101 },
    (_, soc) =>
      `${x(soc).toFixed(1)},${y(chargePower(trim, charger, soc)).toFixed(1)}`,
  );
  const area = [
    `${x(from)},${y(0)}`,
    ...pts.slice(from, to + 1),
    `${x(to)},${y(0)}`,
  ].join(" ");
  const ticks = charger.dc ? [0, 100, 200, 300] : [0, 4, 8, 12];

  return (
    <svg
      className="curve"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={`Charging power for the ${trim.name} on a ${charger.name}, from ${from}% to ${to}%`}
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            className="curve-grid"
            x1={pad.l}
            x2={W - pad.r}
            y1={y(t)}
            y2={y(t)}
          />
          <text
            className="curve-label"
            x={pad.l - 8}
            y={y(t) + 4}
            textAnchor="end"
          >
            {t}
          </text>
        </g>
      ))}
      {[0, 20, 40, 60, 80, 100].map((p) => (
        <text
          key={p}
          className="curve-label"
          x={x(p)}
          y={H - 10}
          textAnchor="middle"
        >
          {p}%
        </text>
      ))}
      <text className="curve-label" x={pad.l + 6} y={pad.t + 2}>
        kW
      </text>
      <polygon className="curve-area" points={area} />
      <polyline className="curve-line" points={pts.join(" ")} />
    </svg>
  );
}
