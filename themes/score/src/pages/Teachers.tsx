import { useState } from "react";
import { Link } from "../router";
import { families, teachers, type Family } from "../content";
import { programmeBySlug } from "../lib/school";
import { Coda } from "../components/Bits";

export function Teachers() {
  const [family, setFamily] = useState<Family | "All">("All");
  const shown = teachers.filter(
    (t) =>
      family === "All" ||
      t.programmes.some((s) => programmeBySlug(s)?.family === family),
  );

  return (
    <div className="page">
      <header className="page-head wrap">
        <h1>Teachers</h1>
        <p className="lede">
          Ten working musicians who chose to teach. Between them they have
          taught here for more than a hundred years, and most of them still play
          in orchestras, bands and choirs around Larkhill.
        </p>
      </header>

      <div className="wrap filters">
        <fieldset className="chips">
          <legend>Department</legend>
          {(["All", ...families] as const).map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={family === f}
              onClick={() => setFamily(f)}
            >
              {f}
            </button>
          ))}
        </fieldset>
        <p className="result-count" aria-live="polite">
          {shown.length} {shown.length === 1 ? "teacher" : "teachers"}
        </p>
      </div>

      <ul className="wrap roster">
        {shown.map((t) => (
          <li key={t.slug} className="roster-entry">
            <h2>
              <Link to={`/teachers/${t.slug}`} className="stretched">
                {t.name}
              </Link>
            </h2>
            <p className="roster-role">
              {t.role} · at Score since {t.since}
            </p>
            <p>{t.short}</p>
            <p className="roster-teaches">
              {t.programmes.map((s) => programmeBySlug(s)?.name).join(" · ")}
            </p>
          </li>
        ))}
      </ul>

      <Coda
        title="Choose the teacher, not just the instrument."
        text="When you book a trial you'll see whose times are open. If you'd like a particular teacher, pick their slot — or tell us in the notes."
      />
    </div>
  );
}
