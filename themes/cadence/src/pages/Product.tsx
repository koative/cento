import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "../router";
import {
  competencies,
  home,
  jobs,
  product,
  weeklyApplicants,
} from "../content";
import { LoopTimeline } from "../components/Loop";
import { PipelinePreview, ScorecardSample } from "../components/Visuals";
import { BarChart } from "../components/Charts";
import { stepsFor } from "../lib/format";

const spread = [
  { id: "craft", scores: [4, 4, 3] },
  { id: "collaboration", scores: [3, 2, 4] },
  { id: "communication", scores: [3, 3, 3] },
];

const visuals: Record<string, ReactNode> = {
  jobs: (
    <LoopTimeline
      stepIds={stepsFor(jobs[0].competencies)}
      pace={jobs[0].pace}
      label={`Interview loop for ${jobs[0].title}`}
    />
  ),
  pipeline: <PipelinePreview />,
  kits: <ScorecardSample />,
  scorecards: (
    <figure
      className="spread"
      aria-label="Score spread per competency from three interviewers"
    >
      <ul>
        {spread.map((r) => (
          <li key={r.id}>
            <span>{competencies.find((c) => c.id === r.id)!.label}</span>
            <span className="spread-track" aria-hidden="true">
              {r.scores.map((s, i) => (
                <span
                  key={i}
                  className="spread-dot"
                  style={{ left: `${((s - 1) / 3) * 100}%` }}
                />
              ))}
            </span>
            <span className="spread-note">
              {new Set(r.scores).size === 1
                ? "Agreed"
                : Math.max(...r.scores) - Math.min(...r.scores) > 1
                  ? "Discuss first"
                  : "Close"}
            </span>
          </li>
        ))}
      </ul>
      <figcaption>
        Decision meeting opens on the widest spread: collaboration.
      </figcaption>
    </figure>
  ),
  messages: (
    <ol className="thread">
      {home.messages.timeline.slice(0, 3).map((m) => (
        <li key={m.when}>
          <span className="thread-meta">
            <span className="num">{m.when}</span> · {m.who}
          </span>
          <p>{m.text}</p>
        </li>
      ))}
    </ol>
  ),
  reports: (
    <BarChart
      data={weeklyApplicants}
      label="Applicants per week over the last twelve weeks, peaking at 45 in the week of September 21"
    />
  ),
};

export default function Product() {
  return (
    <>
      <section className="page-hero wrap">
        <h1>{product.hero.title}</h1>
        <p className="lede">{product.hero.lede}</p>
        <nav className="jump" aria-label="Modules on this page">
          {product.modules.map((m) => (
            <button
              key={m.id}
              type="button"
              className="chip"
              onClick={() =>
                document
                  .getElementById(`m-${m.id}`)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              {m.name}
            </button>
          ))}
        </nav>
      </section>

      {product.modules.map((m, i) => (
        <section
          key={m.id}
          id={`m-${m.id}`}
          className={`wrap section split module${i % 2 ? " split-reverse" : ""}`}
          aria-labelledby={`h-${m.id}`}
        >
          <div>
            <h2 id={`h-${m.id}`}>{m.title}</h2>
            <p>{m.body}</p>
            <ul className="ticks">
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <div className="module-visual">{visuals[m.id]}</div>
        </section>
      ))}

      <section className="band band-sunk" aria-labelledby="h-integrations">
        <div className="wrap section">
          <div className="section-head">
            <h2 id="h-integrations">{product.integrations.title}</h2>
            <p>{product.integrations.body}</p>
          </div>
          <dl className="ruled-list">
            {product.integrations.groups.map((g) => (
              <div key={g.name}>
                <dt>{g.name}</dt>
                <dd>{g.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="wrap section split" aria-labelledby="h-security">
        <h2 id="h-security">{product.security.title}</h2>
        <ul className="ticks">
          {product.security.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </section>

      <section className="close" aria-labelledby="h-close">
        <div className="wrap">
          <h2 id="h-close">{product.close.title}</h2>
          <p>{product.close.body}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-lg">
              Open the live demo <ArrowRight size={18} aria-hidden />
            </Link>
            <Link to="/pricing" className="btn btn-light btn-lg">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
