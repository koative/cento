import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  classes,
  dayNames,
  floorSpecs,
  home,
  joiningFee,
  plans,
  ptRates,
  slots,
  trainers,
} from "../content";
import { classById, money } from "../lib";
import { Barbell } from "../components/Barbell";
import { NextUp, TrainerCard } from "../components/Sessions";

const hoursUsed = [
  ...new Set(slots.map((s) => Number(s.time.slice(0, 2)))),
].sort((a, b) => a - b);

export function Home() {
  const [load, setLoad] = useState(225);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.intro}</p>
            <div className="actions">
              <Link to="/join" className="btn btn-primary">
                Join Iron
              </Link>
              <Link to="/timetable" className="btn btn-ghost">
                This week's timetable
              </Link>
            </div>
          </div>
          <img
            className="hero-img"
            src={home.hero.src}
            alt={home.hero.alt}
            width={home.hero.w}
            height={home.hero.h}
          />
          <NextUp />
        </div>
      </section>

      <section className="section wrap" aria-labelledby="ways">
        <div className="section-head">
          <h2 id="ways">Five ways to train, colour-coded like the plates</h2>
          <p>
            Every class on the timetable belongs to one family. Red is heavy.
            Green is the day after.
          </p>
        </div>
        <ul className="families">
          {categories.map((cat) => (
            <li key={cat.id} className="family">
              <span
                className="family-plate"
                style={{ ["--c" as string]: cat.plate }}
                aria-hidden="true"
              />
              <div>
                <h3>{cat.name}</h3>
                <p>{cat.line}</p>
              </div>
              <ul className="family-classes">
                {classes
                  .filter((c) => c.category === cat.id)
                  .map((c) => (
                    <li key={c.id}>
                      <Link to={`/classes/${c.id}`}>{c.name}</Link>
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section className="section section-tint" aria-labelledby="week">
        <div className="wrap">
          <div className="section-head">
            <h2 id="week">The week, hour by hour</h2>
            <p>
              {slots.length} coached classes, clustered where working people can
              reach them: before work, at lunch and after six.
            </p>
          </div>
          <div className="heat-scroll">
            <table className="heat">
              <caption className="sr-only">
                Classes per hour, Monday to Sunday
              </caption>
              <thead>
                <tr>
                  <td />
                  {hoursUsed.map((h) => (
                    <th key={h} scope="col">
                      {h % 12 || 12}
                      <span>{h < 12 ? "am" : "pm"}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dayNames.map((d, day) => (
                  <tr key={d}>
                    <th scope="row">{d.slice(0, 3)}</th>
                    {hoursUsed.map((h) => {
                      const here = slots.filter(
                        (s) =>
                          s.day === day && Number(s.time.slice(0, 2)) === h,
                      );
                      return (
                        <td key={h}>
                          {here.map((s) => {
                            const c = classById(s.classId)!;
                            return (
                              <span
                                key={s.time + s.classId}
                                className="heat-dot"
                                title={`${c.name} ${s.time}`}
                                style={{
                                  ["--c" as string]: categories.find(
                                    (x) => x.id === c.category,
                                  )!.plate,
                                }}
                              >
                                <span className="sr-only">
                                  {c.name} at {s.time}
                                </span>
                              </span>
                            );
                          })}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link to="/timetable" className="text-link">
            Filter the timetable by class, coach or time{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section wrap split" aria-labelledby="coaching">
        <img
          src={home.coaching.image.src}
          alt={home.coaching.image.alt}
          width={home.coaching.image.w}
          height={home.coaching.image.h}
          loading="lazy"
          className="split-img"
        />
        <div className="split-copy">
          <h2 id="coaching">{home.coaching.title}</h2>
          <p>{home.coaching.text}</p>
          <ul className="ticks">
            {home.coaching.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="price-line">
            From{" "}
            <strong>{money(ptRates[2].price / ptRates[2].sessions)}</strong> a
            session in a ten-block, or {money(ptRates[0].price)} for one.
          </p>
          <div className="actions">
            <Link to="/trainers" className="btn btn-primary">
              Meet the coaches
            </Link>
            <Link to="/memberships" className="btn btn-ghost">
              Training rates
            </Link>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="coaches">
        <div className="wrap section-head">
          <h2 id="coaches">Six coaches, on the floor every open hour</h2>
          <Link to="/trainers" className="text-link">
            All profiles <ArrowRight aria-hidden="true" />
          </Link>
        </div>
        <ul className="wrap trainer-strip">
          {trainers.map((t) => (
            <TrainerCard key={t.id} t={t} />
          ))}
        </ul>
      </section>

      <section className="section wrap loader" aria-labelledby="bar">
        <div className="loader-copy">
          <h2 id="bar">What goes on the bar?</h2>
          <p>
            Every plate at Iron is colour-coded by weight. Slide to a number and
            we'll load it the way a coach would: heaviest plates first, smallest
            on the outside. The programme builder does this for every set of a
            four-week block.
          </p>
          <label className="range">
            <span>Total weight</span>
            <input
              type="range"
              min={45}
              max={600}
              step={5}
              value={load}
              onChange={(e) => setLoad(Number(e.target.value))}
            />
          </label>
        </div>
        <div className="loader-bar">
          <Barbell weight={load} />
          <p className="sr-only" aria-live="polite">
            {load} lb loaded
          </p>
          <Link to="/programme" className="btn btn-primary">
            Build a programme
          </Link>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="plans">
        <div className="wrap">
          <div className="section-head">
            <h2 id="plans">Memberships</h2>
            <p>
              Month to month, 30 days' notice. Annual plans get two months free
              and skip the {money(joiningFee)} joining fee.
            </p>
          </div>
          <ul className="plan-rows">
            {plans.map((p) => (
              <li key={p.id}>
                <h3>{p.name}</h3>
                <p>{p.pitch}</p>
                <p className="plan-rows-price">
                  <strong>{money(p.monthly)}</strong> / month
                </p>
                <Link
                  to={`/join?plan=${p.id}`}
                  className="btn btn-ghost"
                  aria-label={`Join with ${p.name}`}
                >
                  Choose
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/memberships" className="text-link">
            Compare everything, plus day passes and PT blocks{" "}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="floor" aria-labelledby="floor">
        <img
          src={home.floor.image.src}
          alt={home.floor.image.alt}
          width={home.floor.image.w}
          height={home.floor.image.h}
          loading="lazy"
        />
        <div className="wrap floor-panel">
          <h2 id="floor">{home.floor.title}</h2>
          <p>{home.floor.text}</p>
          <dl className="specs">
            {floorSpecs.map((s) => (
              <div key={s.item}>
                <dt>{s.item}</dt>
                <dd>{s.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap voices" aria-labelledby="voices">
        <h2 id="voices" className="sr-only">
          Members
        </h2>
        <figure className="voice voice-lead">
          <blockquote>{home.voices[0].quote}</blockquote>
          <figcaption>
            {home.voices[0].name}, <span>{home.voices[0].detail}</span>
          </figcaption>
        </figure>
        {home.voices.slice(1).map((v) => (
          <figure key={v.name} className="voice">
            <blockquote>{v.quote}</blockquote>
            <figcaption>
              {v.name}, <span>{v.detail}</span>
            </figcaption>
          </figure>
        ))}
      </section>

      <section className="close" aria-labelledby="close">
        <div className="wrap close-inner">
          <h2 id="close">{home.close.title}</h2>
          <p>{home.close.text}</p>
          <div className="actions">
            <Link to="/join" className="btn btn-primary">
              Choose a plan and start date
            </Link>
            <Link to="/classes/foundations" className="btn btn-ghost">
              What Foundations covers
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
