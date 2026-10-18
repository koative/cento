import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { clinicians, conditions, states, type Clinician } from "../content";
import { ClinicianCard } from "../components/ClinicianCard";

export function ClinicianPage({ clinician: c }: { clinician: Clinician }) {
  const [slot, setSlot] = useState("");
  const sees = conditions.filter((x) => c.conditions.includes(x.slug));
  const others = clinicians.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <section className="page-head">
        <div className="wrap profile">
          <img
            className="profile-photo"
            src={c.photo}
            alt={`Portrait of ${c.name}`}
            width={600}
            height={720}
            style={{ objectPosition: c.focus }}
          />
          <div>
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link to="/clinicians">Clinicians</Link>{" "}
              <span aria-hidden="true">/</span> <span>{c.role}</span>
            </nav>
            <h1>
              {c.name}, {c.credentials}
            </h1>
            <p className="profile-role">{c.role}</p>
            <blockquote className="profile-quote">
              <p>“{c.approach}”</p>
            </blockquote>
            <dl className="facts">
              <div>
                <dt>Licensed in</dt>
                <dd>{c.states.map((s) => states[s] ?? s).join(", ")}</dd>
              </div>
              <div>
                <dt>Languages</dt>
                <dd>{c.languages.join(", ")}</dd>
              </div>
              <div>
                <dt>With Vital since</dt>
                <dd className="num">{c.since}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Background</h2>
            <p>{c.bio}</p>
            <h3>Training & certification</h3>
            <ul className="plain-list">
              {c.training.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div className="slots">
            <h2>Open times</h2>
            <p className="step-hint">
              Times shown in your time zone. Choosing one carries it into the
              check-in.
            </p>
            {c.slots.map((d) => (
              <div
                key={d.day}
                className="slot-day"
                role="group"
                aria-label={d.day}
              >
                <h3>{d.day}</h3>
                <div className="chips">
                  {d.times.map((t) => {
                    const id = `${d.day} ${t}`;
                    return (
                      <button
                        key={t}
                        type="button"
                        className="chip num"
                        aria-pressed={slot === id}
                        onClick={() => setSlot(id)}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <p className="slot-picked" aria-live="polite">
              {slot ? `Holding ${slot} with ${c.name} for 10 minutes.` : ""}
            </p>
            <Link
              to={`/check-in?reason=${c.conditions[0]}`}
              className="btn btn-primary btn-block"
            >
              {slot ? "Continue to check-in" : "Check in to book"}{" "}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <h2>Often sees</h2>
          <ul className="sees">
            {sees.map((x) => (
              <li key={x.slug}>
                <Link to={`/conditions/${x.slug}`}>{x.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Other clinicians</h2>
          <ul className="clin-grid clin-grid-3">
            {others.map((x) => (
              <ClinicianCard key={x.slug} c={x} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
