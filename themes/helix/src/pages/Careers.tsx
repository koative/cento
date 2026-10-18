import { useState } from "react";
import { brand, careers, imageAlt, images, team } from "../content";
import { PageHead } from "../components/PageHead";

export default function Careers() {
  const [group, setGroup] = useState("All");
  const shown = careers.openings.filter(
    (o) => group === "All" || o.group === group,
  );
  const groups = [
    "All",
    ...team.groups.filter((g) => careers.openings.some((o) => o.group === g)),
  ];

  return (
    <>
      <PageHead title={careers.heading} lead={careers.lead} />

      <section className="wrap" aria-labelledby="open-h">
        <div className="plans-bar">
          <h2 id="open-h">Open roles</h2>
          <fieldset className="segmented wrap-ok">
            <legend className="visually-hidden">Team</legend>
            {groups.map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="group"
                  checked={group === g}
                  onChange={() => setGroup(g)}
                />
                <span>{g}</span>
              </label>
            ))}
          </fieldset>
          <p className="list-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "role" : "roles"}
          </p>
        </div>
        <ul className="openings">
          {shown.map((o) => (
            <li key={o.slug}>
              <details>
                <summary>
                  <span className="opening-title">{o.title}</span>
                  <span className="opening-meta">
                    {o.group} · {o.location}
                  </span>
                  <span className="opening-pay">{o.type}</span>
                </summary>
                <div className="opening-body">
                  <p>{o.summary}</p>
                  <div className="opening-cols">
                    <div>
                      <h3>You will</h3>
                      <ul className="ticks">
                        {o.duties.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3>You bring</h3>
                      <ul className="ticks">
                        {o.needs.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <a
                    className="btn btn-primary"
                    href={`mailto:${brand.careers}?subject=${encodeURIComponent(o.title)}`}
                  >
                    Apply by email
                  </a>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section className="section wrap careers-split" aria-labelledby="hire-h">
        <div>
          <h2 id="hire-h">How we hire</h2>
          <ol className="process">
            {careers.process.map((p) => (
              <li key={p.step}>
                <h3>{p.step}</h3>
                <p>{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <h2>What you get</h2>
          <ul className="ticks">
            {careers.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <figure className="careers-photo">
            <img
              src={images.electronics}
              alt={imageAlt.electronics}
              loading="lazy"
              width={1600}
              height={1100}
            />
          </figure>
        </div>
      </section>
    </>
  );
}
