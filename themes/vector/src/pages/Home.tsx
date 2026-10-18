import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  chargers,
  home,
  models,
  paints,
  photos,
  stories,
  studios,
} from "../content";
import { Elevation } from "../components/Elevation";
import { Swatches } from "../components/Swatches";
import { chargeSession, money, winterRange } from "../lib/calc";
import { longestRange as best, paintHex } from "../lib/build";

const grid = chargers.find((c) => c.id === "grid")!;
export function Home() {
  const [heroSlug, setHeroSlug] = useState("span");
  const hero = models.find((m) => m.slug === heroSlug) ?? models[1];
  const [lit, setLit] = useState<string | null>(null);
  const axis = models.find((m) => m.slug === "axis")!;
  const [axisPaint, setAxisPaint] = useState("lichen");
  const [feature, ...more] = stories;

  return (
    <>
      <section className="hero sheet">
        <div className="wrap">
          <div className="hero-head">
            <h1>{home.title}</h1>
            <div>
              <p className="lede">{home.intro}</p>
              <div className="actions">
                <Link
                  to={`/configure/${hero.slug}`}
                  className="btn btn-primary"
                >
                  Configure {hero.name}
                </Link>
                <Link to="/test-drive" className="btn btn-ghost">
                  Book a test drive
                </Link>
              </div>
            </div>
          </div>

          <figure className="hero-figure">
            <Elevation
              profile={hero.profile}
              paint={paintHex(hero.color)}
              wheel="aero"
              dims
              label={`Side elevation of the Vector ${hero.name} ${hero.body.toLowerCase()} with its length, wheelbase and height marked`}
            />
            <figcaption className="readout" aria-live="polite">
              <span>
                <strong>{hero.name}</strong> {hero.body}
              </span>
              <span>from {money(hero.trims[0].price)}</span>
              <span>
                {best(hero).range} mi · {winterRange(best(hero))} mi at 20 °F
              </span>
              <Link to={`/models/${hero.slug}`} className="text-link">
                {hero.name} details <ArrowRight aria-hidden="true" />
              </Link>
            </figcaption>
          </figure>

          <div className="model-tabs" role="group" aria-label="Show model">
            {models.map((m) => (
              <button
                key={m.slug}
                type="button"
                aria-pressed={m.slug === heroSlug}
                onClick={() => setHeroSlug(m.slug)}
              >
                <span>{m.name}</span>
                <small>{m.body}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-label="Range, honestly">
        <img
          src={photos.roadIceland.src}
          alt={photos.roadIceland.alt}
          width={photos.roadIceland.width}
          height={photos.roadIceland.height}
          loading="lazy"
        />
        <div className="wrap">
          <p className="band-line">{home.band}</p>
        </div>
      </section>

      <section className="section lineup">
        <div className="wrap lineup-grid">
          <div>
            <h2>{home.lineup.title}</h2>
            <p className="muted">{home.lineup.text}</p>
            <ul className="lineup-list" onMouseLeave={() => setLit(null)}>
              {models.map((m) => (
                <li key={m.slug}>
                  <Link
                    to={`/models/${m.slug}`}
                    onMouseEnter={() => setLit(m.slug)}
                    onFocus={() => setLit(m.slug)}
                    onBlur={() => setLit(null)}
                    data-lit={lit === m.slug ? "" : undefined}
                  >
                    <strong>{m.name}</strong>
                    <span>{m.body}</span>
                    <span className="num">
                      {(m.profile.length / 25.4).toFixed(1)} in
                    </span>
                    <span className="num">from {money(m.trims[0].price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="stack" aria-hidden="true">
            {models.map((m) => (
              <Elevation
                key={m.slug}
                profile={m.profile}
                paint={paintHex(m.color)}
                label=""
                className={
                  lit === m.slug
                    ? "is-lit"
                    : lit
                      ? "is-ghost is-dim"
                      : "is-ghost"
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section winter sheet">
        <div className="wrap winter-grid">
          <div>
            <h2>{home.winter.title}</h2>
            <p>{home.winter.text}</p>
            <p className="legend">
              <span className="key key-summer" /> Combined range{" "}
              <span className="key key-winter" /> 20 °F at 70 mph
            </p>
          </div>
          <table className="bars">
            <caption className="sr-only">
              Longest-range version of each model: combined range and published
              winter range, in miles
            </caption>
            <thead>
              <tr>
                <th scope="col">Model</th>
                <th scope="col">Range</th>
              </tr>
            </thead>
            <tbody>
              {models.map((m) => {
                const t = best(m);
                return (
                  <tr key={m.slug}>
                    <th scope="row">
                      {m.name} <small>{t.name}</small>
                    </th>
                    <td>
                      <span
                        className="bar bar-summer"
                        style={{ width: `${(t.range / 400) * 100}%` }}
                      >
                        <span className="num">{t.range} mi</span>
                      </span>
                      <span
                        className="bar bar-winter"
                        style={{ width: `${(winterRange(t) / 400) * 100}%` }}
                      >
                        <span className="num">{winterRange(t)} mi</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section build-teaser">
        <div className="wrap build-grid">
          <Elevation
            profile={axis.profile}
            paint={paintHex(axisPaint)}
            wheel="spoke"
            label={`Vector Axis in ${paints.find((p) => p.id === axisPaint)?.name}`}
          />
          <div>
            <h2>{home.build.title}</h2>
            <p>{home.build.text}</p>
            <Swatches
              legend="Axis in"
              name="home-paint"
              options={paints.filter((p) => axis.paints.includes(p.id))}
              value={axisPaint}
              onChange={setAxisPaint}
            />
            <Link to="/configure/axis" className="btn btn-primary">
              Open the configurator
            </Link>
          </div>
        </div>
      </section>

      <section className="section charging-teaser">
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
          <div>
            <h2>{home.charging.title}</h2>
            <p>{home.charging.text}</p>
            <table className="spec-table">
              <caption>10–80% at a Vector Grid stall</caption>
              <tbody>
                {models.map((m) => {
                  const s = chargeSession(best(m), grid, 10, 80);
                  return (
                    <tr key={m.slug}>
                      <th scope="row">{m.name}</th>
                      <td className="num">{s.minutes} min</td>
                      <td className="num">+{s.miles} mi</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Link to="/charging" className="text-link">
              Plan charging <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section stories-teaser sheet">
        <div className="wrap">
          <h2>Owners, in their own words</h2>
          <div className="story-feature">
            <Link to={`/owners/${feature.slug}`} className="story-lead">
              <img
                src={feature.photo.src}
                alt={feature.photo.alt}
                width={feature.photo.width}
                height={feature.photo.height}
                loading="lazy"
              />
              <span className="story-meta">
                {feature.owner} · {feature.place} · {feature.miles}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.dek}</p>
            </Link>
            <ul className="story-list">
              {more.map((s) => (
                <li key={s.slug}>
                  <Link to={`/owners/${s.slug}`}>
                    <span className="story-meta">
                      {s.owner} · {s.place}
                    </span>
                    <h3>{s.title}</h3>
                    <p>{s.dek}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section studios">
        <div className="wrap">
          <div className="section-head">
            <h2>Six studios, and your driveway</h2>
            <Link to="/test-drive" className="btn btn-ghost">
              Choose a time
            </Link>
          </div>
          <ul className="studio-list">
            {studios.map((s) => (
              <li key={s.id}>
                <h3>
                  {s.city} <span>{s.name}</span>
                </h3>
                <p>{s.address}</p>
                <p className="muted">{s.hours}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="close">
        <img
          src={photos.dawn.src}
          alt=""
          width={photos.dawn.width}
          height={photos.dawn.height}
          loading="lazy"
        />
        <div className="wrap">
          <h2>{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/test-drive" className="btn btn-signal">
              Book a test drive
            </Link>
            <Link to="/models" className="btn btn-light">
              Compare models
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
