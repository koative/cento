import { aboutPage, brand, team } from "../content";

export function About() {
  const photo = aboutPage.photo;
  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>{aboutPage.title}</h1>
        <p className="lede">{aboutPage.lede}</p>
      </header>

      <section className="wrap about-story" aria-label="Our story">
        <figure className="arch">
          <img
            src={photo.src}
            alt={photo.alt}
            width={1280}
            height={960}
            fetchPriority="high"
          />
          <figcaption>{photo.caption}</figcaption>
        </figure>
        <div className="prose">
          {aboutPage.story.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      <section
        className="section principles-band"
        aria-labelledby="h-principles"
      >
        <div className="wrap">
          <h2 id="h-principles">{aboutPage.principlesTitle}</h2>
          <dl className="principles">
            {aboutPage.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-team">
        <h2 id="h-team">{aboutPage.teamTitle}</h2>
        <table className="team">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">On the island</th>
              <th scope="col">Ask them about</th>
            </tr>
          </thead>
          <tbody>
            {team.map((t) => (
              <tr key={t.name}>
                <th scope="row">{t.name}</th>
                <td>{t.role}</td>
                <td>{t.years}</td>
                <td>{t.ask}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="wrap owners" aria-labelledby="h-owners">
        <h2 id="h-owners">{aboutPage.ownersTitle}</h2>
        <p className="measure">{aboutPage.ownersText}</p>
        <a
          className="btn btn-quiet"
          href={`mailto:${brand.email}?subject=A%20house%20on%20${brand.island}`}
        >
          Write to Jonah
        </a>
      </section>
    </div>
  );
}
