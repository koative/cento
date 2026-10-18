import { ArrowLeft } from "lucide-react";
import { Link } from "../router";
import { materials, projects, type Material } from "../content";
import { AddToBoard, MaterialCard } from "../components/Samples";
import { ProjectCard } from "../components/ProjectCard";

export function MaterialPage({ material: m }: { material: Material }) {
  const seenIn = projects.filter((p) => p.materials.includes(m.id));
  const pairs = m.pairs.map((id) => materials.find((x) => x.id === id)!);

  return (
    <>
      <section className="material-hero">
        <div className="material-swatch">
          <img
            src={m.image}
            alt={`${m.name}, ${m.finish.toLowerCase()} sample, close up`}
            width={800}
            height={800}
          />
        </div>
        <div className="material-info">
          <Link to="/materials" className="back-link">
            <ArrowLeft size={16} aria-hidden="true" /> Material library
          </Link>
          <h1>{m.name}</h1>
          <p className="material-kind">
            {m.family} · {m.tone} tone
          </p>
          <p className="lede">{m.note}</p>
          <p className="material-price tabular">
            ${m.price} <span>per {m.unit}, supplied</span>
          </p>
          <AddToBoard material={m} />
          <dl className="spec">
            <div>
              <dt>Origin</dt>
              <dd>{m.origin}</dd>
            </div>
            <div>
              <dt>Finish</dt>
              <dd>{m.finish}</dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>{m.format}</dd>
            </div>
            <div>
              <dt>Lead time</dt>
              <dd className="tabular">
                {m.leadWeeks} {m.leadWeeks === 1 ? "week" : "weeks"}
              </dd>
            </div>
            <div>
              <dt>Best for</dt>
              <dd>{m.bestFor.join(", ")}</dd>
            </div>
            <div>
              <dt>Care</dt>
              <dd>{m.care}</dd>
            </div>
          </dl>
          <p className="fine">
            Prices are indicative supply costs for 2026 and exclude
            installation.
          </p>
        </div>
      </section>

      <section className="section">
        <h2>Pairs well with</h2>
        <p className="section-intro">
          Three materials we have put next to {m.name} on site and would again.
        </p>
        <div className="material-grid material-grid-3">
          {pairs.map((p) => (
            <MaterialCard key={p.id} material={p} />
          ))}
        </div>
      </section>

      {seenIn.length > 0 && (
        <section className="section">
          <h2>Where we have used it</h2>
          <div className="project-grid">
            {seenIn.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
