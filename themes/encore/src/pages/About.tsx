import { brand, images, people, story, supporters, timeline } from "../content";

export function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1 className="display">A playhouse on Lantern Street since 1911</h1>
        </div>
      </section>

      <section className="section section-flush">
        <div className="wrap split split-top">
          <div className="prose">
            {story.map((s, i) => (
              <p key={i} className={i === 0 ? "lede" : undefined}>
                {s}
              </p>
            ))}
          </div>
          <img
            src={images.curtainCall.src}
            alt={images.curtainCall.alt}
            width={images.curtainCall.w}
            height={images.curtainCall.h}
          />
        </div>
      </section>

      <section className="section section-tint">
        <div className="wrap">
          <h2>The building, in six dates</h2>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.year}>
                <span className="tl-year num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Who runs the house</h2>
          <ul className="people">
            {people.map((p) => (
              <li key={p.name}>
                <h3>{p.name}</h3>
                <p className="person-role">{p.role}</p>
                <p>{p.bio}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section house-dark">
        <div className="wrap split split-top">
          <div>
            <h2>Supported by</h2>
            <ul className="supporters">
              {supporters.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="prose">
            <h2>Work with us</h2>
            <p>
              We hire ushers, bar staff and stage crew for every production, and
              post casting calls for the ensemble each spring. Send a note and a
              CV to <a href="mailto:jobs@encore.example">jobs@encore.example</a>
              .
            </p>
            <p>
              The Mainstage, Studio and Lantern Bar are available for hire on
              Mondays and during summer. Email{" "}
              <a href={`mailto:${brand.email}?subject=Venue%20hire`}>
                {brand.email}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
