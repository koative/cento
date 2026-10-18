import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "../router";
import { courses, images, levelInfo, type Course } from "../content";
import { CourseRow, langStyle } from "../components/Bits";
import {
  langOf,
  levelText,
  longDate,
  money,
  schedule,
  teacherOf,
  totalHours,
} from "../lib/format";

export function CoursePage({ course }: { course: Course }) {
  const lang = langOf(course.lang);
  const teacher = teacherOf(course.teacher);
  const second = course.format === "Online" ? images.online : images.classroom;
  const related = courses
    .filter(
      (c) =>
        c.id !== course.id &&
        (c.lang === course.lang ||
          c.levels.some((l) => course.levels.includes(l))),
    )
    .sort(
      (a, b) => Number(b.lang === course.lang) - Number(a.lang === course.lang),
    )
    .slice(0, 3);

  return (
    <article className="course-page" style={langStyle(lang.color)}>
      <header className="course-hero">
        <div className="wrap course-hero-inner">
          <div>
            <Link to="/courses" className="back">
              <ArrowLeft size={17} aria-hidden="true" /> All courses
            </Link>
            <h1>{course.title}</h1>
            <p className="lead">{course.summary}</p>
            <p className="course-hero-lang">
              {lang.name} · {levelText(course)}{" "}
              {course.levels
                .map((l) => levelInfo[l].name.toLowerCase())
                .join(" to ")}{" "}
              · {course.format}
            </p>
          </div>
          <blockquote className="course-phrase">
            <p lang={lang.code}>{course.phrase.text}</p>
            <p className="tr">{course.phrase.translation}</p>
          </blockquote>
        </div>
      </header>

      <div className="wrap course-body">
        <div className="course-gallery">
          <img
            src={lang.image.src}
            alt={lang.image.alt}
            width={lang.image.w}
            height={lang.image.h}
          />
          <img
            src={second.src}
            alt={second.alt}
            width={second.w}
            height={second.h}
            loading="lazy"
          />
        </div>

        <aside className="course-card" aria-labelledby="card-h">
          <h2 id="card-h" className="vh">
            Course details
          </h2>
          <p className="course-card-price">
            <span className="num">{money(course.price)}</span> for the course
          </p>
          <dl className="specs">
            <div>
              <dt>When</dt>
              <dd>{schedule(course.sessions)}</dd>
            </div>
            <div>
              <dt>Starts</dt>
              <dd>{longDate(course.start)}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>
                {course.weeks} weeks · {totalHours(course)} hours
              </dd>
            </div>
            <div>
              <dt>Group</dt>
              <dd>
                {course.groupMax} at most ·{" "}
                <strong className={course.seatsLeft <= 2 ? "low" : ""}>
                  {course.seatsLeft} left
                </strong>
              </dd>
            </div>
            <div>
              <dt>Where</dt>
              <dd>{course.room}</dd>
            </div>
            <div>
              <dt>Materials</dt>
              <dd>{course.materials}</dd>
            </div>
          </dl>
          <Link to={`/enrol?course=${course.id}`} className="btn btn-block">
            Enrol on this course <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <p className="fine">
            Full refund up to seven days before the start. Free group switch in
            the first two weeks.
          </p>
        </aside>

        <div className="course-text">
          <section aria-labelledby="about-h">
            <h2 id="about-h">About the course</h2>
            <p>{course.description}</p>
            <p className="level-can">
              <b>{levelText(course)}:</b> {levelInfo[course.levels[0]].can}
            </p>
          </section>

          <section aria-labelledby="out-h">
            <h2 id="out-h">By the last session you will</h2>
            <ul className="outcomes">
              {course.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="syl-h">
            <h2 id="syl-h">Week by week</h2>
            <ol className="syllabus">
              {course.syllabus.map((s) => (
                <li key={s.weeks}>
                  <p className="syl-weeks">{s.weeks}</p>
                  <div>
                    <h3 lang={lang.code}>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="teacher-h" className="course-teacher">
            <h2 id="teacher-h">Your teacher</h2>
            <div className="entry">
              <p className="entry-head">
                <b>{teacher.name}</b>{" "}
                <span className="pron">/{teacher.pron}/</span>
              </p>
              <p>
                <i>
                  {teacher.role}, from {teacher.from}. Teaching at Sonnet since{" "}
                  {teacher.since}.
                </i>{" "}
                {teacher.bio}
              </p>
              <p className="fav">
                Favourite word: <b>{teacher.word.term}</b>, {teacher.word.gloss}
                .
              </p>
              <Link to="/teachers" className="more">
                All teachers <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </section>
        </div>
      </div>

      {related.length > 0 && (
        <section className="wrap section" aria-labelledby="rel-h">
          <h2 id="rel-h">You might also look at</h2>
          <ul className="course-list">
            {related.map((c) => (
              <CourseRow key={c.id} course={c} />
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
