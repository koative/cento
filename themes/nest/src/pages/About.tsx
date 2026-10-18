import { images, ratios, rooms, story, testimonials } from "../content";
import { TourCta } from "../components/TourCta";

export function About() {
  const buildingPhotos = [images.rings, images.parachute, images.walker];
  return (
    <>
      <section className="page-head">
        <div className="wrap about-head">
          <h1>Our story</h1>
          <p className="lede">{story.lead}</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="wrap about-intro">
          <div className="prose">
            {story.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ol className="timeline">
            {story.timeline.map((t) => (
              <li key={t.year}>
                <span className="num">{t.year}</span>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-oat">
        <div className="wrap">
          <div className="section-head">
            <h2>What we believe, in four lines</h2>
          </div>
          <dl className="principle-list principle-list-wide">
            {story.principles.map((p) => (
              <div key={p.title}>
                <dt>{p.title}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <h2>The house, the garden, the woods</h2>
          </div>
          <ul className="places">
            {story.building.map((b, i) => (
              <li key={b.title}>
                <img
                  src={buildingPhotos[i].src}
                  alt={buildingPhotos[i].alt}
                  width={buildingPhotos[i].w}
                  height={buildingPhotos[i].h}
                  loading="lazy"
                />
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section-ink">
        <div className="wrap split">
          <div className="split-head">
            <h2>More grown-ups than the rules ask for</h2>
            <p>
              We staff every room above the state minimum, so there's always
              someone free for a cuddle, a diaper change or a child who needs a
              quiet minute. {rooms.reduce((t, r) => t + r.places, 0)} places,
              twenty-four staff.
            </p>
          </div>
          <table className="rate-table">
            <caption className="sr-only">
              Our staffing ratios compared with the state minimum
            </caption>
            <thead>
              <tr>
                <th scope="col">Age group</th>
                <th scope="col">At Nest</th>
                <th scope="col">State minimum</th>
              </tr>
            </thead>
            <tbody>
              {ratios.map((r) => (
                <tr key={r.stage}>
                  <th scope="row">{r.stage}</th>
                  <td className="num">{r.ratio}</td>
                  <td className="num">{r.required}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <div className="wrap voices">
          <h2>From the families</h2>
          <ul>
            {testimonials.map((t) => (
              <li key={t.who}>
                <blockquote>
                  <p>“{t.quote}”</p>
                  <footer>
                    <strong>{t.who}</strong> · {t.detail}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <TourCta title="Come and see the old bakery." />
    </>
  );
}
