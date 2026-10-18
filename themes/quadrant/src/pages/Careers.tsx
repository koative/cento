import { useState } from "react";
import {
  brand,
  careersPage,
  images,
  offices,
  roles,
  type Role,
} from "../content";

const tracks: ("All" | Role["track"])[] = [
  "All",
  "Associate",
  "Consultant",
  "Experienced",
  "Specialist",
];

export function Careers() {
  const [track, setTrack] = useState<(typeof tracks)[number]>("All");
  const [office, setOffice] = useState("");
  const shown = roles.filter(
    (r) =>
      (track === "All" || r.track === track) &&
      (!office || r.office === office),
  );

  return (
    <>
      <header className="page-head wrap page-head-photo">
        <div>
          <h1 className="display">{careersPage.title}</h1>
          <p className="lede">{careersPage.lede}</p>
        </div>
        <figure className="photo">
          <img
            src={images.desk}
            alt="A consultant with a laptop and notebook at a walnut meeting table."
            width={960}
            height={640}
          />
          <figcaption>{careersPage.photoCaption}</figcaption>
        </figure>
      </header>

      <section className="wrap section-tight" aria-labelledby="process-title">
        <h2 className="h2" id="process-title">
          How we hire, step by step
        </h2>
        <ol className="process">
          {careersPage.process.map((s) => (
            <li key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap section" aria-labelledby="roles-title">
        <div className="split">
          <h2 className="h2" id="roles-title">
            Open roles
          </h2>
          <div className="filters filters-compact">
            <fieldset className="segmented">
              <legend>Track</legend>
              <div>
                {tracks.map((t) => (
                  <button
                    key={t}
                    type="button"
                    aria-pressed={track === t}
                    onClick={() => setTrack(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="field-inline">
              <label htmlFor="office">Office</label>
              <select
                id="office"
                value={office}
                onChange={(e) => setOffice(e.target.value)}
              >
                <option value="">All offices</option>
                {offices.map((o) => (
                  <option key={o.city}>{o.city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <p className="results-count" aria-live="polite">
          <span className="num">{shown.length}</span>{" "}
          {shown.length === 1 ? "role" : "roles"} open
        </p>

        {shown.length ? (
          <ul className="roles">
            {shown.map((r) => (
              <li key={r.id}>
                <details>
                  <summary>
                    <span className="role-title">{r.title}</span>
                    <span className="role-office">{r.office}</span>
                    <span className="role-salary num">{r.salary}</span>
                  </summary>
                  <div className="role-body">
                    <p className="role-summary">{r.summary}</p>
                    <div>
                      <h3 className="h4">What you will do</h3>
                      <ul className="ruled-list">
                        {r.duties.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="h4">What we look for</h3>
                      <ul className="ruled-list">
                        {r.requirements.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <a
                      className="btn btn-primary"
                      href={`mailto:${brand.careersEmail}?subject=${encodeURIComponent(`Application: ${r.title}, ${r.office}`)}`}
                    >
                      Apply for this role
                    </a>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No {track === "All" ? "" : track.toLowerCase() + " "}roles open in{" "}
              {office || "any office"} right now. Send a CV anyway; we keep it
              for twelve months.
            </p>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => {
                setTrack("All");
                setOffice("");
              }}
            >
              Show all roles
            </button>
          </div>
        )}
      </section>

      <section className="wrap section benefits">
        <figure className="photo">
          <img
            src={images.standup}
            alt="A facilitator in a mustard sweater leads a standing discussion beside a board of sticky notes."
            width={960}
            height={640}
            loading="lazy"
          />
        </figure>
        <div>
          <h2 className="h2">What we offer, in writing</h2>
          <ul className="ruled-list">
            {careersPage.benefits.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section faq" aria-labelledby="faq-title">
        <h2 className="h2" id="faq-title">
          Questions candidates ask
        </h2>
        <div>
          {careersPage.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <p className="muted">
            Anything else:{" "}
            <a href={`mailto:${brand.careersEmail}`}>{brand.careersEmail}</a>
          </p>
        </div>
      </section>
    </>
  );
}
