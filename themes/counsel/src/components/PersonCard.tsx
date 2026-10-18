import { Link } from "../router";
import type { Person } from "../content";
import { areaBySlug } from "../lib/util";

export function PersonCard({
  person,
  level = 3,
}: {
  person: Person;
  level?: 2 | 3;
}) {
  const H = `h${level}` as const;
  return (
    <article className="person-card">
      <Link to={`/people/${person.slug}`} className="person-link">
        <img
          src={person.image}
          alt=""
          width={800}
          height={1000}
          loading="lazy"
          style={
            person.imagePosition
              ? { objectPosition: person.imagePosition }
              : undefined
          }
        />
        <H className="person-name">{person.name}</H>
      </Link>
      <p className="person-role">
        {person.role} · {person.office}
      </p>
      <p className="person-areas">
        {person.areas.map((a) => areaBySlug(a)?.name).join(", ")}
      </p>
    </article>
  );
}
