import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { systems, type Access, type System } from "../content";
import { LatticeMap } from "../components/Lattice";
import { PageHead } from "../components/PageHead";

const FILTERS: ("All" | Access)[] = ["All", "Cloud", "On-premises", "Preview"];
const SORTS: { id: string; label: string; key: (s: System) => number }[] = [
  { id: "qubits", label: "Most qubits", key: (s) => s.qubits },
  { id: "f2q", label: "Best two-qubit fidelity", key: (s) => s.f2q },
  { id: "t1", label: "Longest T1", key: (s) => s.t1 },
  { id: "speed", label: "Fastest layer rate", key: (s) => s.layersPerSecond },
];

export default function Systems() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [sort, setSort] = useState(SORTS[0].id);
  const by = SORTS.find((s) => s.id === sort)!.key;
  const shown = systems
    .filter((s) => filter === "All" || s.access === filter)
    .sort((a, b) => by(b) - by(a));

  return (
    <>
      <PageHead
        title="Systems"
        lead="Six superconducting processors on one instruction set. Four run in our Boulder lab and are reachable from the cloud; Rime 8 ships to your own laboratory. Figures are medians from the latest calibration."
      />
      <section className="wrap" aria-label="Filter and sort systems">
        <div className="list-tools">
          <fieldset className="segmented">
            <legend className="visually-hidden">Access</legend>
            {FILTERS.map((f) => (
              <label key={f}>
                <input
                  type="radio"
                  name="access"
                  checked={filter === f}
                  onChange={() => setFilter(f)}
                />
                <span>{f}</span>
              </label>
            ))}
          </fieldset>
          <label className="sort">
            <span>Sort by</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <p className="list-count" aria-live="polite">
            {shown.length} {shown.length === 1 ? "system" : "systems"}
          </p>
        </div>
      </section>

      <ul className="wrap system-list">
        {shown.map((s) => (
          <li key={s.slug} className="system-row">
            <LatticeMap system={s} />
            <div className="system-row-main">
              <h2>
                <Link to={`/systems/${s.slug}`}>{s.name}</Link>
              </h2>
              <p>{s.line}</p>
              <span className="tag" data-access={s.access}>
                {s.access} · {s.status}
              </span>
            </div>
            <dl className="spec-list">
              <div>
                <dt>Qubits</dt>
                <dd>{s.qubits}</dd>
              </div>
              <div>
                <dt>2Q fidelity</dt>
                <dd>{s.f2q}%</dd>
              </div>
              <div>
                <dt>T1</dt>
                <dd>{s.t1} µs</dd>
              </div>
              <div>
                <dt>Layers / s</dt>
                <dd>{s.layersPerSecond.toLocaleString("en-US")}</dd>
              </div>
            </dl>
            <Link
              to={`/systems/${s.slug}`}
              className="row-link"
              aria-label={`${s.name} specifications`}
            >
              <ArrowRight size={20} aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
