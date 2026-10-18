import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { chargers, models, paints, wheels, type Model } from "../content";
import { Elevation } from "../components/Elevation";
import { Swatches } from "../components/Swatches";
import { paintHex } from "../lib/build";
import {
  chargeSession,
  duration,
  estimateRange,
  money,
  winterRange,
} from "../lib/calc";

const grid = chargers.find((c) => c.id === "grid")!;
const wallbox = chargers.find((c) => c.id === "wallbox")!;
const inches = (mm: number) => `${(mm / 25.4).toFixed(1)} in`;

export function ModelPage({ model }: { model: Model }) {
  const [paint, setPaint] = useState(model.color);
  const [trimId, setTrimId] = useState(model.trims[0].id);
  const trim = model.trims.find((t) => t.id === trimId) ?? model.trims[0];
  const dc = chargeSession(trim, grid, 10, 80);
  const home = chargeSession(trim, wallbox, 10, 100);
  const others = models.filter((m) => m.slug !== model.slug).slice(0, 3);

  return (
    <>
      <header className="model-head sheet">
        <div className="wrap">
          <div className="model-title">
            <h1>
              {model.name} <span>{model.body}</span>
            </h1>
            <div>
              <p className="lede">{model.line}</p>
              <p className="price-line">
                <span className="num">From {money(model.trims[0].price)}</span>{" "}
                · {model.delivery}
              </p>
              <div className="actions">
                <Link
                  to={`/configure/${model.slug}`}
                  className="btn btn-primary"
                >
                  Configure {model.name}
                </Link>
                <Link to="/test-drive" className="btn btn-ghost">
                  Test drive
                </Link>
              </div>
            </div>
          </div>
          <figure className="model-figure">
            <Elevation
              profile={model.profile}
              paint={paintHex(paint)}
              wheel="aero"
              dims
              label={`Side elevation of the ${model.name} in ${paints.find((p) => p.id === paint)?.name}, dimensions marked`}
            />
            <figcaption>
              <Swatches
                legend="Shown in"
                name="model-paint"
                options={paints.filter((p) => model.paints.includes(p.id))}
                value={paint}
                onChange={setPaint}
              />
            </figcaption>
          </figure>
        </div>
      </header>

      <section className="section">
        <div className="wrap spec-grid">
          <div>
            <h2>Specifications</h2>
            <p className="muted">{model.summary}</p>
            <div className="segmented" role="group" aria-label="Trim">
              {model.trims.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={t.id === trimId}
                  onClick={() => setTrimId(t.id)}
                >
                  {t.name} <small>{t.drive}</small>
                </button>
              ))}
            </div>
          </div>
          <table className="spec-table spec-big" aria-live="polite">
            <caption className="sr-only">
              {model.name} {trim.name} specifications
            </caption>
            <tbody>
              <tr>
                <th scope="row">Price</th>
                <td className="num">{money(trim.price)}</td>
              </tr>
              <tr>
                <th scope="row">Range, combined</th>
                <td className="num">{trim.range} mi</td>
              </tr>
              <tr>
                <th scope="row">Range at 20 °F, 70 mph</th>
                <td className="num">{winterRange(trim)} mi</td>
              </tr>
              <tr>
                <th scope="row">0–60 mph</th>
                <td className="num">{trim.zeroSixty} s</td>
              </tr>
              <tr>
                <th scope="row">Power</th>
                <td className="num">{trim.power} hp</td>
              </tr>
              <tr>
                <th scope="row">Top speed</th>
                <td className="num">{trim.topSpeed} mph</td>
              </tr>
              <tr>
                <th scope="row">Battery, usable</th>
                <td className="num">{trim.battery} kWh</td>
              </tr>
              <tr>
                <th scope="row">Drive</th>
                <td>
                  {trim.drive === "AWD"
                    ? "All-wheel drive, dual motor"
                    : "Rear-wheel drive"}
                </td>
              </tr>
              <tr>
                <th scope="row">Peak DC charging</th>
                <td className="num">{trim.peakDc} kW</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="section story-split sheet">
        <div className="wrap split">
          <figure className="photo">
            <img
              src={model.photo.src}
              alt={model.photo.alt}
              width={model.photo.width}
              height={model.photo.height}
              loading="lazy"
            />
          </figure>
          <div className="prose">
            <h2>Why {model.name}</h2>
            {model.story.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ul className="notes">
            {model.highlights.map((h) => (
              <li key={h.title}>
                <h3>{h.title}</h3>
                <p>{h.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <RangeEstimator model={model} trimId={trimId} />

      <section className="section">
        <div className="wrap two-tables">
          <div>
            <h2>Dimensions and space</h2>
            <table className="spec-table">
              <tbody>
                <tr>
                  <th scope="row">Length</th>
                  <td className="num">{inches(model.profile.length)}</td>
                </tr>
                <tr>
                  <th scope="row">Wheelbase</th>
                  <td className="num">{inches(model.profile.wheelbase)}</td>
                </tr>
                <tr>
                  <th scope="row">Height</th>
                  <td className="num">{inches(model.profile.height)}</td>
                </tr>
                <tr>
                  <th scope="row">Ground clearance</th>
                  <td className="num">{model.clearance} in</td>
                </tr>
                <tr>
                  <th scope="row">Seats</th>
                  <td className="num">{model.seats}</td>
                </tr>
                <tr>
                  <th scope="row">Cargo, rear</th>
                  <td className="num">{model.cargo} cu ft</td>
                </tr>
                <tr>
                  <th scope="row">Front trunk</th>
                  <td className="num">{model.frunk} cu ft</td>
                </tr>
                <tr>
                  <th scope="row">Towing</th>
                  <td className="num">
                    {model.towing
                      ? `${model.towing.toLocaleString("en-US")} lb`
                      : "Not rated"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2>Charging the {trim.name}</h2>
            <table className="spec-table">
              <tbody>
                <tr>
                  <th scope="row">Vector Grid, 10–80%</th>
                  <td className="num">
                    {dc.minutes} min · +{dc.miles} mi
                  </td>
                </tr>
                <tr>
                  <th scope="row">Cost at Vector Grid</th>
                  <td className="num">{money(dc.cost)}</td>
                </tr>
                <tr>
                  <th scope="row">Wallbox, 10–100%</th>
                  <td className="num">{duration(home.minutes)}</td>
                </tr>
                <tr>
                  <th scope="row">Cost at home, off-peak</th>
                  <td className="num">{money(home.cost)}</td>
                </tr>
                <tr>
                  <th scope="row">Port</th>
                  <td>NACS, left rear; CCS1 adapter included</td>
                </tr>
              </tbody>
            </table>
            <Link to="/charging" className="text-link">
              Charging calculator <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section related sheet">
        <div className="wrap">
          <h2>Also in the line-up</h2>
          <ul className="related-list">
            {others.map((m) => (
              <li key={m.slug}>
                <Link to={`/models/${m.slug}`}>
                  <Elevation
                    profile={m.profile}
                    paint={paintHex(m.color)}
                    label=""
                  />
                  <strong>{m.name}</strong> <span>{m.body}</span>
                  <span className="num">from {money(m.trims[0].price)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-strip">
        <div className="wrap">
          <h2>Build your {model.name}, or drive one first.</h2>
          <div className="actions">
            <Link to={`/configure/${model.slug}`} className="btn btn-signal">
              Configure {model.name}
            </Link>
            <Link to="/test-drive" className="btn btn-light">
              Book a test drive
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function RangeEstimator({ model, trimId }: { model: Model; trimId: string }) {
  const [temp, setTemp] = useState(50);
  const [speed, setSpeed] = useState(65);
  const [wheelId, setWheelId] = useState(wheels[0].id);
  const wheel = wheels.find((w) => w.id === wheelId) ?? wheels[0];
  const trim = model.trims.find((t) => t.id === trimId) ?? model.trims[0];
  const miles = estimateRange(trim, temp, speed, wheel.rangeFactor);

  return (
    <section className="section estimator night">
      <div className="wrap estimator-grid">
        <div>
          <h2>Your range, your weather</h2>
          <p>
            Move the sliders to the trip you actually take. The estimate starts
            from the {model.name} {trim.name}'s {trim.range}-mile combined
            figure.
          </p>
          <output
            className="estimate"
            htmlFor="est-temp est-speed est-wheel"
            aria-live="polite"
          >
            <span className="num">{miles}</span> mi
          </output>
          <p className="fine">
            Illustrative estimate on a flat road with climate on. Not a
            guarantee.
          </p>
        </div>
        <div className="estimator-controls">
          <label className="range-field">
            <span>
              Outside temperature <strong className="num">{temp} °F</strong>
            </span>
            <input
              id="est-temp"
              type="range"
              min={-10}
              max={100}
              step={5}
              value={temp}
              onChange={(e) => setTemp(+e.target.value)}
            />
          </label>
          <label className="range-field">
            <span>
              Cruising speed <strong className="num">{speed} mph</strong>
            </span>
            <input
              id="est-speed"
              type="range"
              min={45}
              max={80}
              step={5}
              value={speed}
              onChange={(e) => setSpeed(+e.target.value)}
            />
          </label>
          <label className="select">
            <span>Wheels</span>
            <select
              id="est-wheel"
              value={wheelId}
              onChange={(e) => setWheelId(e.target.value as typeof wheelId)}
            >
              {wheels.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}, {model.rim + w.step}-inch
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
    </section>
  );
}
