import { Mail, MapPin, Phone } from "lucide-react";
import { about, brand } from "../content";

export function About() {
  return (
    <div className="page about">
      <header className="wrap about-head">
        <h1>{about.title}</h1>
        <p className="lead">{about.intro}</p>
      </header>

      <figure className="wrap about-plate">
        <img
          src={about.image.src}
          alt={about.image.alt}
          width={1023}
          height={682}
        />
      </figure>

      <section className="wrap principles" aria-labelledby="principles-title">
        <h2 id="principles-title" className="rule-title">
          How we make it
        </h2>
        <dl>
          {about.principles.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="wrap about-split">
        <section aria-labelledby="masthead-title">
          <h2 id="masthead-title" className="rule-title">
            Masthead
          </h2>
          <dl className="masthead">
            {about.masthead.map((m) => (
              <div key={m.role}>
                <dt>{m.role}</dt>
                <dd>{m.name}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="submissions-title">
          <h2 id="submissions-title" className="rule-title">
            Submissions
          </h2>
          {about.submissions.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            Pitches to <a href={"mailto:" + brand.email}>{brand.email}</a>
          </p>
        </section>
      </div>

      <div className="wrap about-split">
        <section aria-labelledby="stockists-title">
          <h2 id="stockists-title" className="rule-title">
            Where to find it
          </h2>
          <p>
            Monograph is sold by around 140 independent shops. A few of them:
          </p>
          <ul className="stockists">
            {about.stockists.map((s) => (
              <li key={s.name}>
                <span>{s.name}</span>
                <span>{s.place}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="contact-title">
          <h2 id="contact-title" className="rule-title">
            The office
          </h2>
          <ul className="contact-list">
            <li>
              <MapPin size={18} aria-hidden="true" /> {brand.address}
            </li>
            <li>
              <Mail size={18} aria-hidden="true" />{" "}
              <a href={"mailto:" + brand.email}>{brand.email}</a>
            </li>
            <li>
              <Phone size={18} aria-hidden="true" />{" "}
              <a href={brand.phoneHref}>{brand.phone}</a>
            </li>
          </ul>
          <p>
            {brand.hours}. Visitors welcome by appointment; back issues can be
            collected from the door.
          </p>
        </section>
      </div>
    </div>
  );
}
