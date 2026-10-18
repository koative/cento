import { ArrowRight, TriangleAlert } from "lucide-react";
import { Link } from "../router";
import {
  categories,
  clinicians,
  conditions,
  home,
  homeFaq,
  insurers,
  notes,
  plans,
  redFlags,
  scenes,
  steps,
} from "../content";
import { money } from "../lib/care";
import { CallFrame } from "../components/CallFrame";
import { Slip } from "../components/Slip";
import { WaitBoard } from "../components/Wait";
import { Trace } from "../components/Mark";
import { ClinicianCard } from "../components/ClinicianCard";
import { Phone } from "../components/Phone";
import { Faq } from "../components/Faq";

export function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <h1>{home.title}</h1>
            <p className="lede">{home.lede}</p>
            <div className="actions">
              <Link to="/check-in" className="btn btn-primary btn-lg">
                Start a check-in <ArrowRight aria-hidden="true" />
              </Link>
              <Link to="/pricing" className="btn btn-quiet btn-lg">
                See prices
              </Link>
            </div>
            <WaitBoard />
          </div>
          <div className="hero-visual">
            <CallFrame clinician={clinicians[0]} />
            <Slip
              className="hero-slip"
              code="VT-48213"
              rows={[
                { label: "For", value: "Sam, 31" },
                { label: "Reason", value: "Sore throat" },
                { label: "Since", value: "3 days" },
                { label: "Severity", value: "5 of 10" },
                { label: "Allergies", value: "Penicillin" },
              ]}
            />
          </div>
        </div>
        <Trace beats={7} className="hero-trace" />
      </section>

      <section className="section treat">
        <div className="wrap">
          <div className="section-head">
            <h2>What we treat on video and by message</h2>
            <Link to="/conditions" className="text-link">
              All conditions and prices <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="treat-index">
            {categories.map((cat) => (
              <div key={cat} className="treat-col">
                <h3>{cat}</h3>
                <ul>
                  {conditions
                    .filter((c) => c.category === cat)
                    .map((c) => (
                      <li key={c.slug}>
                        <Link to={`/conditions/${c.slug}`}>
                          <span>{c.name}</span>
                          <span className="num">{money(c.price)}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section how-home">
        <div className="wrap how-home-grid">
          <div>
            <h2>
              From first symptom to pharmacy counter in about half an hour
            </h2>
            <ol className="timeline">
              {steps.map((s) => (
                <li key={s.time}>
                  <span className="timeline-time num">{s.time}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link to="/how-it-works" className="text-link">
              How a visit works, in detail <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <img
            className="photo how-home-photo"
            src={scenes.patientLaptop}
            alt="A man at a café table giving a thumbs up to a clinician on his laptop"
            width={1800}
            height={1200}
            loading="lazy"
          />
        </div>
      </section>

      <section className="stance">
        <div className="wrap stance-grid">
          <h2>{home.stance.title}</h2>
          <div>
            <p className="lede">{home.stance.text}</p>
            <p className="stance-flags-title">
              <TriangleAlert aria-hidden="true" /> Call 911 instead of checking
              in if you have:
            </p>
            <ul className="stance-flags">
              {redFlags.slice(0, 5).map((f) => (
                <li key={f.id}>{f.label}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="scene">
        <img
          src={scenes.clinicianPhone}
          alt="A clinician in a white coat with a stethoscope reading a patient's check-in on a phone"
          width={1800}
          height={1200}
          loading="lazy"
        />
        <div className="wrap scene-copy">
          <h2>{home.sceneTitle}</h2>
          <p>{home.sceneText}</p>
        </div>
      </section>

      <section className="section price-home">
        <div className="wrap">
          <div className="section-head">
            <h2>Prices you can read before you start</h2>
            <Link to="/pricing" className="text-link">
              Compare plans <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="price-strip">
            {plans.map((p) => (
              <Link
                key={p.id}
                to="/pricing"
                className="price-strip-item"
                data-featured={p.featured ? "" : undefined}
              >
                <span className="price-strip-name">{p.name}</span>
                <span className="price-strip-big num">
                  {p.monthly ? `${money(p.monthly)}/mo` : "No membership"}
                </span>
                <span>
                  Video visits <strong className="num">{money(p.visit)}</strong>{" "}
                  · Messages{" "}
                  <strong className="num">
                    {p.message ? money(p.message) : "included"}
                  </strong>
                </span>
                <span className="price-strip-pitch">{p.pitch}</span>
              </Link>
            ))}
          </div>
          <p className="insurers">
            <strong>In network with</strong> {insurers.slice(0, 6).join(" · ")}{" "}
            and more. Your copay is shown before the visit starts.
          </p>
        </div>
      </section>

      <section className="section clin-home">
        <div className="wrap">
          <div className="section-head">
            <h2>Clinicians who have worked the night shift</h2>
            <Link to="/clinicians" className="text-link">
              Meet all 6 featured clinicians <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="clin-grid clin-grid-4">
            {clinicians.slice(0, 4).map((c) => (
              <ClinicianCard key={c.slug} c={c} />
            ))}
          </ul>
        </div>
      </section>

      <section className="section app-home">
        <div className="wrap app-home-grid">
          <div className="app-home-phones">
            <Phone screen="home" />
            <Phone screen="rx" />
          </div>
          <div>
            <h2>The visit ends. The app keeps the plan.</h2>
            <p className="lede">
              Visit notes in plain English, prescription tracking from sent to
              ready, and home blood-pressure readings your clinician can
              actually see.
            </p>
            <Link to="/app" className="btn btn-quiet">
              Inside the Vital app
            </Link>
          </div>
        </div>
      </section>

      <section className="section notes">
        <div className="wrap">
          <h2>After-visit notes from patients</h2>
          <ul className="notes-list">
            {notes.map((n) => {
              const c = conditions.find((x) => x.slug === n.condition);
              return (
                <li key={n.who}>
                  <blockquote>
                    <p>“{n.quote}”</p>
                  </blockquote>
                  <p className="notes-who">
                    {n.who} ·{" "}
                    {c && <Link to={`/conditions/${c.slug}`}>{c.name}</Link>}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="footnote">
            Sample testimonials. Names and details are illustrative.
          </p>
        </div>
      </section>

      <section className="section faq-home">
        <div className="wrap faq-grid">
          <h2>Before your first visit</h2>
          <Faq items={homeFaq} />
        </div>
      </section>

      <section className="close">
        <div className="wrap close-grid">
          <div>
            <h2>{home.close.title}</h2>
            <p>{home.close.text}</p>
          </div>
          <Link to="/check-in" className="btn btn-light btn-lg">
            Start a check-in <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
