import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { faculties, type Programme } from "../content";

/** One catalogue entry, set like a line in the printed prospectus. */
export function ProgrammeRow({ p }: { p: Programme }) {
  const faculty = faculties.find((f) => f.id === p.faculty)!;
  return (
    <li className="cat-row">
      <Link to={`/programmes/${p.id}`}>
        <span className="cat-code">{p.code}</span>
        <span className="cat-main">
          <span className="cat-title">{p.title}</span>
          <span className="cat-award">
            {p.award} · {faculty.name}
          </span>
        </span>
        <span className="cat-meta">
          {p.years} {p.years === 1 ? "year" : "years"}
          <span>{p.modes.join(" or ")}</span>
        </span>
        <span className="cat-entry">{p.entry}</span>
        <ArrowRight className="cat-arrow" aria-hidden="true" />
      </Link>
    </li>
  );
}
