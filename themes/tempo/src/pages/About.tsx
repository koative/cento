import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand } from "../content";
import { PageHead } from "../components/Lists";

export function About() {
  return (
    <>
      <PageHead title={about.title} intro={about.intro} />

      <figure className="wrap wide-photo">
        <img
          src={about.space.src}
          alt={about.space.alt}
          width={about.space.w}
          height={about.space.h}
        />
      </figure>

      <section className="section wrap story">
        <h2>Since 2016, on Foundry Street</h2>
        <div className="prose">
          {about.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section-ink">
        <div className="wrap section principles" aria-labelledby="rules-title">
          <h2 id="rules-title">House rules</h2>
          <dl>
            {about.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap rooms" aria-labelledby="rooms-title">
        <h2 id="rooms-title">Three rooms</h2>
        <dl>
          {about.rooms.map((r) => (
            <div key={r.name}>
              <dt>{r.name}</dt>
              <dd>{r.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section-paper2">
        <div className="wrap section visit" aria-labelledby="visit-title">
          <div>
            <h2 id="visit-title">Find us</h2>
            <address className="lede">
              {brand.address[0]}
              <br />
              {brand.address[1]}
            </address>
            <p>{brand.transit}</p>
            <p>
              <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
          </div>
          <div>
            <h2>Front desk hours</h2>
            <dl className="hours">
              {brand.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd className="num">{h.time}</dd>
                </div>
              ))}
            </dl>
            <p className="muted">
              The building opens 15 minutes before the first class of the day.
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap teach">
        <h2>Work with us</h2>
        <p className="lede">
          {about.careers} <a href={`mailto:${brand.email}`}>{brand.email}</a>.
        </p>
        <Link to="/instructors" className="text-link">
          Meet the current team <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
