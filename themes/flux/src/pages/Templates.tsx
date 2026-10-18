import { useState } from "react";
import { Link } from "../router";
import { connectors, teams, templates } from "../content";
import { TemplateTile } from "../components/StepList";

export default function Templates() {
  const [team, setTeam] = useState("All");
  const [app, setApp] = useState("");
  const used = connectors.filter((c) =>
    templates.some((t) => t.steps.some((s) => s.app === c.slug)),
  );
  const shown = templates.filter(
    (t) =>
      (team === "All" || t.team === team) &&
      (!app || t.steps.some((s) => s.app === app)),
  );

  return (
    <>
      <header className="page-head wrap">
        <h1>Templates</h1>
        <p className="lede">
          Workflows other teams run every day, written out step by step. Open
          one, run it on a sample, and switch it on when it does what you
          expect.
        </p>
      </header>
      <section className="wrap directory" aria-label="Template gallery">
        <div className="filters">
          <div className="chips" role="group" aria-label="Team">
            {["All", ...teams].map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={team === t}
                onClick={() => setTeam(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <label className="sort">
            Uses app
            <select value={app} onChange={(e) => setApp(e.target.value)}>
              <option value="">Any app</option>
              {used.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="result-count" aria-live="polite">
          {shown.length === 1 ? "1 template" : `${shown.length} templates`}
        </p>
        {shown.length ? (
          <ul className="template-row template-grid">
            {shown.map((t) => (
              <TemplateTile key={t.slug} t={t} detailed />
            ))}
          </ul>
        ) : (
          <div className="empty">
            <p>
              No template for that team uses this app yet. Start from a blank
              workflow in the demo instead.
            </p>
            <button
              type="button"
              className="btn btn-line"
              onClick={() => {
                setTeam("All");
                setApp("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  );
}
