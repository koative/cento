import { MapPin, Phone, TriangleAlert } from "lucide-react";
import { Link } from "../router";
import { afterHours, brand, emergency } from "../content";
import { money, openStatus } from "../lib/format";

export function Emergency() {
  const status = openStatus();

  return (
    <>
      <section className="emergency-hero">
        <div className="wrap emergency-hero-grid">
          <div>
            <h1>{emergency.title}</h1>
            <p className="lede">{emergency.lede}</p>
          </div>
          <div className="call-card">
            <p className="call-label">Emergency line, 24 hours</p>
            <a href={brand.emergencyHref} className="call-number">
              <Phone aria-hidden="true" /> {brand.emergencyPhone}
            </a>
            <p className="call-where">
              {status.open ? (
                <>
                  <b>We're open now.</b> Come straight to 214 Alder Street — the
                  urgent bays are behind the building, off Birch Lane.
                </>
              ) : (
                <>
                  <b>We're closed right now.</b> The line rings through to{" "}
                  {afterHours.name}, {afterHours.address}.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="section wrap triage" aria-label="When to call">
        <div className="triage-col triage-now">
          <h2>
            <TriangleAlert aria-hidden="true" /> Call now, then come in
          </h2>
          <ul className="tick-list">
            {emergency.now.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
        <div className="triage-col">
          <h2>Call us today</h2>
          <ul className="tick-list">
            {emergency.today.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
          <p className="fine">
            We keep same-day slots free every morning and afternoon for these.
            Not sure which list you're on? Call anyway — that's what the line is
            for.
          </p>
        </div>
      </section>

      <section className="section wrap" aria-labelledby="h-way">
        <h2 id="h-way">On the way</h2>
        <ol className="steps steps-row">
          {emergency.steps.map((s) => (
            <li key={s.title}>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section wrap" aria-labelledby="h-toxins">
        <div className="section-head split">
          <h2 id="h-toxins">Common poisons at home</h2>
          <p>
            Note what was eaten, roughly how much, and when. Never make your pet
            sick unless a vet tells you to.
          </p>
        </div>
        <div
          className="table-scroll"
          tabIndex={0}
          role="region"
          aria-labelledby="h-toxins"
        >
          <table className="toxins">
            <thead>
              <tr>
                <th scope="col">Substance</th>
                <th scope="col">Dangerous for</th>
                <th scope="col">What to do</th>
              </tr>
            </thead>
            <tbody>
              {emergency.toxins.map((t) => (
                <tr key={t.item}>
                  <th scope="row">{t.item}</th>
                  <td>{t.who}</td>
                  <td>
                    <span
                      className="urgency"
                      data-now={t.urgency === "Call now" ? "" : undefined}
                    >
                      {t.urgency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section wrap emergency-foot">
        <div>
          <h2>After hours</h2>
          <p>{afterHours.note}</p>
          <p className="where">
            <MapPin aria-hidden="true" /> {afterHours.name} ·{" "}
            {afterHours.address}
          </p>
        </div>
        <div>
          <h2>What it costs</h2>
          <table className="price-table">
            <tbody>
              {emergency.fees.map((f) => (
                <tr key={f.item}>
                  <th scope="row">{f.item}</th>
                  <td className="num">{money(f.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fine">
            We'll never delay treatment over payment in a genuine emergency.
            Plan members get emergency consultations at 10% off. See{" "}
            <Link to="/plans">health plans</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
