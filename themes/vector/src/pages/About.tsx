import { Link } from "../router";
import { aboutPage, photos } from "../content";

export function About() {
  const { plant, sustainability } = aboutPage;
  return (
    <>
      <header className="page-head sheet">
        <div className="wrap">
          <h1 className="h1-long">{aboutPage.title}</h1>
          <p className="lede">{aboutPage.intro}</p>
        </div>
      </header>

      <section className="section">
        <div className="wrap narrow prose">
          {aboutPage.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      </section>

      <section className="section sheet">
        <div className="wrap">
          <h2>What we hold ourselves to</h2>
          <ul className="principles">
            {aboutPage.principles.map((p) => (
              <li key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>{plant.title}</h2>
            <p>{plant.text}</p>
            <table className="spec-table">
              <tbody>
                {plant.facts.map((f) => (
                  <tr key={f.label}>
                    <th scope="row">{f.label}</th>
                    <td className="num">{f.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figure className="photo">
            <img
              src={photos.windfarm.src}
              alt={photos.windfarm.alt}
              width={photos.windfarm.width}
              height={photos.windfarm.height}
              loading="lazy"
            />
            <figcaption>{sustainability.title}</figcaption>
          </figure>
        </div>
        <div className="wrap narrow">
          <p className="pull">{sustainability.text}</p>
        </div>
      </section>

      <section className="section sheet">
        <div className="wrap">
          <h2>Since 2019</h2>
          <ol className="timeline">
            {aboutPage.timeline.map((t) => (
              <li key={t.year}>
                <span className="num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Leadership</h2>
          <ul className="team">
            {aboutPage.team.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className="role">{p.role}</p>
                <p>{p.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-strip">
        <div className="wrap">
          <h2>Come and see Plant One's work up close.</h2>
          <div className="actions">
            <Link to="/test-drive" className="btn btn-signal">
              Book a test drive
            </Link>
            <Link to="/models" className="btn btn-light">
              See the models
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
