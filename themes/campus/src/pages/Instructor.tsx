import { ArrowLeft, Clock } from "lucide-react";
import { Link } from "../router";
import { courses, instructors, type Instructor as Person } from "../content";
import { CourseRow } from "../components/course";

export default function Instructor({ person }: { person: Person }) {
  const taught = courses.filter((c) => c.instructor === person.slug);
  const others = instructors.filter((i) => i.slug !== person.slug).slice(0, 3);

  return (
    <article className="wrap page">
      <Link to="/instructors" className="back-link">
        <ArrowLeft size={16} aria-hidden /> All instructors
      </Link>

      <header className="profile">
        <img
          src={person.image}
          alt={person.imageAlt}
          width={800}
          height={1000}
        />
        <div className="profile-body">
          <h1>{person.name}</h1>
          <p className="profile-role">
            {person.role} · {person.location} · teaching on Campus since{" "}
            {person.since}
          </p>
          {person.bio.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <blockquote className="profile-quote">
            <p>“{person.quote}”</p>
          </blockquote>
          <p className="teacher-office">
            <Clock size={16} aria-hidden /> {person.office}
          </p>
        </div>
      </header>

      <section className="section">
        <h2>Background</h2>
        <ul className="credits">
          {person.credits.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>
          {taught.length === 1 ? "Course" : "Courses"} by{" "}
          {person.name.split(" ")[0]}
        </h2>
        <div className="course-index">
          {taught.map((c) => (
            <CourseRow key={c.slug} course={c} headingLevel={3} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>More instructors</h2>
        <ul className="faces faces-small">
          {others.map((p) => (
            <li key={p.slug}>
              <Link to={`/instructors/${p.slug}`}>
                <img
                  src={p.image}
                  alt=""
                  width={400}
                  height={500}
                  loading="lazy"
                />
                <span className="faces-name">{p.name}</span>
                <span className="faces-role">{p.role}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
