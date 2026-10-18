import { useState } from "react";
import { Droplets, Phone, Zap } from "lucide-react";
import { Link } from "../router";
import { brand, emergency, rates } from "../content";
import { money } from "../lib/format";
import { officeOpen } from "../lib/hours";
import { Faq } from "../components/Faq";

export function Emergency() {
  const [pick, setPick] = useState("");
  const now = new Date();
  const open = officeOpen(now);
  const time = now.toLocaleString("en-US", {
    weekday: "long",
    hour: "numeric",
    minute: "2-digit",
  });
  const case_ = emergency.triage.find((t) => t.id === pick);
  const verdict =
    case_ &&
    emergency.verdicts[case_.verdict as keyof typeof emergency.verdicts];

  return (
    <>
      <section className="sos sos-hero band">
        <div className="wrap sos-grid">
          <div>
            <h1>Water or sparks that won't wait?</h1>
            <p className="lede">{emergency.lede}</p>
            <p className="sos-status">
              <span
                className="sos-dot"
                data-open={open ? "" : undefined}
                aria-hidden="true"
              />
              {time} —{" "}
              {open
                ? "office hours. Emergency calls go to the next free van at standard rates."
                : `after hours. The ${money(rates.emergency)} emergency dispatch applies; the on-call van is ready.`}
            </p>
          </div>
          <div className="sos-call">
            <a href={brand.emergencyHref} className="sos-tel">
              <Phone aria-hidden="true" />
              {brand.emergency}
            </a>
            <p>
              A person answers, day or night. Calls cost nothing; you only pay
              if a van comes.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap triage" aria-labelledby="triage-h">
        <div className="triage-copy">
          <h2 id="triage-h">Is it an emergency?</h2>
          <p>
            Pick the closest match. If none fits and you're worried, call — we'd
            rather talk you out of a van than miss a flood.
          </p>
        </div>
        <fieldset className="triage-options">
          <legend className="sr-only">What is happening?</legend>
          {emergency.triage.map((t) => (
            <label key={t.id} className="choice">
              <input
                type="radio"
                name="triage"
                value={t.id}
                checked={pick === t.id}
                onChange={() => setPick(t.id)}
              />
              <span className="choice-body">
                <b>{t.label}</b>
              </span>
            </label>
          ))}
        </fieldset>
        <div
          className="triage-verdict"
          data-verdict={case_?.verdict}
          aria-live="polite"
        >
          {case_ && verdict ? (
            <>
              <p className="verdict-label">{verdict.label}</p>
              <p>{case_.why}</p>
              <p className="fine">{verdict.detail}</p>
              {case_.verdict === "now" ? (
                <a href={brand.emergencyHref} className="btn btn-live">
                  <Phone aria-hidden="true" /> Call {brand.emergency}
                </a>
              ) : (
                <Link to="/book" className="btn btn-ink">
                  Book a visit
                </Link>
              )}
            </>
          ) : (
            <p className="verdict-empty">
              Pick the closest match and we'll tell you straight: call now, book
              for tomorrow, or book any open window.
            </p>
          )}
        </div>
      </section>

      <section className="wrap before" aria-labelledby="before-h">
        <h2 id="before-h">While you wait for the van</h2>
        <div className="before-cols">
          <div data-trade="plumbing">
            <h3>
              <Droplets aria-hidden="true" /> Water
            </h3>
            <ol className="steps">
              {emergency.water.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
          <div data-trade="electrical">
            <h3>
              <Zap aria-hidden="true" /> Power
            </h3>
            <ol className="steps">
              {emergency.power.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="wrap svc-faq" aria-labelledby="em-faq-h">
        <h2 id="em-faq-h">Emergency calls, plainly</h2>
        <Faq items={emergency.faq} />
        <p className="svc-faq-more">
          Arrival targets for your street are on the{" "}
          <Link to="/areas">service areas map</Link>.
        </p>
      </section>
    </>
  );
}
