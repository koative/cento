import { ArrowRight, Ban, Lock } from "lucide-react";
import { Link } from "../router";
import {
  cannotDo,
  howFaq,
  scenes,
  steps,
  visitTypes,
  type VisitType,
} from "../content";
import { WaitBoard } from "../components/Wait";
import { Slip } from "../components/Slip";
import { Faq } from "../components/Faq";
import { visitIcon } from "../components/ConditionRow";

export function HowItWorks() {
  return (
    <>
      <section className="page-head">
        <div className="wrap page-head-split">
          <div>
            <h1>How a Vital visit works</h1>
            <p className="lede">
              No account until the end, no waiting room, no charge until a
              clinician accepts. Here is what happens between the first tap and
              the pharmacy counter.
            </p>
          </div>
          <WaitBoard />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ol className="how-steps">
            {steps.map((s, i) => (
              <li key={s.time}>
                <div className="how-step-copy">
                  <span className="timeline-time num">{s.time}</span>
                  <h2>{s.title}</h2>
                  <p>{s.text}</p>
                </div>
                <div className="how-step-visual">
                  {i === 0 && (
                    <Slip
                      code="VT-51907"
                      rows={[
                        { label: "For", value: "My child, 6" },
                        { label: "Reason", value: "Ear pain in kids" },
                        { label: "Red flags", value: "None reported" },
                        { label: "Since", value: "1–3 days" },
                        { label: "Severity", value: "6 of 10" },
                      ]}
                    />
                  )}
                  {i === 1 && (
                    <img
                      className="photo"
                      src={scenes.clinicianPhone}
                      alt="A clinician reading a check-in slip on a phone"
                      width={1800}
                      height={1200}
                      loading="lazy"
                    />
                  )}
                  {i === 2 && (
                    <img
                      className="photo"
                      src={scenes.patientLaptop}
                      alt="A patient on a video visit from a café table"
                      width={1800}
                      height={1200}
                      loading="lazy"
                    />
                  )}
                  {i === 3 && (
                    <img
                      className="photo"
                      src={scenes.pharmacist}
                      alt="A pharmacist taking a box from the shelf behind the counter"
                      width={1800}
                      height={1200}
                      loading="lazy"
                    />
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section band">
        <div className="wrap">
          <h2>Three ways to be seen</h2>
          <dl className="visit-compare">
            {(Object.keys(visitTypes) as VisitType[]).map((t) => {
              const Icon = visitIcon[t];
              return (
                <div key={t}>
                  <dt>
                    <Icon aria-hidden="true" /> {visitTypes[t].label}
                  </dt>
                  <dd>{visitTypes[t].text}</dd>
                  <dd className="visit-compare-best">
                    {t === "video" &&
                      "Best for: anything you would show a doctor — throats, ears, breathing, kids."}
                    {t === "message" &&
                      "Best for: UTIs, pink eye, rashes, refills — things a photo and good questions can settle."}
                    {t === "scheduled" &&
                      "Best for: mental health, blood pressure, acne plans and any follow-up."}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div>
            <h2>Labs, tests and the pharmacy</h2>
            <p>
              When a visit needs a number — a strep swab, a urine culture,
              kidney function — your clinician orders it at one of 2,300 partner
              lab sites, often for the same day. Results land in your chart with
              a plain-English note, not just a reference range.
            </p>
            <p>
              Prescriptions go to the pharmacy you choose. If you would rather
              not go out, our delivery partner brings it the next day in plain
              packaging.
            </p>
          </div>
          <img
            className="photo"
            src={scenes.bloodPressure}
            alt="A clinician taking a patient's blood pressure with an automatic cuff"
            width={1800}
            height={1200}
            loading="lazy"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <div className="cannot">
            <h2>
              <Ban aria-hidden="true" /> What we do not do
            </h2>
            <ul>
              {cannotDo.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="privacy">
            <h2>
              <Lock aria-hidden="true" /> Privacy, plainly
            </h2>
            <p>
              Your visit is a medical record, kept to HIPAA standards and
              encrypted end to end. We never sell health data and never use it
              for advertising. You can download or delete your chart from the
              app at any time.
            </p>
            <Link to="/about" className="text-link">
              Our clinical standards <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap faq-grid">
          <h2>Common questions</h2>
          <Faq items={howFaq} />
        </div>
      </section>

      <section className="close">
        <div className="wrap close-grid">
          <div>
            <h2>Try the check-in</h2>
            <p>
              Six steps, about four minutes, and a clear answer about where to
              be seen.
            </p>
          </div>
          <Link to="/check-in" className="btn btn-light btn-lg">
            Start a check-in <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
