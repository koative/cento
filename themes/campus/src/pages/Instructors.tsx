import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { brand, courses, instructors } from "../content";

export default function Instructors() {
  return (
    <div className="wrap page">
      <header className="page-head">
        <h1>Instructors</h1>
        <p className="lede">
          Six people with working practices — a bakery counter, a reporting
          team, a herbarium desk — who agreed to teach what they know, slowly
          and plainly. Each one reviews learners' work in person.
        </p>
      </header>

      <ul className="people">
        {instructors.map((p) => {
          const taught = courses.filter((c) => c.instructor === p.slug);
          return (
            <li key={p.slug} className="person">
              <img
                src={p.image}
                alt={p.imageAlt}
                width={400}
                height={500}
                loading="lazy"
              />
              <div className="person-body">
                <h2>
                  <Link to={`/instructors/${p.slug}`}>{p.name}</Link>
                </h2>
                <p className="person-role">
                  {p.role} · {p.location}
                </p>
                <p>{p.short}</p>
                <p className="person-teaches">
                  Teaches{" "}
                  {taught.map((c, i) => (
                    <span key={c.slug}>
                      {i > 0 && " and "}
                      <Link to={`/courses/${c.slug}`}>{c.title}</Link>
                    </span>
                  ))}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <aside className="teach-cta">
        <h2>Could you teach on Campus?</h2>
        <p>
          We look for people who do their craft every week and can explain it to
          an apprentice. Instructors keep 50% of every course sale for life.
        </p>
        <a
          href={`mailto:${brand.email}?subject=Teaching%20on%20Campus`}
          className="text-link"
        >
          Write to {brand.email} <ArrowRight size={16} aria-hidden />
        </a>
      </aside>
    </div>
  );
}
