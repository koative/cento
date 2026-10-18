import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { features } from "../content";

export default function Features() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{features.heading}</h1>
        <p className="lede">{features.lede}</p>
        <div className="jump" role="group" aria-label="Jump to a feature">
          {features.sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className="chip"
              onClick={() =>
                document
                  .getElementById(s.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {s.title}
            </button>
          ))}
        </div>
      </header>

      <div className="wrap feature-rows">
        {features.sections.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="feature-row"
            aria-labelledby={`${s.id}-h`}
          >
            <h2 id={`${s.id}-h`}>{s.title}</h2>
            <p>{s.text}</p>
            <ul className="tick-list">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <section className="band band-plum" aria-labelledby="flow-h">
        <div className="wrap">
          <h2 id="flow-h">{features.numbers.heading}</h2>
          <ol className="flow">
            {features.numbers.rows.map((r) => (
              <li key={r.label}>
                <strong>{r.label}</strong>
                <span>{r.value}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="close wrap" aria-labelledby="f-close">
        <h2 id="f-close">See all of it with sample money</h2>
        <p>
          The demo workspace has six accounts, twelve envelopes and a month of
          transactions. Change anything; it resets on reload.
        </p>
        <div className="actions">
          <Link to="/app" className="btn btn-primary btn-large">
            Open the demo <ArrowRight size={18} aria-hidden />
          </Link>
          <Link to="/pricing" className="btn btn-quiet btn-large">
            See pricing
          </Link>
        </div>
      </section>
    </>
  );
}
