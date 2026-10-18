import { useState } from "react";
import { Camera, Clock, Phone, ShieldCheck } from "lucide-react";
import { Link } from "../router";
import { brand, claimsPage, incidents } from "../content";

export function Claims() {
  const [id, setId] = useState(incidents[0].id);
  const incident = incidents.find((i) => i.id === id)!;

  return (
    <>
      <section className="wrap claims-hero">
        <div>
          <h1>{claimsPage.title}</h1>
          <p className="lede">{claimsPage.text}</p>
          <div className="claims-call">
            <a href={brand.claimsPhoneHref} className="btn btn-primary">
              <Phone aria-hidden="true" size={18} /> Call {brand.claimsPhone}
            </a>
            <p>
              Open 24 hours, every day. Or email{" "}
              <a href={`mailto:${brand.claimsEmail}`}>{brand.claimsEmail}</a>{" "}
              with your policy number.
            </p>
          </div>
        </div>
        <img
          src={claimsPage.image}
          alt={claimsPage.imageAlt}
          width={1300}
          height={867}
        />
      </section>

      <section className="band triage" aria-labelledby="triage-h">
        <div className="wrap">
          <h2 id="triage-h">What happened?</h2>
          <div
            className="chips chips-large"
            role="group"
            aria-label="Kind of incident"
          >
            {incidents.map((i) => (
              <button
                key={i.id}
                type="button"
                aria-pressed={i.id === id}
                onClick={() => setId(i.id)}
              >
                {i.label}
              </button>
            ))}
          </div>

          <div className="triage-sheet" key={id} aria-live="polite">
            <div className="triage-col">
              <h3>In the next hour</h3>
              <ol>
                {incident.now.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="triage-col">
              <h3>Within two days</h3>
              <ol>
                {incident.soon.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="triage-col triage-side">
              <h3>
                <Camera aria-hidden="true" size={18} /> Photograph
              </h3>
              <ul>
                {incident.photograph.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <h3>
                <Clock aria-hidden="true" size={18} /> Typically
              </h3>
              <p>{incident.typical}</p>
            </div>
            <p className="triage-covered">
              <ShieldCheck aria-hidden="true" size={20} />
              <span>
                <strong>Is it covered?</strong> {incident.covered}
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap process" aria-labelledby="process-h">
        <h2 id="process-h">From your first call to payment</h2>
        <ol className="timeline">
          {claimsPage.process.map((p) => (
            <li key={p.title}>
              <span className="timeline-time">{p.time}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap promise" aria-labelledby="promise-h">
        <h2 id="promise-h">Our claims promise</h2>
        <dl className="promise-list">
          {claimsPage.promise.map((p) => (
            <div key={p.title}>
              <dt>{p.title}</dt>
              <dd>{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section
        className="wrap close close-tight"
        aria-labelledby="claims-close-h"
      >
        <h2 id="claims-close-h">Not sure if you should claim?</h2>
        <p>
          Call and ask. A question about cover is never recorded as a claim, and
          won't change your price. For deductibles and appeals, see{" "}
          <Link to="/help/what-to-expect-from-an-adjuster">
            what to expect from an adjuster
          </Link>{" "}
          and{" "}
          <Link to="/help/claim-declined-appeal">if a claim is declined</Link>.
        </p>
      </section>
    </>
  );
}
