import { ArrowRight, Check } from "lucide-react";
import { Link } from "../router";
import { grants, platform } from "../content";
import { GrantDetail } from "../components/Review";
import { Seal } from "../components/Guilloche";

function SourceGraph() {
  const ys = platform.sources.map((_, i) => 24 + i * 40);
  return (
    <svg
      className="source-graph"
      viewBox="0 0 420 260"
      role="img"
      aria-label="Six sources feed one Cipher graph of 412 identities, 96 groups and 1,284 grants"
    >
      {ys.map((y, i) => (
        <g key={i}>
          <path d={`M140 ${y} C 200 ${y}, 200 130, 250 130`} className="edge" />
          <rect
            x="4"
            y={y - 14}
            width="136"
            height="28"
            rx="6"
            className="node"
          />
          <text x="16" y={y + 5} className="node-label">
            {platform.sources[i]}
          </text>
        </g>
      ))}
      <circle cx="290" cy="130" r="40" className="hub" />
      <text x="290" y="126" textAnchor="middle" className="hub-label">
        Cipher
      </text>
      <text x="290" y="142" textAnchor="middle" className="hub-sub">
        graph
      </text>
      {[
        ["412", "identities"],
        ["96", "groups"],
        ["1,284", "grants"],
      ].map(([n, l], i) => (
        <g key={l}>
          <path d={`M330 130 L352 ${70 + i * 60}`} className="edge" />
          <text x="358" y={66 + i * 60} className="out-num">
            {n}
          </text>
          <text x="358" y={82 + i * 60} className="out-label">
            {l}
          </text>
        </g>
      ))}
    </svg>
  );
}

const figures = [
  <SourceGraph />,
  <div className="figure-card">
    <GrantDetail
      grant={grants[1]}
      actions={
        <p className="quiet small">
          Reviewer view, as it appears in the review queue.
        </p>
      }
    />
  </div>,
  <ol className="remediation">
    {platform.remediation.map((r) => (
      <li key={r.step}>
        <span className="num">{r.time}</span>
        <strong>{r.step}</strong>
        <span>{r.text}</span>
      </li>
    ))}
  </ol>,
  <div className="figure-card prove">
    <Seal label="Sealed" sub="Oct 1, 2026" />
    <ul className="sheet-files">
      {platform.evidenceFiles.map((f) => (
        <li key={f.name}>
          <span>{f.name}</span>
          <small>{f.detail}</small>
          <span className="num">{f.size}</span>
        </li>
      ))}
    </ul>
  </div>,
];

export default function Platform() {
  return (
    <>
      <header className="page-head wrap">
        <h1>{platform.heading}</h1>
        <p className="lede">{platform.lede}</p>
        <div className="actions">
          <Link to="/demo" className="btn btn-primary">
            Request a demo
          </Link>
          <Link to="/app" className="btn btn-quiet">
            Open the demo workspace <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </header>

      <div className="stages">
        {platform.stages.map((s, i) => (
          <section
            className="stage wrap"
            key={s.name}
            aria-labelledby={`stage-${i}`}
          >
            <h2 id={`stage-${i}`}>{s.name}</h2>
            <div className="stage-text">
              <p className="stage-title">{s.title}</p>
              <p>{s.text}</p>
              <ul className="tick-list">
                {s.points.map((p) => (
                  <li key={p}>
                    <Check size={16} aria-hidden /> {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="stage-figure">{figures[i]}</div>
          </section>
        ))}
      </div>

      <section className="signals wrap" aria-labelledby="signals-title">
        <div className="section-head">
          <h2 id="signals-title">The signals Cipher reads</h2>
          <p>
            Every flag in the queue comes with one of these, written as a
            sentence a reviewer can check.
          </p>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th scope="col">Signal</th>
                <th scope="col">What it means</th>
                <th scope="col">Example from the demo workspace</th>
              </tr>
            </thead>
            <tbody>
              {platform.signals.map((s) => (
                <tr key={s.name}>
                  <th scope="row">{s.name}</th>
                  <td>{s.means}</td>
                  <td className="quiet">{s.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="specs wrap" aria-labelledby="specs-title">
        <h2 id="specs-title">Under the hood</h2>
        <dl className="spec-list">
          {platform.specs.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <Link to="/trust" className="text-link">
          Security details in the trust center{" "}
          <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="close slim" aria-labelledby="pl-close">
        <div className="wrap close-inner">
          <h2 id="pl-close">See it on your own identity provider</h2>
          <div className="actions">
            <Link to="/demo" className="btn btn-primary">
              Request a demo
            </Link>
            <Link to="/pricing" className="btn btn-quiet">
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
