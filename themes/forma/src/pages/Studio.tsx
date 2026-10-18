import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { awards, brand, press, principles, studio, team } from "../content";

export function Studio() {
  return (
    <div className="page">
      <header className="wrap page-head">
        <h1>The studio</h1>
        <p>{studio.intro}</p>
      </header>

      <figure className="wrap case-cover">
        <img
          src={studio.room.src}
          alt={studio.room.alt}
          width={studio.room.w}
          height={studio.room.h}
        />
        <figcaption>{studio.roomCaption}</figcaption>
      </figure>

      <section className="wrap band">
        <div className="band-head">
          <h2>How we think</h2>
        </div>
        <div className="principles">
          {principles.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap band">
        <div className="band-head">
          <h2>People</h2>
          <p>
            Every project is led by a partner or associate from first meeting to
            the one-year visit.
          </p>
        </div>
        <ul className="people">
          {team.map((t) => (
            <li key={t.name}>
              <span className="person-name">{t.name}</span>
              <span className="person-role">{t.role}</span>
              <span className="person-note">{t.note}</span>
              <span className="person-since num">Since {t.since}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="wrap band split">
        <div>
          <h2>Awards</h2>
          <table className="register compact">
            <thead>
              <tr>
                <th scope="col">Year</th>
                <th scope="col">Award</th>
                <th scope="col">Project</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((a) => (
                <tr key={a.prize}>
                  <td className="num">{a.year}</td>
                  <td>{a.prize}</td>
                  <td>{a.project}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h2>Press</h2>
          <ul className="press">
            {press.map((p) => (
              <li key={p.title}>
                <span className="press-title">“{p.title}”</span>
                <span className="press-meta">
                  {p.outlet}, <span className="num">{p.year}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="small">
            Press enquiries and image requests:{" "}
            <a href={"mailto:" + brand.press}>{brand.press}</a>
          </p>
        </div>
      </section>

      <section className="wrap band split">
        <div>
          <h2>Work with us</h2>
          <p>{studio.careers}</p>
          <a href={"mailto:" + brand.jobs} className="text-link">
            {brand.jobs} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <div>
          <h2>Visit</h2>
          <address>
            {brand.address.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </address>
          <p>
            {brand.hours}. The model room is open on the first Thursday of each
            month, 18.00–21.00.
          </p>
          <Link to="/journal/thursday-drawing-evenings" className="text-link">
            About the drawing evenings{" "}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
}
