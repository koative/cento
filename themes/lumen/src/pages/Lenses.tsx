import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  images,
  included,
  lensIndexes,
  lensesCopy,
  lensTypes,
  lightReactive,
} from "../content";
import { money } from "../lib/cart";

const RADIUS = 25; // mm, half of a 50 mm lens
const BASE = { minus: 1.8, plus: 1.0 }; // centre thickness for minus lenses, edge thickness for plus lenses

/** Sagitta of the lens surface: the extra thickness power adds across a 25 mm radius. */
const sag = (power: number, n: number) =>
  (RADIUS * RADIUS * Math.abs(power)) / (2000 * (n - 1));

function recommended(power: number) {
  const p = Math.abs(power);
  return p <= 2 ? "1.50" : p <= 4 ? "1.60" : p <= 6 ? "1.67" : "1.74";
}

export function Lenses() {
  const [power, setPower] = useState(-4);
  const minus = power < 0;
  const rows = lensIndexes.map((x) => {
    const extra = sag(power, x.n);
    const centre = minus ? BASE.minus : BASE.plus + extra;
    const edge = minus ? BASE.minus + extra : BASE.plus;
    return { ...x, centre, edge, max: Math.max(centre, edge) };
  });
  const pick = recommended(power);
  const k = 7; // px per mm of thickness

  return (
    <div className="page lenses">
      <header className="page-head split-head">
        <div>
          <h1>{lensesCopy.title}</h1>
          <p className="lede">{lensesCopy.intro}</p>
        </div>
        <img
          src={images.trialLenses}
          alt="An optometrist's case of trial lenses arranged in numbered rows, with a trial frame in front"
          width={1400}
          height={934}
        />
      </header>

      <section className="section lens-types">
        <h2>Lens types and add-ons</h2>
        <ul className="rows">
          {lensTypes.map((l) => (
            <li key={l.id}>
              <h3>{l.name}</h3>
              <p className="row-price">
                {l.price ? `+${money(l.price)}` : "Included"}
              </p>
              <p className="row-short">{l.short}</p>
              <p>{l.detail}</p>
            </li>
          ))}
          <li>
            <h3>{lightReactive.name}</h3>
            <p className="row-price">+{money(lightReactive.price)}</p>
            <p className="row-short">An add-on for any optical lens.</p>
            <p>
              {lightReactive.short} They clear again indoors within a few
              minutes, and do not darken much behind a car windscreen, which
              blocks most UV.
            </p>
          </li>
        </ul>
      </section>

      <section className="thickness" aria-labelledby="thickness-title">
        <div className="thickness-intro">
          <h2 id="thickness-title">{lensesCopy.thickness.title}</h2>
          <p>{lensesCopy.thickness.body}</p>
          <label className="power" htmlFor="power">
            <span>Sphere (SPH)</span>
            <output htmlFor="power">
              {(power > 0 ? "+" : "") + power.toFixed(2)}
            </output>
          </label>
          <input
            id="power"
            type="range"
            min={-8}
            max={6}
            step={0.25}
            value={power}
            onChange={(e) => setPower(Number(e.target.value))}
            aria-valuetext={`${power.toFixed(2)} dioptres, ${minus ? "short-sighted" : "long-sighted"}`}
          />
          <p className="power-scale" aria-hidden="true">
            <span>−8.00 short-sight</span>
            <span>+6.00 long-sight</span>
          </p>
          <p className="field-hint">{lensesCopy.thickness.note}</p>
        </div>
        <ul className="sections" aria-live="polite">
          {rows.map((r) => {
            const E = r.edge * k;
            const C = r.centre * k;
            return (
              <li key={r.id} data-pick={r.id === pick || undefined}>
                <svg viewBox="-4 -4 208 60" aria-hidden="true">
                  <path d={`M0 0H200V${E}Q100 ${2 * C - E} 0 ${E}Z`} />
                </svg>
                <p>
                  <strong>{r.name}</strong>
                  <span>
                    {minus ? "Edge" : "Centre"} {r.max.toFixed(1)} mm
                  </span>
                  <span>{r.price ? `+${money(r.price)}` : "Included"}</span>
                </p>
                {r.id === pick && (
                  <p className="pick">What we would suggest at this strength</p>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section rx">
        <div>
          <h2>{lensesCopy.rxCard.title}</h2>
          <p>{lensesCopy.rxCard.body}</p>
          <div className="rx-card" aria-label="Example prescription">
            <table>
              <thead>
                <tr>
                  <th scope="col">Eye</th>
                  <th scope="col">SPH</th>
                  <th scope="col">CYL</th>
                  <th scope="col">AXIS</th>
                  <th scope="col">ADD</th>
                </tr>
              </thead>
              <tbody>
                {lensesCopy.rxCard.rows.map((r) => (
                  <tr key={r.eye}>
                    <th scope="row">{r.eye}</th>
                    <td>{r.sph}</td>
                    <td>{r.cyl}</td>
                    <td>{r.axis}</td>
                    <td>{r.add || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              PD <strong>{lensesCopy.rxCard.pd}</strong>
            </p>
          </div>
        </div>
        <dl className="terms">
          {lensesCopy.rxCard.terms.map((t) => (
            <div key={t.term}>
              <dt>{t.term}</dt>
              <dd>{t.def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section included">
        <h2>On every lens, at no charge</h2>
        <ul className="included-list">
          {included.slice(0, 4).map((i) => (
            <li key={i.item}>
              <strong>{i.item}</strong>
              <span>{i.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section faq">
        <h2>Lens questions</h2>
        <div className="disclosures">
          {lensesCopy.faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
        <Link to="/eye-test" className="btn">
          Book an eye test <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
}
