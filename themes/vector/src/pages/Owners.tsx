import { Link } from "../router";
import { brand, models, ownersPage, photos, stories } from "../content";

export function Owners() {
  const [latest, ...older] = ownersPage.updates;

  return (
    <>
      <header className="page-head sheet">
        <div className="wrap">
          <h1>Owners</h1>
          <p className="lede">{ownersPage.intro}</p>
          <p className="contact-line">
            Owner support{" "}
            <a href={`mailto:${brand.ownersEmail}`}>{brand.ownersEmail}</a> ·
            Roadside, 24 hours{" "}
            <a href={`tel:${brand.roadside.replace(/\s/g, "")}`}>
              {brand.roadside}
            </a>
          </p>
        </div>
      </header>

      <section className="section">
        <div className="wrap updates">
          <div>
            <h2>
              Software {latest.version}: {latest.name}
            </h2>
            <p className="muted">
              Released {latest.date}, installing over the air now.
            </p>
            <ul className="release">
              {latest.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
          <ol className="release-log" aria-label="Earlier releases">
            {older.map((u) => (
              <li key={u.version}>
                <h3>
                  <span className="num">{u.version}</span> {u.name}
                </h3>
                <p className="muted">{u.date}</p>
                <ul>
                  {u.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section sheet">
        <div className="wrap split">
          <figure className="photo">
            <img
              src={photos.garage.src}
              alt={photos.garage.alt}
              width={photos.garage.width}
              height={photos.garage.height}
              loading="lazy"
            />
          </figure>
          <div>
            <h2>Service comes to you</h2>
            <ul className="notes stacked">
              {ownersPage.service.map((s) => (
                <li key={s.title}>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-tables">
          <div>
            <h2>Warranty</h2>
            <table className="spec-table">
              <tbody>
                {ownersPage.warranty.map((w) => (
                  <tr key={w.item}>
                    <th scope="row">{w.item}</th>
                    <td>{w.term}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2>Owner questions</h2>
            <div className="faq">
              {ownersPage.faq.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section sheet">
        <div className="wrap">
          <h2>Owner stories</h2>
          <ul className="story-grid">
            {stories.map((s) => (
              <li key={s.slug}>
                <Link to={`/owners/${s.slug}`}>
                  <img
                    src={s.photo.src}
                    alt={s.photo.alt}
                    width={s.photo.width}
                    height={s.photo.height}
                    loading="lazy"
                  />
                  <span className="story-meta">
                    {s.owner} · {models.find((m) => m.slug === s.model)?.name} ·{" "}
                    {s.miles}
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
