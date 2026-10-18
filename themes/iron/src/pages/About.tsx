import { Link } from "../router";
import { about, brand, floorSpecs, home, hours, trainers } from "../content";

export function About() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.intro}</p>
      </header>

      <figure className="wide-img">
        <img
          src={home.floor.image.src}
          alt={home.floor.image.alt}
          width={home.floor.image.w}
          height={home.floor.image.h}
        />
      </figure>

      <section className="wrap section two-col" aria-labelledby="why">
        <h2 id="why">Who it's for</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            The coaching team is {trainers.length} people, all full-time.{" "}
            <Link to="/trainers">Meet them</Link>, or see{" "}
            <Link to="/classes">what they teach</Link>.
          </p>
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="rules">
        <div className="wrap two-col">
          <h2 id="rules">House rules</h2>
          <dl className="rules">
            {about.rules.map((r) => (
              <div key={r.title}>
                <dt>{r.title}</dt>
                <dd>{r.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section split split-flip" aria-labelledby="kit">
        <img
          src={about.images.dumbbells.src}
          alt={about.images.dumbbells.alt}
          width={about.images.dumbbells.w}
          height={about.images.dumbbells.h}
          loading="lazy"
          className="split-img"
        />
        <div className="split-copy">
          <h2 id="kit">What's on the floor</h2>
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

      <section className="section section-tint" aria-labelledby="visit">
        <div className="wrap visit">
          <div>
            <h2 id="visit">Find us</h2>
            <address className="visit-address">
              {brand.full}
              <br />
              {brand.street}
              <br />
              {brand.area}
            </address>
            <p>
              <a href={brand.phoneHref}>{brand.phone}</a>
              <br />
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </div>
          <div>
            <h3>Staffed hours</h3>
            <dl className="hours">
              {hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.open}</dd>
                </div>
              ))}
            </dl>
            <h3>Getting here</h3>
            <dl className="hours">
              {about.getting.map((g) => (
                <div key={g.title}>
                  <dt>{g.title}</dt>
                  <dd>{g.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <h3>Access</h3>
            <ul className="ticks">
              {about.access.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="close" aria-labelledby="about-close">
        <div className="wrap close-inner">
          <h2 id="about-close">Come and lift something</h2>
          <p>
            Saturday Run Club is free with a member. Otherwise, a day pass is
            $25 and comes off your first month.
          </p>
          <div className="actions">
            <Link to="/join" className="btn btn-primary">
              Join Iron
            </Link>
            <Link to="/timetable" className="btn btn-ghost">
              Timetable
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
