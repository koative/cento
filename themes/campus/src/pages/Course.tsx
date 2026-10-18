import {
  ArrowLeft,
  ArrowRight,
  Clock,
  FileText,
  MessageSquare,
  PenLine,
  PlayCircle,
} from "lucide-react";
import { Link } from "../router";
import {
  courseMinutes,
  courses,
  instructors,
  lessonCount,
  pricing,
  type Course as CourseT,
  type LessonKind,
} from "../content";
import { CourseTile, Rating } from "../components/course";
import { PacePlanner } from "../components/PacePlanner";
import { duration } from "../lib/plan";

const kindIcon: Record<LessonKind, typeof PlayCircle> = {
  Video: PlayCircle,
  Reading: FileText,
  Exercise: PenLine,
  Critique: MessageSquare,
};

export default function Course({ course }: { course: CourseT }) {
  const teacher = instructors.find((i) => i.slug === course.instructor)!;
  const membership = pricing.plans.find((p) => p.id === "membership")!;
  const related = [
    ...courses.filter(
      (c) => c.slug !== course.slug && c.subject === course.subject,
    ),
    ...courses.filter(
      (c) => c.slug !== course.slug && c.subject !== course.subject,
    ),
  ].slice(0, 3);

  return (
    <article className="course-page">
      <div className="wrap">
        <Link to="/courses" className="back-link">
          <ArrowLeft size={16} aria-hidden /> All courses
        </Link>
      </div>

      <header className="wrap course-hero">
        <div className="course-hero-copy">
          <p className="course-hero-meta">
            <a href={`#/courses?subject=${course.subject}`}>{course.subject}</a>{" "}
            · {course.level}
          </p>
          <h1>{course.title}</h1>
          <p className="lede">{course.summary}</p>
          <dl className="course-facts">
            <div>
              <dt>Instructor</dt>
              <dd>
                <Link to={`/instructors/${teacher.slug}`}>{teacher.name}</Link>
              </dd>
            </div>
            <div>
              <dt>Lessons</dt>
              <dd className="num">
                {lessonCount(course)} in {course.modules.length} modules
              </dd>
            </div>
            <div>
              <dt>Total time</dt>
              <dd className="num">{duration(courseMinutes(course))}</dd>
            </div>
            <div>
              <dt>Rating</dt>
              <dd>
                <Rating course={course} />
              </dd>
            </div>
            <div>
              <dt>Updated</dt>
              <dd>{course.updated}</dd>
            </div>
          </dl>
        </div>
        <img
          className="course-hero-img"
          src={course.image}
          alt={course.imageAlt}
          width={1400}
          height={1000}
        />
      </header>

      <div className="wrap course-layout">
        <div className="course-main">
          <section className="course-section">
            <h2>What you will be able to do</h2>
            <ul className="ticks ticks-lg">
              {course.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <div className="project">
              <h3>The final project</h3>
              <p>{course.project}</p>
            </div>
            <h3 className="small-head">What you need</h3>
            <ul className="plain-list">
              {course.tools.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>

          <section className="course-section">
            <h2>Syllabus</h2>
            <div className="syllabus-modules">
              {course.modules.map((m, i) => (
                <details key={m.title} open={i === 0}>
                  <summary>
                    <span className="module-num num">Module {i + 1}</span>
                    <span className="module-title">{m.title}</span>
                    <span className="module-time num">
                      {duration(m.lessons.reduce((s, l) => s + l.minutes, 0))}
                    </span>
                  </summary>
                  <ol>
                    {m.lessons.map((l) => {
                      const Icon = kindIcon[l.kind];
                      return (
                        <li key={l.title}>
                          <Icon size={16} aria-hidden />
                          <span>{l.title}</span>
                          <span className="muted">{l.kind}</span>
                          <span className="num muted">{l.minutes} min</span>
                        </li>
                      );
                    })}
                  </ol>
                </details>
              ))}
            </div>
          </section>

          <section className="course-section" aria-labelledby="plan-head">
            <h2 id="plan-head">Plan your pace</h2>
            <p>
              Tell us the evenings you have. We will lay the lessons across them
              and show you the day you finish.
            </p>
            <PacePlanner course={course} />
          </section>

          <section className="course-section">
            <h2>Your instructor</h2>
            <div className="teacher">
              <img
                src={teacher.image}
                alt={teacher.imageAlt}
                width={400}
                height={500}
                loading="lazy"
              />
              <div>
                <h3>
                  <Link to={`/instructors/${teacher.slug}`}>
                    {teacher.name}
                  </Link>
                </h3>
                <p className="muted">
                  {teacher.role}, {teacher.location}
                </p>
                <p>{teacher.bio[0]}</p>
                <p className="teacher-office">
                  <Clock size={16} aria-hidden /> {teacher.office}
                </p>
              </div>
            </div>
          </section>

          <section className="course-section">
            <h2>From learners</h2>
            <ul className="stories stories-two">
              {course.reviews.map((r) => (
                <li key={r.name}>
                  <blockquote>
                    <p>“{r.text}”</p>
                    <footer>
                      <strong>{r.name}</strong>, {r.note}
                    </footer>
                  </blockquote>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="enrol" aria-label="Enrol">
          <p className="enrol-price num">${course.price}</p>
          <p className="enrol-sub">One payment, lifetime access</p>
          <Link to="/signup" className="btn btn-primary btn-block">
            Enrol in this course
          </Link>
          <p className="enrol-or">
            or included in <Link to="/pricing">Membership</Link> from{" "}
            <span className="num">${membership.yearly}/month</span>
          </p>
          <Link to="/learn" className="btn btn-quiet btn-block">
            <PlayCircle size={18} aria-hidden /> Preview the workspace
          </Link>
          <ul className="enrol-list">
            <li>First lesson free, no account</li>
            <li>{course.modules.length} modules, at your own pace</li>
            <li>Critique from {teacher.name.split(" ")[0]}</li>
            <li>14-day refund, no questions</li>
          </ul>
        </aside>
      </div>

      <section className="wrap section related">
        <div className="section-head">
          <h2>You might also like</h2>
          <Link to="/courses" className="text-link">
            All courses <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
        <div className="tile-row">
          {related.map((c) => (
            <CourseTile key={c.slug} course={c} />
          ))}
        </div>
      </section>
    </article>
  );
}
