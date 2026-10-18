import { Link } from "../router";
import type { Project } from "../content";
import { money } from "../lib/format";

export function ProjectCard({
  project: p,
  eager = false,
}: {
  project: Project;
  eager?: boolean;
}) {
  return (
    <article className="project-card">
      <div className="project-card-img">
        <img
          src={p.image.src}
          alt={p.image.alt}
          width={p.image.w}
          height={p.image.h}
          loading={eager ? undefined : "lazy"}
        />
        <span
          className="status-tag"
          data-status={p.status === "On site" ? "live" : "done"}
        >
          {p.status === "On site" ? "On site" : `Completed ${p.year}`}
        </span>
      </div>
      <h3>
        <Link to={`/projects/${p.slug}`}>{p.name}</Link>
      </h3>
      <p className="project-card-meta">
        <span>{p.sector}</span>
        <span>{p.location}</span>
        <span className="num">{money(p.value)}</span>
      </p>
    </article>
  );
}
