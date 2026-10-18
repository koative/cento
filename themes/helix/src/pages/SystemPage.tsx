import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { imageAlt, images, papers, systems, type System } from "../content";
import { LatticeExplorer, LatticeMap } from "../components/Lattice";
import { PaperRow } from "../components/PaperRow";

export default function SystemPage({ system: s }: { system: System }) {
  const related = systems
    .filter((o) => o.slug !== s.slug)
    .sort(
      (a, b) => Math.abs(a.qubits - s.qubits) - Math.abs(b.qubits - s.qubits),
    )
    .slice(0, 3);
  const cited = papers.filter((p) => p.systems.includes(s.slug));
  const specs: [string, string][] = [
    ["Physical qubits", String(s.qubits)],
    ["Topology", s.topology],
    ["T1, median", `${s.t1} µs`],
    ["T2 echo, median", `${s.t2} µs`],
    ["Single-qubit gate fidelity", `${s.f1q}%`],
    ["Two-qubit gate fidelity", `${s.f2q}%`],
    ["Readout fidelity", `${s.readout}%`],
    ["Two-qubit gate time", `${s.gate2ns} ns`],
    ["Layer rate", `${s.layersPerSecond.toLocaleString("en-US")} layers / s`],
    ["Mixing-chamber temperature", `${s.baseTempMK} mK`],
    ["Location", s.site],
    ["Available", s.released],
    [
      "On-demand rate",
      s.ratePerSecond === null
        ? "Not on demand"
        : `$${s.ratePerSecond.toFixed(2)} per QPU-second`,
    ],
  ];

  return (
    <article>
      <header className="system-head wrap">
        <div className="system-head-copy">
          <Link to="/systems" className="back-link">
            <ArrowLeft size={16} aria-hidden /> All systems
          </Link>
          <h1>{s.name}</h1>
          <p className="lead">{s.line}</p>
          <span className="tag" data-access={s.access}>
            {s.access} · {s.status}
          </span>
          <p>{s.summary}</p>
          <div className="actions">
            <Link to="/access" className="btn btn-primary">
              {s.access === "On-premises"
                ? "Enquire about an installation"
                : s.access === "Preview"
                  ? "Apply for early access"
                  : `Run on ${s.name}`}
            </Link>
            <Link to="/pricing" className="btn btn-quiet">
              See pricing
            </Link>
          </div>
        </div>
        <figure className="system-photo">
          <img
            src={images[s.photo]}
            alt={imageAlt[s.photo]}
            width={1200}
            height={1500}
          />
        </figure>
      </header>

      <section className="section wrap spec-section" aria-labelledby="spec-h">
        <h2 id="spec-h">Specification</h2>
        <table className="spec-table">
          <tbody>
            {specs.map(([k, v]) => (
              <tr key={k}>
                <th scope="row">{k}</th>
                <td>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="spec-notes">
          <h3>Highlights</h3>
          <ul className="ticks">
            {s.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <h3>Best for</h3>
          <ul className="ticks">
            {s.bestFor.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section explorer-section" aria-labelledby="map-h">
        <div className="wrap">
          <div className="section-head">
            <h2 id="map-h">Calibration map</h2>
            <p>
              Every qubit and coupler on the chip. Choose a metric, then select
              a qubit with the mouse or move with the arrow keys. Per-qubit
              values here are illustrative, spread around the published medians.
            </p>
          </div>
          <LatticeExplorer system={s} />
        </div>
      </section>

      {cited.length > 0 && (
        <section className="section wrap" aria-labelledby="cited-h">
          <h2 id="cited-h">Papers that used {s.name}</h2>
          <ul className="paper-list">
            {cited.map((p) => (
              <PaperRow key={p.slug} paper={p} />
            ))}
          </ul>
        </section>
      )}

      <section className="section wrap" aria-labelledby="rel-h">
        <h2 id="rel-h">Other systems</h2>
        <ul className="related-systems">
          {related.map((o) => (
            <li key={o.slug}>
              <LatticeMap system={o} />
              <h3>
                <Link to={`/systems/${o.slug}`}>{o.name}</Link>
              </h3>
              <p>
                {o.qubits} qubits · {o.f2q}% 2Q · {o.access}
              </p>
            </li>
          ))}
        </ul>
        <Link to="/systems" className="text-link">
          Compare all systems <ArrowRight size={16} aria-hidden />
        </Link>
      </section>
    </article>
  );
}
