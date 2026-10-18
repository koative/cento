import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { images, offices, people, peoplePage } from "../content";
import { capabilityBySlug } from "../lib/format";
import { Link } from "../router";

const practiceName = (p: string) => capabilityBySlug(p)?.name ?? p;

export function People() {
  const [office, setOffice] = useState("All");
  const shown = people.filter((p) => office === "All" || p.office === office);
  const partners = shown.filter((p) => p.partner);
  const others = shown.filter((p) => !p.partner);

  return (
    <>
      <header className="page-head wrap">
        <h1 className="display">{peoplePage.title}</h1>
        <p className="lede">{peoplePage.lede}</p>
      </header>

      <section className="wrap section-tight firm" aria-label="The firm">
        <figure className="photo">
          <img
            src={images.review}
            alt="Three colleagues leaning over a laptop, one pointing at the screen mid-discussion."
            width={960}
            height={640}
          />
          <figcaption>{peoplePage.photoCaption}</figcaption>
        </figure>
        <dl className="spec">
          {peoplePage.facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section" aria-labelledby="values-title">
        <h2 className="h2" id="values-title">
          Four rules we hold ourselves to
        </h2>
        <dl className="values">
          {peoplePage.values.map((v) => (
            <div key={v.title}>
              <dt>{v.title}</dt>
              <dd>{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="wrap section" aria-labelledby="leaders-title">
        <div className="split">
          <h2 className="h2" id="leaders-title">
            Partners and leadership
          </h2>
          <fieldset className="segmented">
            <legend>Office</legend>
            <div>
              {["All", ...offices.map((o) => o.city)].map((o) => (
                <button
                  key={o}
                  type="button"
                  aria-pressed={office === o}
                  onClick={() => setOffice(o)}
                >
                  {o}
                </button>
              ))}
            </div>
          </fieldset>
        </div>
        <p className="results-count" aria-live="polite">
          {office === "All" ? "Everyone" : `${office} office`}:{" "}
          <span className="num">{shown.length}</span> people shown
        </p>

        {partners.length > 0 && (
          <ul className="partners">
            {partners.map((p) => (
              <li key={p.id}>
                {p.photo && (
                  <img
                    src={p.photo}
                    alt={`Portrait of ${p.name}`}
                    width={240}
                    height={320}
                    loading="lazy"
                  />
                )}
                <h3>{p.name}</h3>
                <p className="person-role">
                  {p.role} · {p.office}
                </p>
                <details>
                  <summary>Biography</summary>
                  {p.bio.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                  <dl className="person-facts">
                    <dt>Before Quadrant</dt>
                    <dd>{p.before}</dd>
                    <dt>Education</dt>
                    <dd>{p.education}</dd>
                  </dl>
                </details>
              </li>
            ))}
          </ul>
        )}

        {others.length > 0 && (
          <ul className="directory">
            {others.map((p) => (
              <li key={p.id}>
                <details>
                  <summary>
                    <span className="dir-name">{p.name}</span>
                    <span className="dir-role">{p.role}</span>
                    <span className="dir-practice">
                      {practiceName(p.practice)}
                    </span>
                    <span className="dir-office">{p.office}</span>
                  </summary>
                  <div className="dir-body">
                    {p.bio.map((b) => (
                      <p key={b}>{b}</p>
                    ))}
                    <p className="muted">
                      {p.before}. {p.education}.
                    </p>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="wrap section offices" aria-labelledby="offices-title">
        <h2 className="h2" id="offices-title">
          Offices
        </h2>
        <ul>
          {offices.map((o) => (
            <li key={o.city}>
              <h3>{o.city}</h3>
              <address>
                {o.lines.map((l) => (
                  <span key={l}>{l}</span>
                ))}
                <a href={o.phoneHref} className="num">
                  {o.phone}
                </a>
              </address>
              <p className="muted">{o.note}</p>
            </li>
          ))}
        </ul>
        <Link to="/careers" className="link-arrow">
          We hire about thirty people a year — see open roles{" "}
          <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
