import { useState } from "react";
import { clinicians, locations } from "../content";
import { ClinicianBadge } from "../components/ClinicianBadge";

const languages = [...new Set(clinicians.flatMap((c) => c.languages))].sort();

export function Clinicians() {
  const [where, setWhere] = useState("");
  const [language, setLanguage] = useState("");
  const [accepting, setAccepting] = useState(false);
  const shown = clinicians.filter(
    (c) =>
      (!where || where in c.schedule) &&
      (!language || c.languages.includes(language)) &&
      (!accepting || c.accepting),
  );

  return (
    <>
      <header className="page-head">
        <h1>Our clinicians</h1>
        <p className="lede">
          Four doctors, a paediatric nurse practitioner, a midwife, a counsellor
          and a practice nurse. When you register you choose one, and they stay
          yours.
        </p>
      </header>

      <div className="filters">
        <div className="seg" role="radiogroup" aria-label="Clinic">
          {[{ slug: "", name: "All clinics" }, ...locations].map((l) => (
            <label key={l.slug} className="seg-item">
              <input
                type="radio"
                name="where"
                checked={where === l.slug}
                onChange={() => setWhere(l.slug)}
              />
              {l.name}
            </label>
          ))}
        </div>
        <div className="filter-inline">
          <label htmlFor="lang">Speaks</label>
          <select
            id="lang"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="">Any language</option>
            {languages.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <label className="check">
          <input
            type="checkbox"
            checked={accepting}
            onChange={(e) => setAccepting(e.target.checked)}
          />
          <span>Accepting new patients</span>
        </label>
      </div>
      <p className="result-count" aria-live="polite">
        {shown.length} {shown.length === 1 ? "clinician" : "clinicians"}
      </p>

      {shown.length ? (
        <div className="badge-grid">
          {shown.map((c) => (
            <ClinicianBadge key={c.slug} clinician={c} headingLevel={2} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <p>
            No one matches all three filters. Every clinic can book a free phone
            interpreter in any language.
          </p>
          <button
            type="button"
            className="btn btn-quiet"
            onClick={() => {
              setWhere("");
              setLanguage("");
              setAccepting(false);
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
