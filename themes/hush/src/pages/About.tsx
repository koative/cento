import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { about, brand, images } from "../content";

export function About() {
  return (
    <div className="page about-page">
      <header className="about-hero">
        <div>
          <h1>{about.title}</h1>
          <p className="lead">{about.lead}</p>
        </div>
        <img
          src={images.street}
          alt="A smiling man in a denim jacket with headphones around his neck on a busy pedestrian street"
          width={1400}
          height={933}
        />
      </header>

      <section className="values" aria-labelledby="h-values">
        <h2 id="h-values">Three things we will not trade</h2>
        <dl>
          {about.values.map((v) => (
            <div key={v.title}>
              <dt>{v.title}</dt>
              <dd>{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="ledger" aria-labelledby="h-ledger">
        <h2 id="h-ledger">Last year, in repairs</h2>
        <table>
          <caption className="visually-hidden">
            Repair figures for last year
          </caption>
          <tbody>
            {about.numbers.map((n) => (
              <tr key={n.label}>
                <th scope="row">{n.label}</th>
                <td className="num">{n.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="team" aria-labelledby="h-team">
        <h2 id="h-team">Some of the thirty-one</h2>
        <ul>
          {about.team.map((t) => (
            <li key={t.name}>
              <b>{t.name}</b>
              <span>{t.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="studios" aria-labelledby="h-studios">
        <img
          src={images.foam}
          alt="Foam wedges lining the chamber in the Oakland lab"
          width={1200}
          height={900}
          loading="lazy"
        />
        <div>
          <h2 id="h-studios">Where we work</h2>
          {about.studios.map((s) => (
            <div key={s.city} className="studio">
              <h3>{s.city}</h3>
              <p>{s.text}</p>
            </div>
          ))}
          <p>
            Press and partnerships:{" "}
            <a href={"mailto:" + brand.email}>{brand.email}</a>
          </p>
          <Link to="/story" className="text-link">
            Read how Hush One was made{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
