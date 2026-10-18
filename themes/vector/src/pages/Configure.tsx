import { useState, type CSSProperties } from "react";
import { navigate } from "../router";
import {
  brand,
  extras,
  interiors,
  models,
  paints,
  wheels,
  type Model,
} from "../content";
import { Elevation } from "../components/Elevation";
import { Swatches } from "../components/Swatches";
import {
  defaultBuild,
  describe,
  modelBySlug,
  saveBuild,
  useSavedBuild,
  type Build,
} from "../lib/build";
import { money, winterRange } from "../lib/calc";

const plus = (n: number) => (n ? `+${money(n)}` : "Included");

export function Configure({ model: start }: { model?: Model }) {
  const saved = useSavedBuild();
  const [build, setBuild] = useState<Build>(() =>
    saved && (!start || saved.model === start.slug)
      ? saved
      : defaultBuild(start ?? modelBySlug(saved?.model ?? "") ?? models[1]),
  );
  const [dims, setDims] = useState(true);
  const d = describe(build);

  const update = (patch: Partial<Build>) => {
    const next = { ...build, ...patch };
    setBuild(next);
    saveBuild(next);
  };
  const pickModel = (slug: string) => {
    const m = modelBySlug(slug)!;
    update({
      ...defaultBuild(m),
      wheel: build.wheel,
      interior: build.interior,
      extras: build.extras,
    });
  };
  const toggleExtra = (id: string, on: boolean) =>
    update({
      extras: on ? [...build.extras, id] : build.extras.filter((e) => e !== id),
    });
  const go = (to: string) => {
    saveBuild(build);
    navigate(to);
  };

  return (
    <>
      <header className="page-head sheet compact">
        <div className="wrap">
          <h1>Configure your {d.model.name}</h1>
          <p className="lede">
            Every choice updates the drawing, the price and the range. Your
            build is kept in this browser.
          </p>
        </div>
      </header>

      <div className="wrap config">
        <div className="stage">
          <figure className="stage-figure">
            <Elevation
              profile={d.model.profile}
              paint={d.paint.hex}
              wheel={d.wheel.id}
              dims={dims}
              label={`${d.model.name} ${d.trim.name} in ${d.paint.name} on ${d.wheel.name} wheels`}
            />
            <figcaption>
              <span
                className="interior-chip"
                style={{ "--swatch": d.interior.swatch } as CSSProperties}
                aria-hidden="true"
              />
              {d.paint.name} · {d.wheel.name} {d.model.rim + d.wheel.step}-inch
              · {d.interior.name} interior
              <label className="check small">
                <input
                  type="checkbox"
                  checked={dims}
                  onChange={(e) => setDims(e.target.checked)}
                />
                Dimensions
              </label>
            </figcaption>
          </figure>
          <dl className="stage-readout" aria-live="polite">
            <div>
              <dt>Price</dt>
              <dd className="num">{money(d.total)}</dd>
            </div>
            <div>
              <dt>Range</dt>
              <dd className="num">{d.range} mi</dd>
            </div>
            <div>
              <dt>At 20 °F, 70 mph</dt>
              <dd className="num">
                {Math.round(winterRange(d.trim) * d.wheel.rangeFactor)} mi
              </dd>
            </div>
            <div>
              <dt>0–60 mph</dt>
              <dd className="num">{d.trim.zeroSixty} s</dd>
            </div>
          </dl>
        </div>

        <form
          className="options"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Build options"
        >
          <fieldset className="opt-group">
            <legend>Model</legend>
            <div className="opt-models">
              {models.map((m) => (
                <label key={m.slug} className="opt-card">
                  <input
                    type="radio"
                    name="model"
                    checked={m.slug === build.model}
                    onChange={() => pickModel(m.slug)}
                  />
                  <span className="opt-name">{m.name}</span>
                  <span className="opt-meta">{m.body}</span>
                  <span className="opt-meta num">
                    from {money(m.trims[0].price)}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="opt-group">
            <legend>Trim</legend>
            {d.model.trims.map((t) => (
              <label key={t.id} className="opt-row">
                <input
                  type="radio"
                  name="trim"
                  checked={t.id === build.trim}
                  onChange={() => update({ trim: t.id })}
                />
                <span className="opt-name">
                  {t.name} <small>{t.drive}</small>
                </span>
                <span className="opt-meta num">
                  {t.range} mi · {t.zeroSixty} s · {t.power} hp
                </span>
                <span className="opt-price num">{money(t.price)}</span>
              </label>
            ))}
          </fieldset>

          <div className="opt-group">
            <Swatches
              legend="Paint"
              name="paint"
              options={paints.filter((p) => d.model.paints.includes(p.id))}
              value={build.paint}
              onChange={(paint) => update({ paint })}
              showPrice={plus}
            />
            <p className="opt-note">{d.paint.note}</p>
          </div>

          <fieldset className="opt-group">
            <legend>Wheels</legend>
            {wheels.map((w) => (
              <label key={w.id} className="opt-row">
                <input
                  type="radio"
                  name="wheel"
                  checked={w.id === build.wheel}
                  onChange={() => update({ wheel: w.id })}
                />
                <span className="opt-name">
                  {w.name} <small>{d.model.rim + w.step}-inch</small>
                </span>
                <span className="opt-meta">
                  {w.note}
                  {w.rangeFactor < 1 &&
                    ` · −${Math.round(d.trim.range * (1 - w.rangeFactor))} mi`}
                </span>
                <span className="opt-price num">{plus(w.price)}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="opt-group">
            <legend>Interior</legend>
            {interiors.map((i) => (
              <label key={i.id} className="opt-row">
                <input
                  type="radio"
                  name="interior"
                  checked={i.id === build.interior}
                  onChange={() => update({ interior: i.id })}
                />
                <span className="opt-name">
                  <span
                    className="interior-chip"
                    style={{ "--swatch": i.swatch } as CSSProperties}
                    aria-hidden="true"
                  />
                  {i.name}
                </span>
                <span className="opt-meta">{i.note}</span>
                <span className="opt-price num">{plus(i.price)}</span>
              </label>
            ))}
          </fieldset>

          <fieldset className="opt-group">
            <legend>Packages</legend>
            {extras
              .filter((e) => !e.models || e.models.includes(d.model.slug))
              .map((e) => (
                <label key={e.id} className="opt-row">
                  <input
                    type="checkbox"
                    name="extras"
                    checked={build.extras.includes(e.id)}
                    onChange={(ev) => toggleExtra(e.id, ev.target.checked)}
                  />
                  <span className="opt-name">{e.name}</span>
                  <span className="opt-meta">{e.text}</span>
                  <span className="opt-price num">+{money(e.price)}</span>
                </label>
              ))}
          </fieldset>

          <section className="summary" aria-labelledby="summary-title">
            <h2 id="summary-title">Your {d.model.name}</h2>
            <table className="spec-table">
              <tbody>
                {d.lines.map((l) => (
                  <tr key={l.label}>
                    <th scope="row">{l.label}</th>
                    <td className="num">{money(l.price)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Total before incentives</th>
                  <td className="num">{money(d.total)}</td>
                </tr>
              </tfoot>
            </table>
            <p className="muted">
              Reserve with a {money(brand.deposit)} refundable deposit.{" "}
              {d.model.delivery}.
            </p>
            <div className="actions">
              <button
                type="button"
                className="btn btn-signal"
                onClick={() => go("/reserve")}
              >
                Reserve this build
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => go("/test-drive")}
              >
                Test drive a {d.model.name}
              </button>
              <button
                type="button"
                className="text-button"
                onClick={() => update(defaultBuild(d.model))}
              >
                Start over
              </button>
            </div>
          </section>
        </form>
      </div>
    </>
  );
}
