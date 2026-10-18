import { Link } from "../router";
import type { ClassType } from "../content";
import { Effort } from "./SessionRow";

export function ClassTile({ c }: { c: ClassType }) {
  return (
    <Link to={`/classes/${c.slug}`} className="class-tile">
      <img
        src={c.image.src}
        alt=""
        width={c.image.w}
        height={c.image.h}
        loading="lazy"
      />
      <span className="class-tile-name">{c.name}</span>
      <span className="class-tile-summary">{c.summary}</span>
      <span className="class-tile-meta">
        <span>
          {c.focus} · {c.minutes} min
        </span>
        <Effort level={c.effort} />
      </span>
    </Link>
  );
}
