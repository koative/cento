import { ArrowRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "../router";
import { issues, product } from "../content";
import { Burndown } from "../components/Burndown";
import { Avatar, PriorityIcon, StatusIcon } from "../components/issue";

function BoardVignette() {
  const cards = issues.filter((i) => i.status === "progress");
  return (
    <div
      className="vignette"
      role="img"
      aria-label={`An In progress column holding ${cards.length} cards against a limit of 3, its header turned red`}
    >
      <div className="preview-col">
        <p className="col-head col-head-over">
          <StatusIcon status="progress" />
          In progress
          <span className="col-count">{cards.length} / 3</span>
        </p>
        {cards.map((i) => (
          <div key={i.key} className="card card-static">
            <span className="card-key">{i.key}</span>
            <span className="card-title">{i.title}</span>
            <span className="card-meta">
              <PriorityIcon priority={i.priority} />
              <span className="card-pts">{i.estimate}</span>
              <Avatar id={i.assignee} size={20} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TriageVignette() {
  return (
    <div className="vignette">
      <ul className="triage" aria-label="Sample triage inbox">
        {product.triage.map((t) => (
          <li key={t.title}>
            <span className="tag">{t.source}</span>
            <span className="triage-title">{t.title}</span>
            <span className="triage-age">{t.age}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoadmapVignette() {
  const cols = product.roadmapWeeks.length * 2;
  return (
    <div
      className="vignette roadmap"
      role="img"
      aria-label="A quarter roadmap with five projects drawn as bars, each filled to its share of finished issues"
    >
      <div
        className="road-head"
        style={{
          gridTemplateColumns: `repeat(${product.roadmapWeeks.length}, 1fr)`,
        }}
      >
        {product.roadmapWeeks.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      {product.roadmap.map((r) => (
        <div
          key={r.name}
          className="road-row"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        >
          <span
            className="road-bar"
            style={{ gridColumn: `${r.start + 1} / span ${r.span}` }}
          >
            {r.done > 0 && (
              <span
                className="road-done"
                style={{ width: `${r.done * 100}%` }}
              />
            )}
            <span className="road-name">{r.name}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

const visuals: Record<string, ReactNode> = {
  board: <BoardVignette />,
  cycles: (
    <div className="vignette">
      <Burndown
        total={34}
        days={10}
        rate={3.2}
        actual={[34, 32, 31, 27, 25, 24]}
        label="Cycle burndown on day 6: 24 of 34 points remain, slightly above the ideal line"
      />
    </div>
  ),
  triage: <TriageVignette />,
  roadmap: <RoadmapVignette />,
};

export default function Product() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>{product.h1}</h1>
          <p className="lede">{product.lede}</p>
          <div className="actions">
            <Link to="/app" className="btn btn-primary btn-lg">
              Try it in the live demo
            </Link>
            <Link to="/pricing" className="btn btn-line btn-lg">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {product.sections.map((s, n) => (
        <section
          key={s.id}
          className="section feature"
          data-flip={n % 2 ? "" : undefined}
        >
          <div className="wrap feature-grid">
            <div className="feature-copy">
              <h2>{s.title}</h2>
              <p className="feature-lede">{s.lede}</p>
              <ul className="ticks">
                {s.points.map((p) => (
                  <li key={p}>
                    <Check size={18} aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            {visuals[s.id]}
          </div>
        </section>
      ))}

      <section className="section keys-band">
        <div className="wrap security">
          <h2>{product.security.title}</h2>
          <ul className="ticks ticks-inverse">
            {product.security.items.map((p) => (
              <li key={p}>
                <Check size={18} aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section cta-band">
        <div className="wrap cta-row">
          <h2>See it on your own workflow.</h2>
          <div className="actions">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Talk to sales
            </Link>
            <Link to="/customers" className="text-link">
              How other teams set it up <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
