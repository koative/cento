import { useState } from "react";
import { brand, clinicians, states } from "../content";
import { ClinicianCard } from "../components/ClinicianCard";

const languages = [...new Set(clinicians.flatMap((c) => c.languages))].sort();
const licensed = [...new Set(clinicians.flatMap((c) => c.states))].sort();

export function Clinicians() {
  const [state, setState] = useState("");
  const [language, setLanguage] = useState("");
  const list = clinicians.filter(
    (c) =>
      (!state || c.states.includes(state)) &&
      (!language || c.languages.includes(language)),
  );

  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Clinicians</h1>
          <p className="lede">
            Physicians, nurse practitioners, physician assistants and therapists
            — all board certified or licensed, most with years in urgent care,
            family practice or the ER before Vital. Here are six of the 140 who
            see patients this week.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="wrap">
          <div className="filters filter-row">
            <label className="sort">
              Licensed in
              <select value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Any state</option>
                {licensed.map((s) => (
                  <option key={s} value={s}>
                    {states[s] ?? s}
                  </option>
                ))}
              </select>
            </label>
            <label className="sort">
              Speaks
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="">Any language</option>
                {languages.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </label>
            <p className="result-count" aria-live="polite">
              {list.length} {list.length === 1 ? "clinician" : "clinicians"}
            </p>
          </div>

          {list.length ? (
            <ul className="clin-grid clin-grid-3">
              {list.map((c, i) => (
                <ClinicianCard key={c.slug} c={c} lazy={i > 2} />
              ))}
            </ul>
          ) : (
            <div className="empty">
              <p>
                None of these six match both filters, but other Vital clinicians
                may. The check-in always matches you with someone licensed where
                you are.
              </p>
              <button
                type="button"
                className="btn btn-quiet"
                onClick={() => {
                  setState("");
                  setLanguage("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="section band">
        <div className="wrap split">
          <h2>How we choose clinicians</h2>
          <div>
            <p>
              Every clinician has at least three years of in-person practice
              before joining, passes a structured video-visit review with our
              medical director, and has a sample of visits peer-reviewed every
              month.
            </p>
            <p>
              Clinicians are employees of Vital Health PC with salaried shifts,
              not paid per visit — so nobody is rushing you to free up the
              queue. Interested in joining? Write to{" "}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
