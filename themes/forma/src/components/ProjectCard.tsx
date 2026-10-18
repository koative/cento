import type { Project } from "../content";
import { Link } from "../router";

export function ProjectCard({
  project,
  size = "",
  eager = false,
}: {
  project: Project;
  size?: string;
  eager?: boolean;
}) {
  const { cover } = project;
  return (
    <Link to={"/projects/" + project.slug} className={"plate " + size}>
      <span className="plate-img">
        <img
          src={cover.src}
          alt={cover.alt}
          width={cover.w}
          height={cover.h}
          loading={eager ? "eager" : "lazy"}
        />
      </span>
      <span className="plate-title">{project.name}</span>
      <span className="plate-meta">
        {project.type} · {project.place} ·{" "}
        <span className="num">{project.year}</span>
      </span>
    </Link>
  );
}
