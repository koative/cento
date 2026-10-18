import { brand, dining } from "../content";
import { money } from "../lib/stay";

export function Dining() {
  const [teria, stube] = dining.venues;
  return (
    <>
      <header className="page-head wrap">
        <h1>Dining</h1>
        <p className="lede">{dining.intro}</p>
      </header>

      <section className="section wrap venue" aria-labelledby="teria-h">
        <img
          src={teria.image.src}
          alt={teria.image.alt}
          width={1280}
          height={853}
          className="venue-img"
        />
        <div>
          <h2 id="teria-h">{teria.name}</h2>
          <p className="hours">{teria.hours}</p>
          <p>{teria.text}</p>
          <h3 className="menu-title">{dining.tasting.title}</h3>
          <ol className="course-list">
            {dining.tasting.courses.map((c) => (
              <li key={c.name}>
                <span className="course-name">{c.name}</span>
                <span className="course-detail">{c.detail}</span>
              </li>
            ))}
          </ol>
          <p className="small">{dining.tasting.note}</p>
        </div>
      </section>

      <section className="section band-linen" aria-labelledby="stube-h">
        <div className="wrap venue venue-flip">
          <img
            src={stube.image.src}
            alt={stube.image.alt}
            width={1280}
            height={809}
            loading="lazy"
            className="venue-img"
          />
          <div>
            <h2 id="stube-h">{stube.name}</h2>
            <p className="hours">{stube.hours}</p>
            <p>{stube.text}</p>
            <ul className="menu-list">
              {dining.stube.map((m) => (
                <li key={m.name}>
                  <span className="menu-name">{m.name}</span>
                  <span className="menu-price num">{money(m.price)}</span>
                  <span className="menu-detail">{m.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section wrap breakfast" aria-labelledby="bf-h">
        <div>
          <h2 id="bf-h">Breakfast</h2>
          <p className="hours">{dining.breakfast.hours}</p>
          <p>{dining.breakfast.text}</p>
        </div>
        <img
          src={dining.breakfast.image.src}
          alt={dining.breakfast.image.alt}
          width={1280}
          height={853}
          loading="lazy"
        />
        <img
          src={dining.images.fondue.src}
          alt={dining.images.fondue.alt}
          width={1280}
          height={960}
          loading="lazy"
        />
      </section>

      <section className="section wrap producers" aria-labelledby="prod-h">
        <div className="producers-imgs">
          <img
            src={dining.images.chef.src}
            alt={dining.images.chef.alt}
            width={1280}
            height={751}
            loading="lazy"
          />
          <img
            src={dining.images.cheese.src}
            alt={dining.images.cheese.alt}
            width={1280}
            height={851}
            loading="lazy"
          />
        </div>
        <div>
          <h2 id="prod-h">Who we buy from</h2>
          <dl className="defs">
            {dining.producers.map((p) => (
              <div key={p.name}>
                <dt>{p.name}</dt>
                <dd>{p.what}</dd>
              </div>
            ))}
          </dl>
          <h3>Reserve a table</h3>
          <p>
            Both rooms are open to everyone, not only hotel guests. Call{" "}
            <a href={`tel:${brand.phone.replace(/\s/g, "")}`}>{brand.phone}</a>{" "}
            or write to{" "}
            <a href={`mailto:${brand.email}?subject=Table%20reservation`}>
              {brand.email}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
