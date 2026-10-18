import { useState } from "react";
import {
  brand,
  days,
  hours,
  hoursNote,
  images,
  visit,
  visitFaq,
} from "../content";
import { Link } from "../router";
import { openStatus } from "../lib/format";

export function Visit() {
  const today = new Date().getDay();
  const weekend = today === 0 || today === 6;
  const [mode, setMode] = useState<"weekday" | "weekend">(
    weekend ? "weekend" : "weekday",
  );
  const status = openStatus();
  const bars = visit.busyness[mode];
  const first = Number(hours[mode === "weekend" ? 0 : 1][0].slice(0, 2));
  const peak = Math.max(...bars);

  return (
    <>
      <section className="page-head wrap">
        <h1>{visit.title}</h1>
        <p className="lead">{visit.lead}</p>
      </section>

      <section className="wrap visit-grid">
        <div>
          <h2 className="h-sm">Opening hours</h2>
          <p className="status-pill" data-open={status.open ? "" : undefined}>
            {status.label}
          </p>
          <table className="hours-table">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {[1, 2, 3, 4, 5, 6, 0].map((d) => (
                <tr key={d} data-today={d === today ? "" : undefined}>
                  <th scope="row">{days[d]}</th>
                  <td className="num">
                    {hours[d][0]}–{hours[d][1]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">{hoursNote}</p>
        </div>

        <div>
          <h2 className="h-sm">How busy is it?</h2>
          <div className="seg" role="group" aria-label="Day type">
            <button
              type="button"
              aria-pressed={mode === "weekday"}
              onClick={() => setMode("weekday")}
            >
              Weekdays
            </button>
            <button
              type="button"
              aria-pressed={mode === "weekend"}
              onClick={() => setMode("weekend")}
            >
              Weekends
            </button>
          </div>
          <figure className="busy">
            <svg
              viewBox={`0 0 ${bars.length * 24} 130`}
              role="img"
              aria-label={`Typical ${mode} busyness by hour; busiest around ${first + bars.indexOf(peak)}:00.`}
            >
              {bars.map((b, i) => (
                <g key={i}>
                  <rect
                    x={i * 24 + 3}
                    y={110 - b}
                    width="18"
                    height={b}
                    rx="3"
                    data-peak={b === peak ? "" : undefined}
                  />
                  {i % 2 === 0 && (
                    <text x={i * 24 + 12} y="126" textAnchor="middle">
                      {first + i}
                    </text>
                  )}
                </g>
              ))}
            </svg>
            <figcaption>
              Typical climbers on the floor by hour. Quietest before 10:00 and
              after 21:00.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="wrap getting-here" aria-labelledby="gh-title">
        <img
          src={images.twoHolds}
          alt="Two holds, one blue and one orange, bolted to a textured grey wall"
          width={1024}
          height={768}
          loading="lazy"
        />
        <div>
          <h2 id="gh-title">Getting here</h2>
          <address>
            {brand.long}
            <br />
            {brand.street}, {brand.city}
          </address>
          <dl className="fac-list">
            {visit.transit.map((t) => (
              <div key={t.mode}>
                <dt>{t.mode}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
          <p>
            Questions? <a href={`mailto:${brand.email}`}>{brand.email}</a> or{" "}
            <a href={brand.phoneHref}>{brand.phone}</a>.
          </p>
        </div>
      </section>

      <section className="band-dark" aria-labelledby="rules-title">
        <div className="wrap rules">
          <h2 id="rules-title">House rules</h2>
          <ol>
            {visit.rules.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap faq" aria-labelledby="vfaq-title">
        <h2 id="vfaq-title">First visit questions</h2>
        {visitFaq.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
        <div className="actions">
          <Link to="/book" className="btn btn-tape">
            Book a day pass
          </Link>
          <Link to="/classes/first-moves" className="btn btn-line">
            Or start with First Moves
          </Link>
        </div>
      </section>
    </>
  );
}
