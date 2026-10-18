import { Link } from "../router";
import { aboutPage } from "../content";

export function About() {
  const { image, floorImage } = aboutPage;
  return (
    <>
      <header className="wrap about-hero">
        <div>
          <h1>{aboutPage.title}</h1>
          <p className="lede">{aboutPage.lead}</p>
        </div>
        <img src={image.src} alt={image.alt} width={image.w} height={image.h} />
      </header>

      <section className="wrap about-story" aria-label="How Fade started">
        <div className="prose">
          {aboutPage.story.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <figure>
          <img
            src={floorImage.src}
            alt={floorImage.alt}
            width={floorImage.w}
            height={floorImage.h}
            loading="lazy"
          />
          <figcaption>
            The floor at closing time. Same tiles since 2012.
          </figcaption>
        </figure>
      </section>

      <section className="wrap timeline" aria-labelledby="timeline-title">
        <h2 id="timeline-title">Chair by chair</h2>
        <ol>
          {aboutPage.timeline.map((t) => (
            <li key={t.year}>
              <span className="year">{t.year}</span>
              <p>{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rules-section" aria-labelledby="rules-title">
        <div className="wrap rules">
          <h2 id="rules-title">{aboutPage.rulesTitle}</h2>
          <ul>
            {aboutPage.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap apprentice" aria-labelledby="apprentice-title">
        <h2 id="apprentice-title">{aboutPage.apprenticeTitle}</h2>
        <p>{aboutPage.apprenticeText}</p>
        <p>
          Applications open every June. Write to{" "}
          <a href="mailto:apprentice@fade.example">apprentice@fade.example</a>{" "}
          with a few lines about why, and photos of any cuts you have done, even
          on yourself.
        </p>
        <div className="actions">
          <Link to="/barbers" className="btn btn-ink">
            Meet the barbers
          </Link>
          <Link to="/visit" className="btn btn-line">
            Come and see the shop
          </Link>
        </div>
      </section>
    </>
  );
}
