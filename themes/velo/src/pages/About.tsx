import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, hours, hoursNote, photos, story, team } from "../content";
import { dayNames, openStatus } from "../lib/hours";

export function About() {
  const status = openStatus();
  return (
    <div className="page">
      <header className="page-head">
        <h1>A bike shop with a frame jig in the back</h1>
        <p className="lead">{story.intro}</p>
      </header>

      <section className="about-split">
        <img
          src={photos.shopTools}
          alt="Pegboard tool wall in the workshop, with spanners, saws and floor pumps"
          width={1400}
          height={933}
        />
        <div className="prose">
          {story.body.map((p) => (
            <p key={p.slice(0, 16)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section process">
        <h2>How a Velo frame is made</h2>
        <ol className="steps">
          {story.steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-week">Week {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section">
        <h2>Who's in the shop</h2>
        <ul className="team">
          {team.map((t) => (
            <li key={t.name}>
              <span className="team-initials" aria-hidden="true">
                {t.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </span>
              <h3>{t.name}</h3>
              <p className="team-role">{t.role}</p>
              <p>{t.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="photo-pair">
        <img
          src={photos.shopStand}
          alt="Wheel truing stand on a cluttered workbench under a pegboard of tools"
          width={1400}
          height={931}
          loading="lazy"
        />
        <img
          src={photos.shopTruing}
          alt="A mechanic seating a tyre on a rim at the workshop bench"
          width={1400}
          height={1120}
          loading="lazy"
        />
      </section>

      <section className="section visit">
        <div>
          <h2>Visit the shop</h2>
          <p className="lead">
            {brand.address.join(", ")}. Five minutes from Halden station, with
            bike parking out front and a kettle inside.
          </p>
          <p className="muted">{hoursNote}</p>
          <div className="actions">
            <Link to="/service" className="btn">
              Book a service <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <a href={`mailto:${brand.email}`} className="btn btn-ghost">
              {brand.email}
            </a>
          </div>
        </div>
        <div>
          <p className="hero-status">
            <span
              className="dot"
              data-open={status.open || undefined}
              aria-hidden="true"
            />
            {status.label}
          </p>
          <table className="hours-table">
            <caption className="visually-hidden">Opening hours</caption>
            <tbody>
              {[2, 3, 4, 5, 6, 0, 1].map((d) => (
                <tr key={d} data-today={new Date().getDay() === d || undefined}>
                  <th scope="row">{dayNames[d]}</th>
                  <td className="num">
                    {hours[d]
                      ? `${hours[d]!.open} – ${hours[d]!.close}`
                      : "Closed"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
