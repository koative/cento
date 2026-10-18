import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, images, teachers } from "../content";
import { Coda } from "../components/Bits";

export function About() {
  const director = teachers.find((t) => t.role.startsWith("Director"));

  return (
    <div className="page about">
      <header className="page-head wrap">
        <h1>{about.title}</h1>
        <p className="lede">{about.lede}</p>
      </header>

      <section className="wrap about-story" aria-label="Our story">
        <img
          src={images.practiceRoom.src}
          alt={images.practiceRoom.alt}
          width={images.practiceRoom.w}
          height={images.practiceRoom.h}
        />
        <div className="prose">
          {about.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          {director && (
            <p>
              Today the school is run by its director,{" "}
              <Link to={`/teachers/${director.slug}`}>{director.name}</Link>,
              with the heads of keys, strings and voice.
            </p>
          )}
        </div>
      </section>

      <section className="wrap principles" aria-labelledby="pr-h">
        <h2 id="pr-h">How we teach</h2>
        <dl className="principle-list">
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="building" aria-labelledby="bd-h">
        <div className="wrap building-grid">
          <div>
            <h2 id="bd-h">The building</h2>
            <dl className="room-list">
              {about.building.map((b) => (
                <div key={b.name}>
                  <dt>{b.name}</dt>
                  <dd>{b.text}</dd>
                </div>
              ))}
            </dl>
          </div>
          <img
            src={images.recitalHall.src}
            alt={images.recitalHall.alt}
            width={images.recitalHall.w}
            height={images.recitalHall.h}
            loading="lazy"
          />
        </div>
      </section>

      <section className="wrap visit" aria-labelledby="visit-h">
        <div>
          <h2 id="visit-h">Visit</h2>
          <address>
            {brand.full}
            <br />
            {brand.address.join(", ")}
            <br />
            <a href={brand.phoneHref}>{brand.phone}</a> ·{" "}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
          </address>
          <p>
            The front desk is staffed whenever lessons are running. The building
            is step-free from the Alder Street entrance, with a lift to the Long
            Room.
          </p>
        </div>
        <dl className="hours">
          {brand.hours.map((h) => (
            <div key={h.days}>
              <dt>{h.days}</dt>
              <dd>{h.time}</dd>
            </div>
          ))}
        </dl>
        <div>
          <h2>Teach at Score</h2>
          <p>{about.careers}</p>
          <a className="text-link" href={`mailto:${brand.jobs}`}>
            {brand.jobs} <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </section>

      <Coda
        title="Come and hear the Long Room."
        text="Recitals are free and open to anyone. Or book a trial lesson and see the rest of the house."
      />
    </div>
  );
}
