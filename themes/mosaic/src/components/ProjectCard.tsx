import { Link } from "../router";
import { materials, type Project } from "../content";

export function ProjectCard({
  project,
  size = "md",
  eager = false,
}: {
  project: Project;
  size?: "lg" | "md";
  eager?: boolean;
}) {
  const used = project.materials.map((id) =>
    materials.find((m) => m.id === id)!,
  );
  return (
    <article className={"project-card project-card-" + size}>
      <Link to={`/projects/${project.slug}`} className="project-card-link">
        <span className="project-card-media">
          <img
            src={project.cover}
            alt=""
            loading={eager ? undefined : "lazy"}
          />
        </span>
        <h3>{project.name}</h3>
      </Link>
      <p className="project-card-meta">
        {project.sector} · {project.place} · {project.year}
      </p>
      <ul className="chip-row" aria-label="Materials used">
        {used.map((m) => (
          <li key={m.id} title={m.name}>
            <img src={m.image} alt="" loading="lazy" />
            <span className="visually-hidden">{m.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
