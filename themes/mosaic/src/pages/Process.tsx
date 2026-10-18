import { useState } from "react";
import { Link } from "../router";
import { scales, stages, type Scale } from "../content";

export function Process() {
  const [scale, setScale] = useState<Scale>("home");
  const total = stages[stages.length - 1].weeks[scale][1];
  const step = total > 30 ? 8 : 2;
  const ticks = Array.from(
    { length: Math.floor(total / step) + 1 },
    (_, i) => i * step,
  );

  return (
    <>
      <header className="page-head">
        <h1>How a project runs</h1>
        <p className="lede">
          Six stages, the same for a bathroom or a hotel. What changes is how
          long each one takes — choose a project size to see a typical
          programme.
        </p>
      </header>

      <section className="section gantt-section" aria-labelledby="programme">
        <div className="section-head">
          <h2 id="programme">Typical programme</h2>
          <div className="segmented" role="group" aria-label="Project size">
            {scales.map((s) => (
              <button
                key={s.id}
                type="button"
                aria-pressed={scale === s.id}
                onClick={() => setScale(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <p className="gantt-total" aria-live="polite">
          About <strong className="tabular">{total} weeks</strong> from first
          visit to the last lamp.
        </p>
        <div className="gantt" style={{ ["--total" as string]: total }}>
          <ol>
            {stages.map((s, i) => {
              const [from, to] = s.weeks[scale];
              return (
                <li key={s.name}>
                  <span className="gantt-name">
                    <span className="tabular">{i + 1}</span> {s.name}
                  </span>
                  <span className="gantt-track">
                    <span
                      className="gantt-bar"
                      style={{
                        left: `${(from / total) * 100}%`,
                        width: `${((to - from) / total) * 100}%`,
                      }}
                    >
                      <span className="tabular">
                        wk {from}–{to}
                      </span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ol>
          <div className="gantt-axis" aria-hidden="true">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${(t / total) * 100}%` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Stage by stage</h2>
        <ol className="stages">
          {stages.map((s, i) => (
            <li key={s.name}>
              <span className="stage-num tabular" aria-hidden="true">
                {i + 1}
              </span>
              <div>
                <h3>{s.name}</h3>
                <p>{s.summary}</p>
              </div>
              <dl>
                <div>
                  <dt>Your part</dt>
                  <dd>{s.you}</dd>
                </div>
                <div>
                  <dt>You receive</dt>
                  <dd>{s.we.join(" · ")}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      <section className="close close-quiet">
        <h2>Stage one is a conversation.</h2>
        <p>
          Ninety minutes at the library, free, with a designer and a table of
          samples.
        </p>
        <Link to="/consultation" className="btn">
          Book a consultation
        </Link>
      </section>
    </>
  );
}
