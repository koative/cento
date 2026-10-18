import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import { Link } from "../router";
import {
  clinicians,
  conditions,
  plans,
  visitTypes,
  type Condition,
} from "../content";
import { money } from "../lib/care";
import { ClinicianCard } from "../components/ClinicianCard";
import { ConditionRow, visitIcon } from "../components/ConditionRow";
import { Faq } from "../components/Faq";

export function ConditionPage({ condition: c }: { condition: Condition }) {
  const team = clinicians
    .filter((x) => x.conditions.includes(c.slug))
    .slice(0, 3);
  const related = [
    ...conditions.filter((x) => x.slug !== c.slug && x.category === c.category),
    ...conditions.filter((x) => x.category !== c.category),
  ].slice(0, 3);
  const plus = plans.find((p) => p.featured)!;
  const checkIn = `/check-in?reason=${c.slug}`;

  return (
    <>
      <section className="page-head cond-head">
        <div className="wrap cond-head-grid">
          <div>
            <nav aria-label="Breadcrumb" className="crumbs">
              <Link to="/conditions">Conditions</Link>{" "}
              <span aria-hidden="true">/</span> <span>{c.category}</span>
            </nav>
            <h1>{c.name}</h1>
            <p className="lede">{c.summary}</p>
            <ul className="symptom-chips" aria-label="Common symptoms">
              {c.symptoms.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <aside className="visit-card" aria-label="Visit and price">
            <p className="visit-price">
              <span className="num">{money(c.price)}</span> self-pay
            </p>
            <p className="visit-sub num">
              {c.visitTypes[0] === "message"
                ? `Included with ${plus.name}`
                : `${money(plus.visit)} on ${plus.name}`}{" "}
              · often $0–$30 with insurance
            </p>
            <ul className="visit-types">
              {c.visitTypes.map((t) => {
                const Icon = visitIcon[t];
                return (
                  <li key={t}>
                    <Icon aria-hidden="true" />
                    <span>
                      <strong>{visitTypes[t].label}</strong>{" "}
                      {visitTypes[t].text}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="visit-time">
              {c.minutes
                ? `Typical visit: ${c.minutes} minutes`
                : "Reviewed by a clinician, usually within the hour"}
            </p>
            <Link to={checkIn} className="btn btn-primary btn-block">
              Start a check-in <ArrowRight aria-hidden="true" />
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="treat-yes">
            <h2>What we can treat</h2>
            <ul className="check-list">
              {c.weTreat.map((t) => (
                <li key={t}>
                  <Check aria-hidden="true" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="treat-no">
            <h2>
              <TriangleAlert aria-hidden="true" /> Go in person if
            </h2>
            <ul>
              {c.goInPerson.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>
              Our check-in asks about these first. If any apply, it will point
              you to urgent care or 911 instead of a video visit.
            </p>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="wrap split">
          <div>
            <h2>What the visit looks like</h2>
            <ol className="visit-steps">
              {c.visit.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ol>
          </div>
          <div>
            <h2>Often prescribed</h2>
            <ul className="rx-list">
              {c.treatments.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="footnote">
              Illustrative only. Your clinician decides what, if anything, is
              right for you; we never promise a prescription.
            </p>
          </div>
        </div>
      </section>

      {team.length > 0 && (
        <section className="section">
          <div className="wrap">
            <h2>Clinicians who often see this</h2>
            <ul className="clin-grid clin-grid-3">
              {team.map((x) => (
                <ClinicianCard key={x.slug} c={x} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap faq-grid">
          <h2>Questions about {c.name.toLowerCase()}</h2>
          <Faq items={c.faq} />
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <h2>Related conditions</h2>
          <ul className="cond-list">
            {related.map((r) => (
              <ConditionRow key={r.slug} c={r} />
            ))}
          </ul>
        </div>
      </section>

      <section className="close">
        <div className="wrap close-grid">
          <div>
            <h2>Ready when you are</h2>
            <p>
              Check in for {c.name.toLowerCase()} in about four minutes. You
              only pay once a clinician accepts the visit.
            </p>
          </div>
          <Link to={checkIn} className="btn btn-light btn-lg">
            Start a check-in <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
